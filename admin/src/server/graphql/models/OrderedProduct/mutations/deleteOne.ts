import { mutationField, nonNull } from 'nexus'

export const OrderedProductDeleteOneMutation = mutationField(
  'deleteOneOrderedProduct',
  {
    type: 'OrderedProduct',
    args: {
      where: nonNull('OrderedProductWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.orderedProduct.delete({
        where,
        ...select,
      })
    },
  },
)
