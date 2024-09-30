import { queryField, nonNull, list } from 'nexus'

export const PageFindManyQuery = queryField('findManyPage', {
  type: nonNull(list(nonNull('Page'))),
  args: {
    where: 'PageWhereInput',
    orderBy: list('PageOrderByWithRelationInput'),
    cursor: 'PageWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'PageScalarFieldEnum',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.page.findMany({
      ...args,
      ...select,
    })
  },
})
