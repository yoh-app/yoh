import { mutationField, nonNull } from 'nexus'

export const NotificationUpsertOneMutation = mutationField(
  'upsertOneNotification',
  {
    type: nonNull('Notification'),
    args: {
      where: nonNull('NotificationWhereUniqueInput'),
      create: nonNull('NotificationCreateInput'),
      update: nonNull('NotificationUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.notification.upsert({
        ...args,
        ...select,
      })
    },
  },
)
