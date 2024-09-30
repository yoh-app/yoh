import { queryField, nonNull, list } from 'nexus'

export const PageCollectionFindManyQuery = queryField(
  'findManyPageCollection',
  {
    type: nonNull(list(nonNull('PageCollection'))),
    args: {
      where: 'PageCollectionWhereInput',
      orderBy: list('PageCollectionOrderByWithRelationInput'),
      cursor: 'PageCollectionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: 'PageCollectionScalarFieldEnum',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.pageCollection.findMany({
        ...args,
        ...select,
      })
    },
  },
)
