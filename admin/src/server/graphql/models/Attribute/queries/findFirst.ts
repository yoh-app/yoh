import { queryField, list } from 'nexus'

export const AttributeFindFirstQuery = queryField('findFirstAttribute', {
  type: 'Attribute',
  args: {
    where: 'AttributeWhereInput',
    orderBy: list('AttributeOrderByWithRelationInput'),
    cursor: 'AttributeWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'AttributeScalarFieldEnum',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.attribute.findFirst({
      ...args,
      ...select,
    })
  },
})
