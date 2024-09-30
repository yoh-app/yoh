import { mutationField, nonNull } from 'nexus'

export const ProductDeleteManyMutation = mutationField('deleteManyProduct', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'ProductWhereInput',
  },
  resolve: async (_parent, { where }, { prisma }) => {
    return prisma.product.deleteMany({ where } as any)
  },
})
