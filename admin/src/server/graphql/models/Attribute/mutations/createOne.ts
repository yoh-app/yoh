import { mutationField, nonNull } from 'nexus'

export const AttributeCreateOneMutation = mutationField('createOneAttribute', {
  type: nonNull('Attribute'),
  args: {
    data: 'AttributeCreateInput',
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.attribute.create({
      data,
      ...select,
    })
  },
})
