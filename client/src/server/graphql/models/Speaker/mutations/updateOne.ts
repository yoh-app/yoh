import { mutationField, nonNull } from 'nexus'

export const SpeakerUpdateOneMutation = mutationField('updateOneSpeaker', {
  type: nonNull('Speaker'),
  args: {
    data: nonNull('SpeakerUpdateInput'),
    where: nonNull('SpeakerWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.speaker.update({
      where,
      data,
      ...select,
    })
  },
})
