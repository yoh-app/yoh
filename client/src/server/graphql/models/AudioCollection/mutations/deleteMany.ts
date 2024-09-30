import { mutationField, nonNull } from 'nexus'

export const AudioCollectionDeleteManyMutation = mutationField(
  'deleteManyAudioCollection',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'AudioCollectionWhereInput',
    },
    resolve: async (_parent, { where }, { prisma }) => {
      return prisma.audioCollection.deleteMany({ where } as any)
    },
  },
)
