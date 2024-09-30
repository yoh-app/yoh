import { mutationField, nonNull } from 'nexus'

export const ProductGroupUpsertOneMutation = mutationField(
  'upsertOneProductGroup',
  {
    type: nonNull('ProductGroup'),
    args: {
      where: nonNull('ProductGroupWhereUniqueInput'),
      create: nonNull('ProductGroupCreateInput'),
      update: nonNull('ProductGroupUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.productGroup.upsert({
        ...args,
        ...select,
      })
    },
  },
)
