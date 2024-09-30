import { queryField, nonNull, list } from 'nexus'

export const NotificationFindCountQuery = queryField(
  'findManyNotificationCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'NotificationWhereInput',
      orderBy: list('NotificationOrderByWithRelationInput'),
      cursor: 'NotificationWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: 'NotificationScalarFieldEnum',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.notification.count(args as any)
    },
  },
)
