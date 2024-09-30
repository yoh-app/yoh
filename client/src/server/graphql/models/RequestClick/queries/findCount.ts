import { queryField, nonNull, list } from 'nexus'

export const RequestClickFindCountQuery = queryField(
  'findManyRequestClickCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'RequestClickWhereInput',
      orderBy: list('RequestClickOrderByWithRelationInput'),
      cursor: 'RequestClickWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: 'RequestClickScalarFieldEnum',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.requestClick.count(args as any)
    },
  },
)
