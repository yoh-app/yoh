import { objectType } from 'nexus'

export const Organization = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'Organization',
  definition(t) {
    t.nullable.field('createdAt', { type: 'DateTime' })
    t.nullable.field('deletedAt', { type: 'DateTime' })
    t.nullable.boolean('deleted')
    t.nullable.field('updatedAt', { type: 'DateTime' })
    t.nullable.string('description')
    t.string('id')
    t.nullable.json('logoObj')
    t.nullable.string('name')
    t.nullable.string('slug')
    t.nullable.string('telegramApiToken')
    t.nullable.string('telegramBotId')
    t.nullable.string('userId')
    t.nullable.string('walletAddress')
    t.list.field('eventGroups', {
      type: 'EventGroup',
      args: {
        where: 'EventGroupWhereInput',
        orderBy: 'EventGroupOrderByWithRelationInput',
        cursor: 'EventGroupWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'EventGroupScalarFieldEnum',
      },
      resolve(root: any) {
        return root.eventGroups
      },
    })
    t.list.field('productGroups', {
      type: 'ProductGroup',
      args: {
        where: 'ProductGroupWhereInput',
        orderBy: 'ProductGroupOrderByWithRelationInput',
        cursor: 'ProductGroupWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'ProductGroupScalarFieldEnum',
      },
      resolve(root: any) {
        return root.productGroups
      },
    })
    t.nullable.field('user', {
      type: 'User',
      resolve(root: any) {
        return root.user
      },
    })
    t.list.field('websiteGroups', {
      type: 'WebsiteGroup',
      args: {
        where: 'WebsiteGroupWhereInput',
        orderBy: 'WebsiteGroupOrderByWithRelationInput',
        cursor: 'WebsiteGroupWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'WebsiteGroupScalarFieldEnum',
      },
      resolve(root: any) {
        return root.websiteGroups
      },
    })
    t.field('_count', {
      type: 'OrganizationCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
