import { queryField, nonNull } from 'nexus'

export const NotificationFindUniqueQuery = queryField(
  'findUniqueNotification',
  {
    type: 'Notification',
    args: {
      where: nonNull('NotificationWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.notification.findUnique({
        where,
        ...select,
      })
    },
  },
)
