import { mutationField, nonNull } from 'nexus'

export const AudioCollectionUpdateManyMutation = mutationField(
  'updateManyAudioCollection',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('AudioCollectionUpdateManyMutationInput'),
      where: 'AudioCollectionWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.audioCollection.updateMany(args as any)
    },
  },
)
