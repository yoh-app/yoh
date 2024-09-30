import { queryField, list } from 'nexus'

export const VideoViewFindFirstQuery = queryField('findFirstVideoView', {
  type: 'VideoView',
  args: {
    where: 'VideoViewWhereInput',
    orderBy: list('VideoViewOrderByWithRelationInput'),
    cursor: 'VideoViewWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'VideoViewScalarFieldEnum',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.videoView.findFirst({
      ...args,
      ...select,
    })
  },
})
