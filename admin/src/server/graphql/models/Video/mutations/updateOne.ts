import { mutationField, nonNull } from 'nexus'

export const VideoUpdateOneMutation = mutationField('updateOneVideo', {
  type: nonNull('Video'),
  args: {
    data: nonNull('VideoUpdateInput'),
    where: nonNull('VideoWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.video.update({
      where,
      data,
      ...select,
    })
  },
})
