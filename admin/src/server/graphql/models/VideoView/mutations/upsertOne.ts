import { mutationField, nonNull } from 'nexus'

export const VideoViewUpsertOneMutation = mutationField('upsertOneVideoView', {
  type: nonNull('VideoView'),
  args: {
    where: nonNull('VideoViewWhereUniqueInput'),
    create: nonNull('VideoViewCreateInput'),
    update: nonNull('VideoViewUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.videoView.upsert({
      ...args,
      ...select,
    })
  },
})
