import { queryField, nonNull, list } from 'nexus'

export const AudioViewFindManyQuery = queryField('findManyAudioView', {
  type: nonNull(list(nonNull('AudioView'))),
  args: {
    where: 'AudioViewWhereInput',
    orderBy: list('AudioViewOrderByWithRelationInput'),
    cursor: 'AudioViewWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'AudioViewScalarFieldEnum',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.audioView.findMany({
      ...args,
      ...select,
    })
  },
})
