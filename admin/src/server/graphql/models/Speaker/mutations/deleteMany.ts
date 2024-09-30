import { mutationField, nonNull } from 'nexus'

export const SpeakerDeleteManyMutation = mutationField('deleteManySpeaker', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'SpeakerWhereInput',
  },
  resolve: async (_parent, { where }, { prisma }) => {
    return prisma.speaker.deleteMany({ where } as any)
  },
})
