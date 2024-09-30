import { mutationField, nonNull } from 'nexus'

export const OrderedProductDeleteManyMutation = mutationField(
  'deleteManyOrderedProduct',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'OrderedProductWhereInput',
    },
    resolve: async (_parent, { where }, { prisma }) => {
      return prisma.orderedProduct.deleteMany({ where } as any)
    },
  },
)
