import { queryField, list } from 'nexus'

export const VideoViewAggregateQuery = queryField('aggregateVideoView', {
  type: 'AggregateVideoView',
  args: {
    where: 'VideoViewWhereInput',
    orderBy: list('VideoViewOrderByWithRelationInput'),
    cursor: 'VideoViewWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.videoView.aggregate({ ...args, ...select }) as any
  },
})
