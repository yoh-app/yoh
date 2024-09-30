import { mutationField, nonNull } from 'nexus'

export const LoginTokenUpsertOneMutation = mutationField(
  'upsertOneLoginToken',
  {
    type: nonNull('LoginToken'),
    args: {
      where: nonNull('LoginTokenWhereUniqueInput'),
      create: nonNull('LoginTokenCreateInput'),
      update: nonNull('LoginTokenUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.loginToken.upsert({
        ...args,
        ...select,
      })
    },
  },
)
