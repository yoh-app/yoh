import { mutationField, nonNull } from 'nexus'

export const AudioViewUpdateManyMutation = mutationField(
  'updateManyAudioView',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('AudioViewUpdateManyMutationInput'),
      where: 'AudioViewWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.audioView.updateMany(args as any)
    },
  },
)
