import { queryField, nonNull, list } from 'nexus'

export const AudioCollectionFindManyQuery = queryField(
  'findManyAudioCollection',
  {
    type: nonNull(list(nonNull('AudioCollection'))),
    args: {
      where: 'AudioCollectionWhereInput',
      orderBy: list('AudioCollectionOrderByWithRelationInput'),
      cursor: 'AudioCollectionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: 'AudioCollectionScalarFieldEnum',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.audioCollection.findMany({
        ...args,
        ...select,
      })
    },
  },
)
