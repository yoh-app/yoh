import { queryField, nonNull } from 'nexus'

export const LoginTokenFindUniqueQuery = queryField('findUniqueLoginToken', {
  type: 'LoginToken',
  args: {
    where: nonNull('LoginTokenWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.loginToken.findUnique({
      where,
      ...select,
    })
  },
})
