import { mutationField, nonNull } from 'nexus'

export const AudioViewDeleteManyMutation = mutationField(
  'deleteManyAudioView',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'AudioViewWhereInput',
    },
    resolve: async (_parent, { where }, { prisma }) => {
      return prisma.audioView.deleteMany({ where } as any)
    },
  },
)
