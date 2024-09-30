import { queryField, nonNull } from 'nexus'

export const VideoFindUniqueQuery = queryField('findUniqueVideo', {
  type: 'Video',
  args: {
    where: nonNull('VideoWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.video.findUnique({
      where,
      ...select,
    })
  },
})
