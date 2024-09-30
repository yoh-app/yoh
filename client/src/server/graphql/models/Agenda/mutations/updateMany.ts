import { mutationField, nonNull } from 'nexus'

export const AgendaUpdateManyMutation = mutationField('updateManyAgenda', {
  type: nonNull('BatchPayload'),
  args: {
    data: nonNull('AgendaUpdateManyMutationInput'),
    where: 'AgendaWhereInput',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.agenda.updateMany(args as any)
  },
})
