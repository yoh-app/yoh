import { queryField, list } from 'nexus'

export const EventGroupFindFirstQuery = queryField('findFirstEventGroup', {
  type: 'EventGroup',
  args: {
    where: 'EventGroupWhereInput',
    orderBy: list('EventGroupOrderByWithRelationInput'),
    cursor: 'EventGroupWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'EventGroupScalarFieldEnum',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.eventGroup.findFirst({
      ...args,
      ...select,
    })
  },
})
