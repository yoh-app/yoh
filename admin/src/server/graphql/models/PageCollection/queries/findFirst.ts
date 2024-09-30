import { queryField, list } from 'nexus'

export const PageCollectionFindFirstQuery = queryField(
  'findFirstPageCollection',
  {
    type: 'PageCollection',
    args: {
      where: 'PageCollectionWhereInput',
      orderBy: list('PageCollectionOrderByWithRelationInput'),
      cursor: 'PageCollectionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: 'PageCollectionScalarFieldEnum',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.pageCollection.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
