import { queryField, nonNull, list } from 'nexus'

export const AudioFindManyQuery = queryField('findManyAudio', {
  type: nonNull(list(nonNull('Audio'))),
  args: {
    where: 'AudioWhereInput',
    orderBy: list('AudioOrderByWithRelationInput'),
    cursor: 'AudioWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'AudioScalarFieldEnum',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.audio.findMany({
      ...args,
      ...select,
    })
  },
})
