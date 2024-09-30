import { mutationField, nonNull } from 'nexus'

export const RefreshTokenCreateOneMutation = mutationField(
  'createOneRefreshToken',
  {
    type: nonNull('RefreshToken'),
    args: {
      data: nonNull('RefreshTokenCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.refreshToken.create({
        data,
        ...select,
      })
    },
  },
)
