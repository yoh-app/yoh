import { mutationField, nonNull } from 'nexus'

export const RefreshTokenDeleteOneMutation = mutationField(
  'deleteOneRefreshToken',
  {
    type: 'RefreshToken',
    args: {
      where: nonNull('RefreshTokenWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.refreshToken.delete({
        where,
        ...select,
      })
    },
  },
)
