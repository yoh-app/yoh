import { queryField, nonNull, list } from 'nexus'

export const WebsiteFindManyQuery = queryField('findManyWebsite', {
  type: nonNull(list(nonNull('Website'))),
  args: {
    where: 'WebsiteWhereInput',
    orderBy: list('WebsiteOrderByWithRelationInput'),
    cursor: 'WebsiteWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'WebsiteScalarFieldEnum',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.website.findMany({
      ...args,
      ...select,
    })
  },
})
