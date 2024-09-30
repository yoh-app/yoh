import { mutationField, nonNull } from 'nexus'

export const AudioCollectionCreateOneMutation = mutationField(
  'createOneAudioCollection',
  {
    type: nonNull('AudioCollection'),
    args: {
      data: 'AudioCollectionCreateInput',
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.audioCollection.create({
        data,
        ...select,
      })
    },
  },
)
