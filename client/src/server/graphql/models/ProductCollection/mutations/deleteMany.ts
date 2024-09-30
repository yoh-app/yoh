import { mutationField, nonNull } from 'nexus'

export const ProductCollectionDeleteManyMutation = mutationField(
  'deleteManyProductCollection',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'ProductCollectionWhereInput',
    },
    resolve: async (_parent, { where }, { prisma }) => {
      return prisma.productCollection.deleteMany({ where } as any)
    },
  },
)
