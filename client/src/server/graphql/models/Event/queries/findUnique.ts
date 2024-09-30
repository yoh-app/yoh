import { queryField, nonNull } from 'nexus'

export const EventFindUniqueQuery = queryField('findUniqueEvent', {
  type: 'Event',
  args: {
    where: nonNull('EventWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.event.findUnique({
      where,
      ...select,
    })
  },
})
