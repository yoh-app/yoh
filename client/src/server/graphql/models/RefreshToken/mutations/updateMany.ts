import { mutationField, nonNull } from 'nexus'

export const RefreshTokenUpdateManyMutation = mutationField(
  'updateManyRefreshToken',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('RefreshTokenUpdateManyMutationInput'),
      where: 'RefreshTokenWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.refreshToken.updateMany(args as any)
    },
  },
)
