import { queryField, list } from 'nexus'

export const NotificationAggregateQuery = queryField('aggregateNotification', {
  type: 'AggregateNotification',
  args: {
    where: 'NotificationWhereInput',
    orderBy: list('NotificationOrderByWithRelationInput'),
    cursor: 'NotificationWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.notification.aggregate({ ...args, ...select }) as any
  },
})
