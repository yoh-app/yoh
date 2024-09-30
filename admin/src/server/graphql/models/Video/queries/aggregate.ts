import { queryField, list } from 'nexus'

export const VideoAggregateQuery = queryField('aggregateVideo', {
  type: 'AggregateVideo',
  args: {
    where: 'VideoWhereInput',
    orderBy: list('VideoOrderByWithRelationInput'),
    cursor: 'VideoWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.video.aggregate({ ...args, ...select }) as any
  },
})
