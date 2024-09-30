import { queryField, list } from 'nexus'

export const RequestFindFirstQuery = queryField('findFirstRequest', {
  type: 'Request',
  args: {
    where: 'RequestWhereInput',
    orderBy: list('RequestOrderByWithRelationInput'),
    cursor: 'RequestWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'RequestScalarFieldEnum',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.request.findFirst({
      ...args,
      ...select,
    })
  },
})
