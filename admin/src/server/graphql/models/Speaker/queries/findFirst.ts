import { queryField, list } from 'nexus'

export const SpeakerFindFirstQuery = queryField('findFirstSpeaker', {
  type: 'Speaker',
  args: {
    where: 'SpeakerWhereInput',
    orderBy: list('SpeakerOrderByWithRelationInput'),
    cursor: 'SpeakerWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'SpeakerScalarFieldEnum',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.speaker.findFirst({
      ...args,
      ...select,
    })
  },
})
