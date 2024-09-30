import { mutationField, nonNull } from 'nexus'

export const LoginTokenUpdateManyMutation = mutationField(
  'updateManyLoginToken',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('LoginTokenUpdateManyMutationInput'),
      where: 'LoginTokenWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.loginToken.updateMany(args as any)
    },
  },
)
