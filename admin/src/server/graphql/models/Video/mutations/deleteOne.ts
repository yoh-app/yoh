import { mutationField, nonNull } from 'nexus'

export const VideoDeleteOneMutation = mutationField('deleteOneVideo', {
  type: 'Video',
  args: {
    where: nonNull('VideoWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.video.delete({
      where,
      ...select,
    })
  },
})
