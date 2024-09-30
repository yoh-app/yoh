import { mutationField, nonNull } from 'nexus'

export const VideoUpsertOneMutation = mutationField('upsertOneVideo', {
  type: nonNull('Video'),
  args: {
    where: nonNull('VideoWhereUniqueInput'),
    create: nonNull('VideoCreateInput'),
    update: nonNull('VideoUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.video.upsert({
      ...args,
      ...select,
    })
  },
})
