import { queryField, list } from 'nexus'

export const AudioViewAggregateQuery = queryField('aggregateAudioView', {
  type: 'AggregateAudioView',
  args: {
    where: 'AudioViewWhereInput',
    orderBy: list('AudioViewOrderByWithRelationInput'),
    cursor: 'AudioViewWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.audioView.aggregate({ ...args, ...select }) as any
  },
})
