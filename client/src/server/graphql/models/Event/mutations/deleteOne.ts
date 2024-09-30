import { mutationField, nonNull } from 'nexus'

export const EventDeleteOneMutation = mutationField('deleteOneEvent', {
  type: 'Event',
  args: {
    where: nonNull('EventWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.event.delete({
      where,
      ...select,
    })
  },
})
