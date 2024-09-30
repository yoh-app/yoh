import { mutationField, nonNull } from 'nexus'

export const ProductCollectionUpdateManyMutation = mutationField(
  'updateManyProductCollection',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('ProductCollectionUpdateManyMutationInput'),
      where: 'ProductCollectionWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.productCollection.updateMany(args as any)
    },
  },
)
