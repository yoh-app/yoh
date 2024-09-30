import { mutationField, nonNull } from 'nexus'

export const EventUpdateManyMutation = mutationField('updateManyEvent', {
  type: nonNull('BatchPayload'),
  args: {
    data: nonNull('EventUpdateManyMutationInput'),
    where: 'EventWhereInput',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.event.updateMany(args as any)
  },
})
