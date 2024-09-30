import { queryField, nonNull } from 'nexus'

export const VideoViewFindUniqueQuery = queryField('findUniqueVideoView', {
  type: 'VideoView',
  args: {
    where: nonNull('VideoViewWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.videoView.findUnique({
      where,
      ...select,
    })
  },
})
