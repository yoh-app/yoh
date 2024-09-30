import { mutationField, nonNull } from 'nexus'

export const LoginTokenUpdateOneMutation = mutationField(
  'updateOneLoginToken',
  {
    type: nonNull('LoginToken'),
    args: {
      data: nonNull('LoginTokenUpdateInput'),
      where: nonNull('LoginTokenWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.loginToken.update({
        where,
        data,
        ...select,
      })
    },
  },
)
