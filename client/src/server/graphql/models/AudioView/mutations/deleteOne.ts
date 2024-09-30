import { mutationField, nonNull } from 'nexus'

export const AudioViewDeleteOneMutation = mutationField('deleteOneAudioView', {
  type: 'AudioView',
  args: {
    where: nonNull('AudioViewWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.audioView.delete({
      where,
      ...select,
    })
  },
})
