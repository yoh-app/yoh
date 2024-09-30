import { mutationField, nonNull } from 'nexus'

export const EventCollectionDeleteManyMutation = mutationField(
  'deleteManyEventCollection',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'EventCollectionWhereInput',
    },
    resolve: async (_parent, { where }, { prisma }) => {
      return prisma.eventCollection.deleteMany({ where } as any)
    },
  },
)
