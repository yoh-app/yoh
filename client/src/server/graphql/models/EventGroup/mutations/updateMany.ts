import { mutationField, nonNull } from 'nexus'

export const EventGroupUpdateManyMutation = mutationField(
  'updateManyEventGroup',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('EventGroupUpdateManyMutationInput'),
      where: 'EventGroupWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.eventGroup.updateMany(args as any)
    },
  },
)
