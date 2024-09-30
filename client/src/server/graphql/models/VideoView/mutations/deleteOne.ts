import { mutationField, nonNull } from 'nexus'

export const VideoViewDeleteOneMutation = mutationField('deleteOneVideoView', {
  type: 'VideoView',
  args: {
    where: nonNull('VideoViewWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.videoView.delete({
      where,
      ...select,
    })
  },
})
