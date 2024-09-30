import { queryField, list } from 'nexus'

export const VideoCollectionAggregateQuery = queryField(
  'aggregateVideoCollection',
  {
    type: 'AggregateVideoCollection',
    args: {
      where: 'VideoCollectionWhereInput',
      orderBy: list('VideoCollectionOrderByWithRelationInput'),
      cursor: 'VideoCollectionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.videoCollection.aggregate({ ...args, ...select }) as any
    },
  },
)
