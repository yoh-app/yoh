import { mutationField, nonNull } from 'nexus'

export const ProductCollectionUpdateOneMutation = mutationField(
  'updateOneProductCollection',
  {
    type: nonNull('ProductCollection'),
    args: {
      data: nonNull('ProductCollectionUpdateInput'),
      where: nonNull('ProductCollectionWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.productCollection.update({
        where,
        data,
        ...select,
      })
    },
  },
)
