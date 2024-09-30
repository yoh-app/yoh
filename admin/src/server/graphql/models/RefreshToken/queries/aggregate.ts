import { queryField, list } from 'nexus'

export const RefreshTokenAggregateQuery = queryField('aggregateRefreshToken', {
  type: 'AggregateRefreshToken',
  args: {
    where: 'RefreshTokenWhereInput',
    orderBy: list('RefreshTokenOrderByWithRelationInput'),
    cursor: 'RefreshTokenWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.refreshToken.aggregate({ ...args, ...select }) as any
  },
})
