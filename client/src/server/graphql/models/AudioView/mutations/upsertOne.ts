import { mutationField, nonNull } from 'nexus'

export const AudioViewUpsertOneMutation = mutationField('upsertOneAudioView', {
  type: nonNull('AudioView'),
  args: {
    where: nonNull('AudioViewWhereUniqueInput'),
    create: nonNull('AudioViewCreateInput'),
    update: nonNull('AudioViewUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.audioView.upsert({
      ...args,
      ...select,
    })
  },
})
