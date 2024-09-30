import { queryField, nonNull, list } from 'nexus'

export const AudioCollectionFindCountQuery = queryField(
  'findManyAudioCollectionCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'AudioCollectionWhereInput',
      orderBy: list('AudioCollectionOrderByWithRelationInput'),
      cursor: 'AudioCollectionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: 'AudioCollectionScalarFieldEnum',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.audioCollection.count(args as any)
    },
  },
)
