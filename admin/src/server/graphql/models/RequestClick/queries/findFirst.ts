import { queryField, list } from 'nexus'

export const RequestClickFindFirstQuery = queryField('findFirstRequestClick', {
  type: 'RequestClick',
  args: {
    where: 'RequestClickWhereInput',
    orderBy: list('RequestClickOrderByWithRelationInput'),
    cursor: 'RequestClickWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'RequestClickScalarFieldEnum',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.requestClick.findFirst({
      ...args,
      ...select,
    })
  },
})
