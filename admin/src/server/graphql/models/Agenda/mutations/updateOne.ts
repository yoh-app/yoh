import { mutationField, nonNull } from 'nexus'

export const AgendaUpdateOneMutation = mutationField('updateOneAgenda', {
  type: nonNull('Agenda'),
  args: {
    data: nonNull('AgendaUpdateInput'),
    where: nonNull('AgendaWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.agenda.update({
      where,
      data,
      ...select,
    })
  },
})
