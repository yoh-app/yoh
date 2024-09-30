import { mutationField, nonNull } from 'nexus'

export const RefreshTokenDeleteManyMutation = mutationField(
  'deleteManyRefreshToken',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'RefreshTokenWhereInput',
    },
    resolve: async (_parent, { where }, { prisma }) => {
      return prisma.refreshToken.deleteMany({ where } as any)
    },
  },
)
