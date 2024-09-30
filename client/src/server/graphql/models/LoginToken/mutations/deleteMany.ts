import { mutationField, nonNull } from 'nexus'

export const LoginTokenDeleteManyMutation = mutationField(
  'deleteManyLoginToken',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'LoginTokenWhereInput',
    },
    resolve: async (_parent, { where }, { prisma }) => {
      return prisma.loginToken.deleteMany({ where } as any)
    },
  },
)
