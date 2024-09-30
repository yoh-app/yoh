import { queryField, nonNull, list } from 'nexus'

export const SpeakerFindManyQuery = queryField('findManySpeaker', {
  type: nonNull(list(nonNull('Speaker'))),
  args: {
    where: 'SpeakerWhereInput',
    orderBy: list('SpeakerOrderByWithRelationInput'),
    cursor: 'SpeakerWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'SpeakerScalarFieldEnum',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.speaker.findMany({
      ...args,
      ...select,
    })
  },
})
