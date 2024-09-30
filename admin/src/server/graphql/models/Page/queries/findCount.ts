import { queryField, nonNull, list } from 'nexus'

export const PageFindCountQuery = queryField('findManyPageCount', {
  type: nonNull('Int'),
  args: {
    where: 'PageWhereInput',
    orderBy: list('PageOrderByWithRelationInput'),
    cursor: 'PageWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'PageScalarFieldEnum',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.page.count(args as any)
  },
})
