import { queryField, nonNull } from 'nexus'

export const AgendaFindUniqueQuery = queryField('findUniqueAgenda', {
  type: 'Agenda',
  args: {
    where: nonNull('AgendaWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.agenda.findUnique({
      where,
      ...select,
    })
  },
})
