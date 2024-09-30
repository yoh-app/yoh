import { mutationField, nonNull } from 'nexus'

export const AudioCollectionDeleteOneMutation = mutationField(
  'deleteOneAudioCollection',
  {
    type: 'AudioCollection',
    args: {
      where: nonNull('AudioCollectionWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.audioCollection.delete({
        where,
        ...select,
      })
    },
  },
)
