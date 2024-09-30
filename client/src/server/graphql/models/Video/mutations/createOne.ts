import { mutationField, nonNull } from 'nexus'

export const VideoCreateOneMutation = mutationField('createOneVideo', {
  type: nonNull('Video'),
  args: {
    data: 'VideoCreateInput',
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.video.create({
      data,
      ...select,
    })
  },
})
