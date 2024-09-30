import { mutationField, nonNull } from 'nexus'

export const AudioUpsertOneMutation = mutationField('upsertOneAudio', {
  type: nonNull('Audio'),
  args: {
    where: nonNull('AudioWhereUniqueInput'),
    create: nonNull('AudioCreateInput'),
    update: nonNull('AudioUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.audio.upsert({
      ...args,
      ...select,
    })
  },
})
