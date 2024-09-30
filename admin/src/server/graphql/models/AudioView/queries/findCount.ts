import { queryField, nonNull, list } from 'nexus'

export const AudioViewFindCountQuery = queryField('findManyAudioViewCount', {
  type: nonNull('Int'),
  args: {
    where: 'AudioViewWhereInput',
    orderBy: list('AudioViewOrderByWithRelationInput'),
    cursor: 'AudioViewWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'AudioViewScalarFieldEnum',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.audioView.count(args as any)
  },
})
