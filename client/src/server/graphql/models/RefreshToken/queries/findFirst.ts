import { queryField, list } from 'nexus'

export const RefreshTokenFindFirstQuery = queryField('findFirstRefreshToken', {
  type: 'RefreshToken',
  args: {
    where: 'RefreshTokenWhereInput',
    orderBy: list('RefreshTokenOrderByWithRelationInput'),
    cursor: 'RefreshTokenWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'RefreshTokenScalarFieldEnum',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.refreshToken.findFirst({
      ...args,
      ...select,
    })
  },
})
