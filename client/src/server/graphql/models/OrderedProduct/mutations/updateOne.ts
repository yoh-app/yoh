import { mutationField, nonNull } from 'nexus'

export const OrderedProductUpdateOneMutation = mutationField(
  'updateOneOrderedProduct',
  {
    type: nonNull('OrderedProduct'),
    args: {
      data: nonNull('OrderedProductUpdateInput'),
      where: nonNull('OrderedProductWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.orderedProduct.update({
        where,
        data,
        ...select,
      })
    },
  },
)
