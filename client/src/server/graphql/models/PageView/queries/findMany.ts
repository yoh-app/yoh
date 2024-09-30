import { queryField, nonNull, list } from 'nexus'

export const PageViewFindManyQuery = queryField('findManyPageView', {
  type: nonNull(list(nonNull('PageView'))),
  args: {
    where: 'PageViewWhereInput',
    orderBy: list('PageViewOrderByWithRelationInput'),
    cursor: 'PageViewWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'PageViewScalarFieldEnum',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.pageView.findMany({
      ...args,
      ...select,
    })
  },
})
