import { mutationField, nonNull } from 'nexus'

export const NotificationDeleteManyMutation = mutationField(
  'deleteManyNotification',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'NotificationWhereInput',
    },
    resolve: async (_parent, { where }, { prisma }) => {
      return prisma.notification.deleteMany({ where } as any)
    },
  },
)
