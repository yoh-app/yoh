import { mutationField, nonNull } from 'nexus'

export const ProductUpdateManyMutation = mutationField('updateManyProduct', {
  type: nonNull('BatchPayload'),
  args: {
    data: nonNull('ProductUpdateManyMutationInput'),
    where: 'ProductWhereInput',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.product.updateMany(args as any)
  },
})
