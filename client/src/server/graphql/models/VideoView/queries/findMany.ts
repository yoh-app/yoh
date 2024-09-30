import { queryField, nonNull, list } from 'nexus'

export const VideoViewFindManyQuery = queryField('findManyVideoView', {
  type: nonNull(list(nonNull('VideoView'))),
  args: {
    where: 'VideoViewWhereInput',
    orderBy: list('VideoViewOrderByWithRelationInput'),
    cursor: 'VideoViewWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'VideoViewScalarFieldEnum',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.videoView.findMany({
      ...args,
      ...select,
    })
  },
})
