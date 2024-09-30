import { queryField, nonNull } from 'nexus'

export const AudioCollectionFindUniqueQuery = queryField(
  'findUniqueAudioCollection',
  {
    type: 'AudioCollection',
    args: {
      where: nonNull('AudioCollectionWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.audioCollection.findUnique({
        where,
        ...select,
      })
    },
  },
)
