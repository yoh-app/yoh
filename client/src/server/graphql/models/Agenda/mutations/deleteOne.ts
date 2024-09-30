import { mutationField, nonNull } from 'nexus'

export const AgendaDeleteOneMutation = mutationField('deleteOneAgenda', {
  type: 'Agenda',
  args: {
    where: nonNull('AgendaWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.agenda.delete({
      where,
      ...select,
    })
  },
})
