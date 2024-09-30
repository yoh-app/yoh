import { mutationField, nonNull } from 'nexus'

export const RefreshTokenUpdateOneMutation = mutationField(
  'updateOneRefreshToken',
  {
    type: nonNull('RefreshToken'),
    args: {
      data: nonNull('RefreshTokenUpdateInput'),
      where: nonNull('RefreshTokenWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.refreshToken.update({
        where,
        data,
        ...select,
      })
    },
  },
)
