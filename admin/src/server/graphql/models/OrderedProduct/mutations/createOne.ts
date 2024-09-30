import { mutationField, nonNull } from 'nexus'

export const OrderedProductCreateOneMutation = mutationField(
  'createOneOrderedProduct',
  {
    type: nonNull('OrderedProduct'),
    args: {
      data: 'OrderedProductCreateInput',
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.orderedProduct.create({
        data,
        ...select,
      })
    },
  },
)
