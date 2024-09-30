import { queryField, list } from 'nexus'

export const SpeakerAggregateQuery = queryField('aggregateSpeaker', {
  type: 'AggregateSpeaker',
  args: {
    where: 'SpeakerWhereInput',
    orderBy: list('SpeakerOrderByWithRelationInput'),
    cursor: 'SpeakerWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.speaker.aggregate({ ...args, ...select }) as any
  },
})
