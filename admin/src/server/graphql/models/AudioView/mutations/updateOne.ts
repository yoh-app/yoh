import { mutationField, nonNull } from 'nexus'

export const AudioViewUpdateOneMutation = mutationField('updateOneAudioView', {
  type: nonNull('AudioView'),
  args: {
    data: nonNull('AudioViewUpdateInput'),
    where: nonNull('AudioViewWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.audioView.update({
      where,
      data,
      ...select,
    })
  },
})
