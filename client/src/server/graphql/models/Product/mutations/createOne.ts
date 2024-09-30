import { mutationField, nonNull } from 'nexus'

export const ProductCreateOneMutation = mutationField('createOneProduct', {
  type: nonNull('Product'),
  args: {
    data: 'ProductCreateInput',
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.product.create({
      data,
      ...select,
    })
  },
})
