import { mutationField, nonNull } from 'nexus'

export const VideoViewUpdateOneMutation = mutationField('updateOneVideoView', {
  type: nonNull('VideoView'),
  args: {
    data: nonNull('VideoViewUpdateInput'),
    where: nonNull('VideoViewWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.videoView.update({
      where,
      data,
      ...select,
    })
  },
})
