import { mutationField, nonNull } from 'nexus'

export const ProductGroupUpdateManyMutation = mutationField(
  'updateManyProductGroup',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('ProductGroupUpdateManyMutationInput'),
      where: 'ProductGroupWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.productGroup.updateMany(args as any)
    },
  },
)
