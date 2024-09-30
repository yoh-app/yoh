import { queryField, list } from 'nexus'

export const AudioCollectionFindFirstQuery = queryField(
  'findFirstAudioCollection',
  {
    type: 'AudioCollection',
    args: {
      where: 'AudioCollectionWhereInput',
      orderBy: list('AudioCollectionOrderByWithRelationInput'),
      cursor: 'AudioCollectionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: 'AudioCollectionScalarFieldEnum',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.audioCollection.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
