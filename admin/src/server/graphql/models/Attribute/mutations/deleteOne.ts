import { mutationField, nonNull } from 'nexus'

export const AttributeDeleteOneMutation = mutationField('deleteOneAttribute', {
  type: 'Attribute',
  args: {
    where: nonNull('AttributeWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.attribute.delete({
      where,
      ...select,
    })
  },
})
