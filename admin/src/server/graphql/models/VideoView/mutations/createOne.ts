import { mutationField, nonNull } from 'nexus'

export const VideoViewCreateOneMutation = mutationField('createOneVideoView', {
  type: nonNull('VideoView'),
  args: {
    data: 'VideoViewCreateInput',
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.videoView.create({
      data,
      ...select,
    })
  },
})
