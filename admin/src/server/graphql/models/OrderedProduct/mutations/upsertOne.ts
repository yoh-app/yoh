import { mutationField, nonNull } from 'nexus'

export const OrderedProductUpsertOneMutation = mutationField(
  'upsertOneOrderedProduct',
  {
    type: nonNull('OrderedProduct'),
    args: {
      where: nonNull('OrderedProductWhereUniqueInput'),
      create: nonNull('OrderedProductCreateInput'),
      update: nonNull('OrderedProductUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.orderedProduct.upsert({
        ...args,
        ...select,
      })
    },
  },
)
