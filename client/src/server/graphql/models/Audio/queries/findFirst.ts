import { queryField, list } from 'nexus'

export const AudioFindFirstQuery = queryField('findFirstAudio', {
  type: 'Audio',
  args: {
    where: 'AudioWhereInput',
    orderBy: list('AudioOrderByWithRelationInput'),
    cursor: 'AudioWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'AudioScalarFieldEnum',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.audio.findFirst({
      ...args,
      ...select,
    })
  },
})
