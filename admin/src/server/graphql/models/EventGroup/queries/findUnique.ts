import { queryField, nonNull } from 'nexus'

export const EventGroupFindUniqueQuery = queryField('findUniqueEventGroup', {
  type: 'EventGroup',
  args: {
    where: nonNull('EventGroupWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.eventGroup.findUnique({
      where,
      ...select,
    })
  },
})
