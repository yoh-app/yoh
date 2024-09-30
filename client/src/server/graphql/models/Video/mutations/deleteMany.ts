import { mutationField, nonNull } from 'nexus'

export const VideoDeleteManyMutation = mutationField('deleteManyVideo', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'VideoWhereInput',
  },
  resolve: async (_parent, { where }, { prisma }) => {
    return prisma.video.deleteMany({ where } as any)
  },
})
