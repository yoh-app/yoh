import { queryField, list } from 'nexus'

export const PageFindFirstQuery = queryField('findFirstPage', {
  type: 'Page',
  args: {
    where: 'PageWhereInput',
    orderBy: list('PageOrderByWithRelationInput'),
    cursor: 'PageWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'PageScalarFieldEnum',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.page.findFirst({
      ...args,
      ...select,
    })
  },
})
