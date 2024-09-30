import { mutationField, nonNull } from 'nexus'

export const EventUpdateOneMutation = mutationField('updateOneEvent', {
  type: nonNull('Event'),
  args: {
    data: nonNull('EventUpdateInput'),
    where: nonNull('EventWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.event.update({
      where,
      data,
      ...select,
    })
  },
})
