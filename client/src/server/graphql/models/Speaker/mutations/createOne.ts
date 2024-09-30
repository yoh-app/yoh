import { mutationField, nonNull } from 'nexus'

export const SpeakerCreateOneMutation = mutationField('createOneSpeaker', {
  type: nonNull('Speaker'),
  args: {
    data: 'SpeakerCreateInput',
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.speaker.create({
      data,
      ...select,
    })
  },
})
