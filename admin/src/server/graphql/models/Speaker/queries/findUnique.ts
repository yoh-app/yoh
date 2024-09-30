import { queryField, nonNull } from 'nexus'

export const SpeakerFindUniqueQuery = queryField('findUniqueSpeaker', {
  type: 'Speaker',
  args: {
    where: nonNull('SpeakerWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.speaker.findUnique({
      where,
      ...select,
    })
  },
})
