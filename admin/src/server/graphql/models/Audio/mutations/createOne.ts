import { mutationField, nonNull } from 'nexus'

export const AudioCreateOneMutation = mutationField('createOneAudio', {
  type: nonNull('Audio'),
  args: {
    data: 'AudioCreateInput',
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.audio.create({
      data,
      ...select,
    })
  },
})
