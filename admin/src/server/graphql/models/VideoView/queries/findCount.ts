import { queryField, nonNull, list } from 'nexus'

export const VideoViewFindCountQuery = queryField('findManyVideoViewCount', {
  type: nonNull('Int'),
  args: {
    where: 'VideoViewWhereInput',
    orderBy: list('VideoViewOrderByWithRelationInput'),
    cursor: 'VideoViewWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'VideoViewScalarFieldEnum',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.videoView.count(args as any)
  },
})
