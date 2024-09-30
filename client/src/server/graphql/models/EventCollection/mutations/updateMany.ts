import { mutationField, nonNull } from 'nexus'

export const EventCollectionUpdateManyMutation = mutationField(
  'updateManyEventCollection',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('EventCollectionUpdateManyMutationInput'),
      where: 'EventCollectionWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.eventCollection.updateMany(args as any)
    },
  },
)
