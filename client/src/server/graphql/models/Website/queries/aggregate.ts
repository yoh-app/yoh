import { queryField, list } from 'nexus'

export const WebsiteAggregateQuery = queryField('aggregateWebsite', {
  type: 'AggregateWebsite',
  args: {
    where: 'WebsiteWhereInput',
    orderBy: list('WebsiteOrderByWithRelationInput'),
    cursor: 'WebsiteWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.website.aggregate({ ...args, ...select }) as any
  },
})
