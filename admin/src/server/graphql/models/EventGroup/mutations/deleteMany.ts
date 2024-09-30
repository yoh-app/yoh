import { mutationField, nonNull } from 'nexus'

export const EventGroupDeleteManyMutation = mutationField(
  'deleteManyEventGroup',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'EventGroupWhereInput',
    },
    resolve: async (_parent, { where }, { prisma }) => {
      return prisma.eventGroup.deleteMany({ where } as any)
    },
  },
)
