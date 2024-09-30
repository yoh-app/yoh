import { mutationField, nonNull } from 'nexus'

export const AgendaDeleteManyMutation = mutationField('deleteManyAgenda', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'AgendaWhereInput',
  },
  resolve: async (_parent, { where }, { prisma }) => {
    return prisma.agenda.deleteMany({ where } as any)
  },
})
