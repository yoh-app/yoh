import { mutationField, nonNull } from 'nexus'

export const AttributeDeleteManyMutation = mutationField(
  'deleteManyAttribute',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'AttributeWhereInput',
    },
    resolve: async (_parent, { where }, { prisma }) => {
      return prisma.attribute.deleteMany({ where } as any)
    },
  },
)
