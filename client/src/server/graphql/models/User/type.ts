import { objectType } from 'nexus'

export const User = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'User',
  definition(t) {
    t.nullable.json('adminFilters')
    t.nullable.field('createdAt', { type: 'DateTime' })
    t.nullable.field('deletedAt', { type: 'DateTime' })
    t.nullable.boolean('deleted')
    t.nullable.field('updatedAt', { type: 'DateTime' })
    t.nullable.string('email')
    t.string('id')
    t.nullable.json('imageObj')
    t.nullable.string('name')
    t.nullable.string('password')
    t.nullable.string('stripeAccountId')
    t.nullable.string('stripeCustomerId')
    t.nullable.string('telegramUserId')
    t.list.field('attachments', {
      type: 'Attachment',
      args: {
        where: 'AttachmentWhereInput',
        orderBy: 'AttachmentOrderByWithRelationInput',
        cursor: 'AttachmentWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'AttachmentScalarFieldEnum',
      },
      resolve(root: any) {
        return root.attachments
      },
    })
    t.list.field('customers', {
      type: 'Customer',
      args: {
        where: 'CustomerWhereInput',
        orderBy: 'CustomerOrderByWithRelationInput',
        cursor: 'CustomerWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CustomerScalarFieldEnum',
      },
      resolve(root: any) {
        return root.customers
      },
    })
    t.list.field('loginTokens', {
      type: 'LoginToken',
      args: {
        where: 'LoginTokenWhereInput',
        orderBy: 'LoginTokenOrderByWithRelationInput',
        cursor: 'LoginTokenWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'LoginTokenScalarFieldEnum',
      },
      resolve(root: any) {
        return root.loginTokens
      },
    })
    t.list.field('notifications', {
      type: 'Notification',
      args: {
        where: 'NotificationWhereInput',
        orderBy: 'NotificationOrderByWithRelationInput',
        cursor: 'NotificationWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'NotificationScalarFieldEnum',
      },
      resolve(root: any) {
        return root.notifications
      },
    })
    t.list.field('organizations', {
      type: 'Organization',
      args: {
        where: 'OrganizationWhereInput',
        orderBy: 'OrganizationOrderByWithRelationInput',
        cursor: 'OrganizationWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'OrganizationScalarFieldEnum',
      },
      resolve(root: any) {
        return root.organizations
      },
    })
    t.list.field('refreshTokens', {
      type: 'RefreshToken',
      args: {
        where: 'RefreshTokenWhereInput',
        orderBy: 'RefreshTokenOrderByWithRelationInput',
        cursor: 'RefreshTokenWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'RefreshTokenScalarFieldEnum',
      },
      resolve(root: any) {
        return root.refreshTokens
      },
    })
    t.list.field('websites', {
      type: 'Website',
      args: {
        where: 'WebsiteWhereInput',
        orderBy: 'WebsiteOrderByWithRelationInput',
        cursor: 'WebsiteWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'WebsiteScalarFieldEnum',
      },
      resolve(root: any) {
        return root.websites
      },
    })
    t.field('_count', {
      type: 'UserCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
