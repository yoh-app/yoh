import { mutationField, nonNull } from 'nexus'

export const SpeakerDeleteOneMutation = mutationField('deleteOneSpeaker', {
  type: 'Speaker',
  args: {
    where: nonNull('SpeakerWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.speaker.delete({
      where,
      ...select,
    })
  },
})
