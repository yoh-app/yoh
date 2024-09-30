import { queryField, nonNull } from 'nexus'

export const RefreshTokenFindUniqueQuery = queryField(
  'findUniqueRefreshToken',
  {
    type: 'RefreshToken',
    args: {
      where: nonNull('RefreshTokenWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.refreshToken.findUnique({
        where,
        ...select,
      })
    },
  },
)
