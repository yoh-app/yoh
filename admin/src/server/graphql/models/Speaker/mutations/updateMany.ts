import { mutationField, nonNull } from 'nexus'

export const SpeakerUpdateManyMutation = mutationField('updateManySpeaker', {
  type: nonNull('BatchPayload'),
  args: {
    data: nonNull('SpeakerUpdateManyMutationInput'),
    where: 'SpeakerWhereInput',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.speaker.updateMany(args as any)
  },
})
