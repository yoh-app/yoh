import { mutationField, nonNull } from 'nexus'

export const AudioUpdateOneMutation = mutationField('updateOneAudio', {
  type: nonNull('Audio'),
  args: {
    data: nonNull('AudioUpdateInput'),
    where: nonNull('AudioWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.audio.update({
      where,
      data,
      ...select,
    })
  },
})
