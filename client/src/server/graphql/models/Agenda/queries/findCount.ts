import { queryField, nonNull, list } from 'nexus'

export const AgendaFindCountQuery = queryField('findManyAgendaCount', {
  type: nonNull('Int'),
  args: {
    where: 'AgendaWhereInput',
    orderBy: list('AgendaOrderByWithRelationInput'),
    cursor: 'AgendaWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'AgendaScalarFieldEnum',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.agenda.count(args as any)
  },
})
