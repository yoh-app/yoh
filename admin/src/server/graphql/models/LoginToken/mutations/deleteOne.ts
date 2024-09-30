import { mutationField, nonNull } from 'nexus'

export const LoginTokenDeleteOneMutation = mutationField(
  'deleteOneLoginToken',
  {
    type: 'LoginToken',
    args: {
      where: nonNull('LoginTokenWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.loginToken.delete({
        where,
        ...select,
      })
    },
  },
)
