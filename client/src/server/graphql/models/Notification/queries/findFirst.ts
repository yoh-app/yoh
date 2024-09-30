import { queryField, list } from 'nexus'

export const NotificationFindFirstQuery = queryField('findFirstNotification', {
  type: 'Notification',
  args: {
    where: 'NotificationWhereInput',
    orderBy: list('NotificationOrderByWithRelationInput'),
    cursor: 'NotificationWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'NotificationScalarFieldEnum',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.notification.findFirst({
      ...args,
      ...select,
    })
  },
})
