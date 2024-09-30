import { queryField, nonNull, list } from 'nexus'

export const RequestFindManyQuery = queryField('findManyRequest', {
  type: nonNull(list(nonNull('Request'))),
  args: {
    where: 'RequestWhereInput',
    orderBy: list('RequestOrderByWithRelationInput'),
    cursor: 'RequestWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'RequestScalarFieldEnum',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.request.findMany({
      ...args,
      ...select,
    })
  },
})
