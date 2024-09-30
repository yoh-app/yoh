import { queryField, nonNull, list } from 'nexus'

export const LoginTokenFindManyQuery = queryField('findManyLoginToken', {
  type: nonNull(list(nonNull('LoginToken'))),
  args: {
    where: 'LoginTokenWhereInput',
    orderBy: list('LoginTokenOrderByWithRelationInput'),
    cursor: 'LoginTokenWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'LoginTokenScalarFieldEnum',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.loginToken.findMany({
      ...args,
      ...select,
    })
  },
})
