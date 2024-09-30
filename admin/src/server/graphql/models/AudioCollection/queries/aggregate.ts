import { queryField, list } from 'nexus'

export const AudioCollectionAggregateQuery = queryField(
  'aggregateAudioCollection',
  {
    type: 'AggregateAudioCollection',
    args: {
      where: 'AudioCollectionWhereInput',
      orderBy: list('AudioCollectionOrderByWithRelationInput'),
      cursor: 'AudioCollectionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.audioCollection.aggregate({ ...args, ...select }) as any
    },
  },
)
