import { mutationField, nonNull } from 'nexus'

export const SpeakerUpsertOneMutation = mutationField('upsertOneSpeaker', {
  type: nonNull('Speaker'),
  args: {
    where: nonNull('SpeakerWhereUniqueInput'),
    create: nonNull('SpeakerCreateInput'),
    update: nonNull('SpeakerUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.speaker.upsert({
      ...args,
      ...select,
    })
  },
})
