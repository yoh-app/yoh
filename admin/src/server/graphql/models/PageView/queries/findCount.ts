import { queryField, nonNull, list } from 'nexus'

export const PageViewFindCountQuery = queryField('findManyPageViewCount', {
  type: nonNull('Int'),
  args: {
    where: 'PageViewWhereInput',
    orderBy: list('PageViewOrderByWithRelationInput'),
    cursor: 'PageViewWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'PageViewScalarFieldEnum',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.pageView.count(args as any)
  },
})
