import { queryField, nonNull, list } from 'nexus'

export const LoginTokenFindCountQuery = queryField('findManyLoginTokenCount', {
  type: nonNull('Int'),
  args: {
    where: 'LoginTokenWhereInput',
    orderBy: list('LoginTokenOrderByWithRelationInput'),
    cursor: 'LoginTokenWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'LoginTokenScalarFieldEnum',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.loginToken.count(args as any)
  },
})
