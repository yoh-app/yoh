import { mutationField, nonNull } from 'nexus'

export const ProductGroupUpdateOneMutation = mutationField(
  'updateOneProductGroup',
  {
    type: nonNull('ProductGroup'),
    args: {
      data: nonNull('ProductGroupUpdateInput'),
      where: nonNull('ProductGroupWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.productGroup.update({
        where,
        data,
        ...select,
      })
    },
  },
)
