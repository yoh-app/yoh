import { mutationField, nonNull } from 'nexus'

export const ProductCollectionDeleteOneMutation = mutationField(
  'deleteOneProductCollection',
  {
    type: 'ProductCollection',
    args: {
      where: nonNull('ProductCollectionWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.productCollection.delete({
        where,
        ...select,
      })
    },
  },
)
