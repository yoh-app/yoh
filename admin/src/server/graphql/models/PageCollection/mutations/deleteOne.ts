import { mutationField, nonNull } from 'nexus'

export const PageCollectionDeleteOneMutation = mutationField(
  'deleteOnePageCollection',
  {
    type: 'PageCollection',
    args: {
      where: nonNull('PageCollectionWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.pageCollection.delete({
        where,
        ...select,
      })
    },
  },
)
