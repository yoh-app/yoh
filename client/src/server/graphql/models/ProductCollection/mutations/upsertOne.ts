import { mutationField, nonNull } from 'nexus'

export const ProductCollectionUpsertOneMutation = mutationField(
  'upsertOneProductCollection',
  {
    type: nonNull('ProductCollection'),
    args: {
      where: nonNull('ProductCollectionWhereUniqueInput'),
      create: nonNull('ProductCollectionCreateInput'),
      update: nonNull('ProductCollectionUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.productCollection.upsert({
        ...args,
        ...select,
      })
    },
  },
)
