import { queryField, nonNull, list } from 'nexus'

export const VideoFindManyQuery = queryField('findManyVideo', {
  type: nonNull(list(nonNull('Video'))),
  args: {
    where: 'VideoWhereInput',
    orderBy: list('VideoOrderByWithRelationInput'),
    cursor: 'VideoWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'VideoScalarFieldEnum',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.video.findMany({
      ...args,
      ...select,
    })
  },
})
