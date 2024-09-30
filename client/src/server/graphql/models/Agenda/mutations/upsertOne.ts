import { mutationField, nonNull } from 'nexus'

export const AgendaUpsertOneMutation = mutationField('upsertOneAgenda', {
  type: nonNull('Agenda'),
  args: {
    where: nonNull('AgendaWhereUniqueInput'),
    create: nonNull('AgendaCreateInput'),
    update: nonNull('AgendaUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.agenda.upsert({
      ...args,
      ...select,
    })
  },
})
