import { queryField, nonNull, list } from 'nexus'

export const RequestFindCountQuery = queryField('findManyRequestCount', {
  type: nonNull('Int'),
  args: {
    where: 'RequestWhereInput',
    orderBy: list('RequestOrderByWithRelationInput'),
    cursor: 'RequestWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'RequestScalarFieldEnum',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.request.count(args as any)
  },
})
