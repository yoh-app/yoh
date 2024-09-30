import { queryField, nonNull, list } from 'nexus'

export const RefreshTokenFindManyQuery = queryField('findManyRefreshToken', {
  type: nonNull(list(nonNull('RefreshToken'))),
  args: {
    where: 'RefreshTokenWhereInput',
    orderBy: list('RefreshTokenOrderByWithRelationInput'),
    cursor: 'RefreshTokenWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'RefreshTokenScalarFieldEnum',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.refreshToken.findMany({
      ...args,
      ...select,
    })
  },
})
