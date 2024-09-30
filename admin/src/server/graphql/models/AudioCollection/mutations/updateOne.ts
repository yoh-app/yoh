import { mutationField, nonNull } from 'nexus'

export const AudioCollectionUpdateOneMutation = mutationField(
  'updateOneAudioCollection',
  {
    type: nonNull('AudioCollection'),
    args: {
      data: nonNull('AudioCollectionUpdateInput'),
      where: nonNull('AudioCollectionWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.audioCollection.update({
        where,
        data,
        ...select,
      })
    },
  },
)
