import { queryField, nonNull, list } from 'nexus'

export const SpeakerFindCountQuery = queryField('findManySpeakerCount', {
  type: nonNull('Int'),
  args: {
    where: 'SpeakerWhereInput',
    orderBy: list('SpeakerOrderByWithRelationInput'),
    cursor: 'SpeakerWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'SpeakerScalarFieldEnum',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.speaker.count(args as any)
  },
})
