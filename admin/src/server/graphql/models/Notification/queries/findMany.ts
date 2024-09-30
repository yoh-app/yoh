import { queryField, nonNull, list } from 'nexus'

export const NotificationFindManyQuery = queryField('findManyNotification', {
  type: nonNull(list(nonNull('Notification'))),
  args: {
    where: 'NotificationWhereInput',
    orderBy: list('NotificationOrderByWithRelationInput'),
    cursor: 'NotificationWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'NotificationScalarFieldEnum',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.notification.findMany({
      ...args,
      ...select,
    })
  },
})
