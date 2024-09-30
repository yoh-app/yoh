import { queryField, list } from 'nexus'

export const AudioAggregateQuery = queryField('aggregateAudio', {
  type: 'AggregateAudio',
  args: {
    where: 'AudioWhereInput',
    orderBy: list('AudioOrderByWithRelationInput'),
    cursor: 'AudioWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.audio.aggregate({ ...args, ...select }) as any
  },
})
