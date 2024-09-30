import { mutationField, nonNull } from 'nexus'

export const AttributeUpdateManyMutation = mutationField(
  'updateManyAttribute',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('AttributeUpdateManyMutationInput'),
      where: 'AttributeWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.attribute.updateMany(args as any)
    },
  },
)
