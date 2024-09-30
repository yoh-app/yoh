import { queryField, nonNull, list } from 'nexus'

export const RequestClickFindManyQuery = queryField('findManyRequestClick', {
  type: nonNull(list(nonNull('RequestClick'))),
  args: {
    where: 'RequestClickWhereInput',
    orderBy: list('RequestClickOrderByWithRelationInput'),
    cursor: 'RequestClickWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'RequestClickScalarFieldEnum',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.requestClick.findMany({
      ...args,
      ...select,
    })
  },
})
