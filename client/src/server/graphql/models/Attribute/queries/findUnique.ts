import { queryField, nonNull } from 'nexus'

export const AttributeFindUniqueQuery = queryField('findUniqueAttribute', {
  type: 'Attribute',
  args: {
    where: nonNull('AttributeWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.attribute.findUnique({
      where,
      ...select,
    })
  },
})
