import { queryField, nonNull } from 'nexus'

export const PageFindUniqueQuery = queryField('findUniquePage', {
  type: 'Page',
  args: {
    where: nonNull('PageWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.page.findUnique({
      where,
      ...select,
    })
  },
})
