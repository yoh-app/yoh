import { queryField, list } from 'nexus'

export const EventFindFirstQuery = queryField('findFirstEvent', {
  type: 'Event',
  args: {
    where: 'EventWhereInput',
    orderBy: list('EventOrderByWithRelationInput'),
    cursor: 'EventWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'EventScalarFieldEnum',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.event.findFirst({
      ...args,
      ...select,
    })
  },
})
