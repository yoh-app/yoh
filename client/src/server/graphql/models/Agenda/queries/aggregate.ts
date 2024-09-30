import { queryField, list } from 'nexus'

export const AgendaAggregateQuery = queryField('aggregateAgenda', {
  type: 'AggregateAgenda',
  args: {
    where: 'AgendaWhereInput',
    orderBy: list('AgendaOrderByWithRelationInput'),
    cursor: 'AgendaWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.agenda.aggregate({ ...args, ...select }) as any
  },
})
