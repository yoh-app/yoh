import { queryField, list } from 'nexus'

export const LoginTokenFindFirstQuery = queryField('findFirstLoginToken', {
  type: 'LoginToken',
  args: {
    where: 'LoginTokenWhereInput',
    orderBy: list('LoginTokenOrderByWithRelationInput'),
    cursor: 'LoginTokenWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'LoginTokenScalarFieldEnum',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.loginToken.findFirst({
      ...args,
      ...select,
    })
  },
})
