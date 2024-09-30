import { queryField, nonNull, list } from 'nexus'

export const RefreshTokenFindCountQuery = queryField(
  'findManyRefreshTokenCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'RefreshTokenWhereInput',
      orderBy: list('RefreshTokenOrderByWithRelationInput'),
      cursor: 'RefreshTokenWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: 'RefreshTokenScalarFieldEnum',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.refreshToken.count(args as any)
    },
  },
)
