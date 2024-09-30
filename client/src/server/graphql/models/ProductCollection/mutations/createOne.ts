import { mutationField, nonNull } from 'nexus'

export const ProductCollectionCreateOneMutation = mutationField(
  'createOneProductCollection',
  {
    type: nonNull('ProductCollection'),
    args: {
      data: 'ProductCollectionCreateInput',
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.productCollection.create({
        data,
        ...select,
      })
    },
  },
)
