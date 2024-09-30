import { queryField, nonNull, list } from 'nexus'

export const VideoFindCountQuery = queryField('findManyVideoCount', {
  type: nonNull('Int'),
  args: {
    where: 'VideoWhereInput',
    orderBy: list('VideoOrderByWithRelationInput'),
    cursor: 'VideoWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'VideoScalarFieldEnum',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.video.count(args as any)
  },
})
