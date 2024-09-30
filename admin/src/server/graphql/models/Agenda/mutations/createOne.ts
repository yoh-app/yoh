import { mutationField, nonNull } from 'nexus'

export const AgendaCreateOneMutation = mutationField('createOneAgenda', {
  type: nonNull('Agenda'),
  args: {
    data: 'AgendaCreateInput',
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.agenda.create({
      data,
      ...select,
    })
  },
})
