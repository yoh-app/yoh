import { mutationField, nonNull } from 'nexus'

export const EventCollectionCreateOneMutation = mutationField(
  'createOneEventCollection',
  {
    type: nonNull('EventCollection'),
    args: {
      data: 'EventCollectionCreateInput',
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.eventCollection.create({
        data,
        ...select,
      })
    },
  },
)
