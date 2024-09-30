import { mutationField, nonNull } from 'nexus'

export const ProductGroupCreateOneMutation = mutationField(
  'createOneProductGroup',
  {
    type: nonNull('ProductGroup'),
    args: {
      data: 'ProductGroupCreateInput',
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.productGroup.create({
        data,
        ...select,
      })
    },
  },
)
