import { mutationField, nonNull } from 'nexus'

export const VideoViewUpdateManyMutation = mutationField(
  'updateManyVideoView',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('VideoViewUpdateManyMutationInput'),
      where: 'VideoViewWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.videoView.updateMany(args as any)
    },
  },
)
