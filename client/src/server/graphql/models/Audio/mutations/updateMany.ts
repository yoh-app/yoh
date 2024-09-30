import { mutationField, nonNull } from 'nexus'

export const AudioUpdateManyMutation = mutationField('updateManyAudio', {
  type: nonNull('BatchPayload'),
  args: {
    data: nonNull('AudioUpdateManyMutationInput'),
    where: 'AudioWhereInput',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.audio.updateMany(args as any)
  },
})
