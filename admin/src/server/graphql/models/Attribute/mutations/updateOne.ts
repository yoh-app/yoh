import { mutationField, nonNull } from 'nexus'

export const AttributeUpdateOneMutation = mutationField('updateOneAttribute', {
  type: nonNull('Attribute'),
  args: {
    data: nonNull('AttributeUpdateInput'),
    where: nonNull('AttributeWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.attribute.update({
      where,
      data,
      ...select,
    })
  },
})
