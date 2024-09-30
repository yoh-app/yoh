import { mutationField, nonNull } from 'nexus'

export const AudioViewCreateOneMutation = mutationField('createOneAudioView', {
  type: nonNull('AudioView'),
  args: {
    data: 'AudioViewCreateInput',
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.audioView.create({
      data,
      ...select,
    })
  },
})
