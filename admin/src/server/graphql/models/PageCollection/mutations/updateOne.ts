import { mutationField, nonNull } from 'nexus'

export const PageCollectionUpdateOneMutation = mutationField(
  'updateOnePageCollection',
  {
    type: nonNull('PageCollection'),
    args: {
      data: nonNull('PageCollectionUpdateInput'),
      where: nonNull('PageCollectionWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.pageCollection.update({
        where,
        data,
        ...select,
      })
    },
  },
)
