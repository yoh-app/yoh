import { mutationField, nonNull } from 'nexus'

export const EventCollectionDeleteOneMutation = mutationField(
  'deleteOneEventCollection',
  {
    type: 'EventCollection',
    args: {
      where: nonNull('EventCollectionWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.eventCollection.delete({
        where,
        ...select,
      })
    },
  },
)
