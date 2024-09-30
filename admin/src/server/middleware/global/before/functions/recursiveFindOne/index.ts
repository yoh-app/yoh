import dot from 'dot-object'

const recursiveFindOne = {
  mutateArgs: false,
  run: async (root, args, context, info) => {
    try {
      const { prisma } = context
      const { capToLowerCase, getModelObject } = context.utils

      const modelObject = getModelObject(context)
      // if item has active true, allow access, and queries from slug
      if (args.where.slug) {
        const item = await prisma[capToLowerCase(modelObject.name)].findUnique({
          where: {
            slug: args.where.slug,
          },
        })
        if (item?.active) {
          return { data: true }
        }
      }
      if (!modelObject.parent && modelObject.name !== 'User') {
        throw new Error(modelObject.name + ' doesnt have a parent field or admin field included')
      }

      // if (modelObject.admin) {
      //   if (!context.permission[modelObject.id] && !context.permission[modelObject.parent]) {
      //     throw new Error(`${context.permission.admin} not exist in token..`)
      //   }
      // }

      if (modelObject.parent) {
        const parentField = modelObject.fields.find((field) => {
          return field.type === modelObject.parent
        })

        let checkExist
        if (context.permission[modelObject.parent]) {
          checkExist = await prisma[capToLowerCase(modelObject.name)].findFirst({
            where: {
              [parentField.name]: {
                id: {
                  equals: context.permission[parentField.type],
                },
              },
              id: {
                equals: args.where.id,
              },
            },
            include: {
              [parentField.name]: true,
            },
          })
        } else {
          const clonedContext = JSON.parse(JSON.stringify({ permission: context.permission, params: context.params }))
          clonedContext.utils = context.utils

          const parentPath = recursiveParentPath(clonedContext)

          checkExist = await prisma[capToLowerCase(modelObject.name)].findFirst({
            where: {
              ...parentPath,
              id: {
                equals: args.where.id,
              },
            },
          })
        }
        if (checkExist) {
          return { data: true }
        } else {
          throw new Error(`${args.where.id} doesnt match model parents permission id`)
        }
      }
      return { data: false }
    } catch (error) {
      return { error }
    }
  },
}

export const recursiveParentPath = (context) => {
  const modelObject = context.utils.getModelObject(context)
  const path = context.params.path ? context.params.path : ''

  if (context.permission[modelObject.name]) {
    const objectPath = path + '.id.equals'
    const pathObject = {}
    dot.str(objectPath, context.permission[modelObject.name], pathObject)

    return pathObject
  }

  if (modelObject.parent) {
    const parentField = modelObject.fields.find((field) => {
      return field.type === modelObject.parent
    })

    const newPath = path.length === 0 ? parentField?.name : path + '.' + parentField?.name
    context.params.model = modelObject.parent
    context.params.path = newPath
    return recursiveParentPath(context)
  }
}

export default recursiveFindOne
