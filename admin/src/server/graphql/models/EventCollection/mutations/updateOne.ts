import { mutationField, nonNull } from 'nexus'

export const EventCollectionUpdateOneMutation = mutationField(
  'updateOneEventCollection',
  {
    type: nonNull('EventCollection'),
    args: {
      data: nonNull('EventCollectionUpdateInput'),
      where: nonNull('EventCollectionWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.eventCollection.update({
        where,
        data,
        ...select,
      })
    },
  },
)
