import { mutationField, nonNull } from 'nexus'

export const OrderedProductUpdateManyMutation = mutationField(
  'updateManyOrderedProduct',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('OrderedProductUpdateManyMutationInput'),
      where: 'OrderedProductWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.orderedProduct.updateMany(args as any)
    },
  },
)
