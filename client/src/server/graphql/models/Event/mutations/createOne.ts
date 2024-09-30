import { mutationField, nonNull } from 'nexus'

export const EventCreateOneMutation = mutationField('createOneEvent', {
  type: nonNull('Event'),
  args: {
    data: 'EventCreateInput',
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.event.create({
      data,
      ...select,
    })
  },
})
