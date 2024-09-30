import { mutationField, nonNull } from 'nexus'

export const AttributeUpsertOneMutation = mutationField('upsertOneAttribute', {
  type: nonNull('Attribute'),
  args: {
    where: nonNull('AttributeWhereUniqueInput'),
    create: nonNull('AttributeCreateInput'),
    update: nonNull('AttributeUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.attribute.upsert({
      ...args,
      ...select,
    })
  },
})
