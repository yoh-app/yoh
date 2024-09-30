import { mutationField, nonNull } from 'nexus'

export const NotificationUpdateManyMutation = mutationField(
  'updateManyNotification',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('NotificationUpdateManyMutationInput'),
      where: 'NotificationWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.notification.updateMany(args as any)
    },
  },
)
