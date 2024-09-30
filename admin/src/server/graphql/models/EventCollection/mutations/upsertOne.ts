import { mutationField, nonNull } from 'nexus'

export const EventCollectionUpsertOneMutation = mutationField(
  'upsertOneEventCollection',
  {
    type: nonNull('EventCollection'),
    args: {
      where: nonNull('EventCollectionWhereUniqueInput'),
      create: nonNull('EventCollectionCreateInput'),
      update: nonNull('EventCollectionUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.eventCollection.upsert({
        ...args,
        ...select,
      })
    },
  },
)
