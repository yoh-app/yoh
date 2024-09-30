import { queryField, nonNull } from 'nexus'

export const PageCollectionFindUniqueQuery = queryField(
  'findUniquePageCollection',
  {
    type: 'PageCollection',
    args: {
      where: nonNull('PageCollectionWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.pageCollection.findUnique({
        where,
        ...select,
      })
    },
  },
)
