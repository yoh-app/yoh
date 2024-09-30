import { queryField, list } from 'nexus'

export const VideoFindFirstQuery = queryField('findFirstVideo', {
  type: 'Video',
  args: {
    where: 'VideoWhereInput',
    orderBy: list('VideoOrderByWithRelationInput'),
    cursor: 'VideoWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'VideoScalarFieldEnum',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.video.findFirst({
      ...args,
      ...select,
    })
  },
})
