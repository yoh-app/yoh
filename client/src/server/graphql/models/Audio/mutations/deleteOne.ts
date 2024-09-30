import { mutationField, nonNull } from 'nexus'

export const AudioDeleteOneMutation = mutationField('deleteOneAudio', {
  type: 'Audio',
  args: {
    where: nonNull('AudioWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.audio.delete({
      where,
      ...select,
    })
  },
})
