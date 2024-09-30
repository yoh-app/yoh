import { queryField, nonNull, list } from 'nexus'

export const WebsiteFindCountQuery = queryField('findManyWebsiteCount', {
  type: nonNull('Int'),
  args: {
    where: 'WebsiteWhereInput',
    orderBy: list('WebsiteOrderByWithRelationInput'),
    cursor: 'WebsiteWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'WebsiteScalarFieldEnum',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.website.count(args as any)
  },
})
