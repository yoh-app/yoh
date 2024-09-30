import { mutationField, nonNull } from 'nexus'

export const EventUpsertOneMutation = mutationField('upsertOneEvent', {
  type: nonNull('Event'),
  args: {
    where: nonNull('EventWhereUniqueInput'),
    create: nonNull('EventCreateInput'),
    update: nonNull('EventUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.event.upsert({
      ...args,
      ...select,
    })
  },
})
