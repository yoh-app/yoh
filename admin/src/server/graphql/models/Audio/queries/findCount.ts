import { queryField, nonNull, list } from 'nexus'

export const AudioFindCountQuery = queryField('findManyAudioCount', {
  type: nonNull('Int'),
  args: {
    where: 'AudioWhereInput',
    orderBy: list('AudioOrderByWithRelationInput'),
    cursor: 'AudioWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'AudioScalarFieldEnum',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.audio.count(args as any)
  },
})
