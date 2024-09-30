import { queryField, nonNull } from 'nexus'

export const PageViewFindUniqueQuery = queryField('findUniquePageView', {
  type: 'PageView',
  args: {
    where: nonNull('PageViewWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.pageView.findUnique({
      where,
      ...select,
    })
  },
})
