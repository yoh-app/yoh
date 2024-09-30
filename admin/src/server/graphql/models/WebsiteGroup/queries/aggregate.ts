import { queryField, list } from 'nexus'

export const WebsiteGroupAggregateQuery = queryField('aggregateWebsiteGroup', {
  type: 'AggregateWebsiteGroup',
  args: {
    where: 'WebsiteGroupWhereInput',
    orderBy: list('WebsiteGroupOrderByWithRelationInput'),
    cursor: 'WebsiteGroupWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.websiteGroup.aggregate({ ...args, ...select }) as any
  },
})
