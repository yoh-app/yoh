import { mutationField, nonNull } from 'nexus'

export const AudioDeleteManyMutation = mutationField('deleteManyAudio', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'AudioWhereInput',
  },
  resolve: async (_parent, { where }, { prisma }) => {
    return prisma.audio.deleteMany({ where } as any)
  },
})
