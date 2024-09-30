import { mutationField, nonNull } from 'nexus'

export const NotificationUpdateOneMutation = mutationField(
  'updateOneNotification',
  {
    type: nonNull('Notification'),
    args: {
      data: nonNull('NotificationUpdateInput'),
      where: nonNull('NotificationWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.notification.update({
        where,
        data,
        ...select,
      })
    },
  },
)
