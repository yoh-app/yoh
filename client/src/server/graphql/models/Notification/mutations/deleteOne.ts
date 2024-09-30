import { mutationField, nonNull } from 'nexus'

export const NotificationDeleteOneMutation = mutationField(
  'deleteOneNotification',
  {
    type: 'Notification',
    args: {
      where: nonNull('NotificationWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.notification.delete({
        where,
        ...select,
      })
    },
  },
)
