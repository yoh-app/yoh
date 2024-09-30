import { queryField, list } from 'nexus'

export const PageViewFindFirstQuery = queryField('findFirstPageView', {
  type: 'PageView',
  args: {
    where: 'PageViewWhereInput',
    orderBy: list('PageViewOrderByWithRelationInput'),
    cursor: 'PageViewWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'PageViewScalarFieldEnum',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.pageView.findFirst({
      ...args,
      ...select,
    })
  },
})
