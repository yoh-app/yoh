import { extendType, nonNull, stringArg, objectType, intArg } from 'nexus'
import { compare, hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import cookie from 'cookie'
import { permissions } from '../permission'

import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const AdminQueries = extendType({
  type: 'Query',
  definition(t) {
    t.field('getFilters', {
      type: 'Json',
      args: {
        modelName: nonNull('String'),
        pagesPath: nonNull(stringArg()),
      },
      resolve: async (_, { modelName, pagesPath }, { prisma, userId, permission, utils }) => {
        if (!userId) return null
        const adminName = utils.capToLowerCase(permission.admin)
        const admin = await prisma[adminName].findUnique({
          where: {
            id: permission[permission.admin],
          },
        })
        const results = []
        for (const key in admin.adminFilters) {
          if (Object.prototype.hasOwnProperty.call(admin.adminFilters, key)) {
            const filter = admin.adminFilters[key]
            if (key.includes(modelName) && key.includes(pagesPath)) {
              results.push(filter)
            }
          }
        }

        return results
      },
    })
  },
})

export const AdminMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('logoutAdmin', {
      type: 'Json',
      resolve: async (_parent, { }, { userId, prisma, res, permission, JWT_SECRET, utils }) => {
        const oldAdmin = permission.admin
        const { cleanPermission, capToLowerCase } = utils
        const relationModel = permission.parents.find((relationItem) => relationItem.model === permission.admin)

        if (relationModel && relationModel.parent) {
          const permissionItem = permissions.find((per) => per.admin === relationModel.parent)
          const parentRelation = permission.parents.find((relationItem) => relationItem.model === relationModel.parent)
          const authItem = await prisma[capToLowerCase(relationModel.parent)].findUnique({
            where: {
              id: permission[relationModel.parent],
            },
          })
          permission = {
            ...permission,
            name: authItem?.name || authItem?.title || authItem?.username,
            imageObj: authItem?.imageObj,
            admin: permissionItem.admin,
            adminParent: parentRelation?.parent,
          }
          if (permissionItem.name === relationModel.model) {
            delete permission[oldAdmin]
          }
          const token = sign({ userId: userId, permission: cleanPermission(permission) }, JWT_SECRET.key)

          return { permission, token }
        } else {
          return null
        }
      },
    })
    t.field('enterAdmin', {
      type: 'Json',
      args: {
        admin: nonNull('String'),
        id: nonNull('String'),
      },
      resolve: async (_parent, { admin, id }, { res, userId, permission, prisma, JWT_SECRET, superAdmin, utils }) => {
        if (!userId) return null
        let authItem
        const modelObject = permission.schema.models.find((model) => model.name === admin)

        await Promise.all(
          permissions.map(async (permissionItem) => {
            if (permissionItem.admin === admin) {
              const relationModel = permission.parents.find((relationItem) => relationItem.model === admin)
              // const modelObject = permission.schema.models.find((model) => model.name === relationModel.model)
              const parentField = modelObject.fields.find(
                (field) => !field.list && field.type === relationModel?.parent,
              )
              if (relationModel.parent) {
                authItem = await prisma[utils.capToLowerCase(relationModel.model)].findFirst({
                  where: {
                    id: {
                      equals: id,
                    },
                    [parentField.name]: {
                      id: {
                        equals: permission[permission.admin],
                      },
                    },
                  },
                })
              }
              if (authItem) {
                permission = {
                  ...permission,
                  admin: permissionItem.admin,
                  [admin]: id,
                  adminParent: relationModel?.parent,
                  imageObj: authItem.imageObj,
                  name: authItem?.name || authItem?.title,
                }
                // Add another admin for checking
                if (permissionItem?.additionalModel) {
                  const additionalModelField = modelObject.fields.find(
                    (field) => field.type === permissionItem.additionalModel,
                  )
                  if (additionalModelField) {
                    permission[permissionItem.additionalModel] = authItem[additionalModelField.name]
                  }
                }
              }
            }
          }),
        )
        const token = sign({ userId: userId, permission: utils.cleanPermission(permission) }, JWT_SECRET.key)

        return { permission, token }
      },
    })
  },
})
