import { queryField, list } from 'nexus'

export const AgendaFindFirstQuery = queryField('findFirstAgenda', {
  type: 'Agenda',
  args: {
    where: 'AgendaWhereInput',
    orderBy: list('AgendaOrderByWithRelationInput'),
    cursor: 'AgendaWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'AgendaScalarFieldEnum',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.agenda.findFirst({
      ...args,
      ...select,
    })
  },
})
