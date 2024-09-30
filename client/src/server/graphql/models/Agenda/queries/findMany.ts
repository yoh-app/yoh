import { queryField, nonNull, list } from 'nexus'

export const AgendaFindManyQuery = queryField('findManyAgenda', {
  type: nonNull(list(nonNull('Agenda'))),
  args: {
    where: 'AgendaWhereInput',
    orderBy: list('AgendaOrderByWithRelationInput'),
    cursor: 'AgendaWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'AgendaScalarFieldEnum',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.agenda.findMany({
      ...args,
      ...select,
    })
  },
})
