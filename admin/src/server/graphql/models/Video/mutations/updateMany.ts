import { mutationField, nonNull } from 'nexus'

export const VideoUpdateManyMutation = mutationField('updateManyVideo', {
  type: nonNull('BatchPayload'),
  args: {
    data: nonNull('VideoUpdateManyMutationInput'),
    where: 'VideoWhereInput',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.video.updateMany(args as any)
  },
})
