import { mutationField, nonNull } from 'nexus'

export const RefreshTokenUpsertOneMutation = mutationField(
  'upsertOneRefreshToken',
  {
    type: nonNull('RefreshToken'),
    args: {
      where: nonNull('RefreshTokenWhereUniqueInput'),
      create: nonNull('RefreshTokenCreateInput'),
      update: nonNull('RefreshTokenUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.refreshToken.upsert({
        ...args,
        ...select,
      })
    },
  },
)
