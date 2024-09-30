import { mutationField, nonNull } from 'nexus'

export const ProductGroupDeleteManyMutation = mutationField(
  'deleteManyProductGroup',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'ProductGroupWhereInput',
    },
    resolve: async (_parent, { where }, { prisma }) => {
      return prisma.productGroup.deleteMany({ where } as any)
    },
  },
)
