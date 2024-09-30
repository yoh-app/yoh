import { mutationField, nonNull } from 'nexus'

export const VideoViewDeleteManyMutation = mutationField(
  'deleteManyVideoView',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'VideoViewWhereInput',
    },
    resolve: async (_parent, { where }, { prisma }) => {
      return prisma.videoView.deleteMany({ where } as any)
    },
  },
)
