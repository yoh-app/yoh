import { queryField, nonNull } from 'nexus'

export const AudioFindUniqueQuery = queryField('findUniqueAudio', {
  type: 'Audio',
  args: {
    where: nonNull('AudioWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.audio.findUnique({
      where,
      ...select,
    })
  },
})
