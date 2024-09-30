import { mutationField, nonNull } from 'nexus'

export const EventDeleteManyMutation = mutationField('deleteManyEvent', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'EventWhereInput',
  },
  resolve: async (_parent, { where }, { prisma }) => {
    return prisma.event.deleteMany({ where } as any)
  },
})
