import { mutationField, nonNull } from 'nexus'

export const AudioCollectionUpsertOneMutation = mutationField(
  'upsertOneAudioCollection',
  {
    type: nonNull('AudioCollection'),
    args: {
      where: nonNull('AudioCollectionWhereUniqueInput'),
      create: nonNull('AudioCollectionCreateInput'),
      update: nonNull('AudioCollectionUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.audioCollection.upsert({
        ...args,
        ...select,
      })
    },
  },
)
