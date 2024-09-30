import { queryField, list } from 'nexus'

export const AudioViewFindFirstQuery = queryField('findFirstAudioView', {
  type: 'AudioView',
  args: {
    where: 'AudioViewWhereInput',
    orderBy: list('AudioViewOrderByWithRelationInput'),
    cursor: 'AudioViewWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'AudioViewScalarFieldEnum',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.audioView.findFirst({
      ...args,
      ...select,
    })
  },
})
