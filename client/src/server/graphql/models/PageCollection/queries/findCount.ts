import { queryField, nonNull, list } from 'nexus'

export const PageCollectionFindCountQuery = queryField(
  'findManyPageCollectionCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'PageCollectionWhereInput',
      orderBy: list('PageCollectionOrderByWithRelationInput'),
      cursor: 'PageCollectionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: 'PageCollectionScalarFieldEnum',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.pageCollection.count(args as any)
    },
  },
)
