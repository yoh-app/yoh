import { queryField, nonNull } from 'nexus'

export const EventCollectionFindUniqueQuery = queryField(
  'findUniqueEventCollection',
  {
    type: 'EventCollection',
    args: {
      where: nonNull('EventCollectionWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.eventCollection.findUnique({
        where,
        ...select,
      })
    },
  },
)
