import { mutationField, nonNull } from 'nexus'

export const ProductGroupDeleteOneMutation = mutationField(
  'deleteOneProductGroup',
  {
    type: 'ProductGroup',
    args: {
      where: nonNull('ProductGroupWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.productGroup.delete({
        where,
        ...select,
      })
    },
  },
)
