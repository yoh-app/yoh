import { queryField, nonNull } from 'nexus'

export const AudioViewFindUniqueQuery = queryField('findUniqueAudioView', {
  type: 'AudioView',
  args: {
    where: nonNull('AudioViewWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.audioView.findUnique({
      where,
      ...select,
    })
  },
})
