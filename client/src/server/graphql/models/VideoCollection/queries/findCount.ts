import { queryField, nonNull, list } from 'nexus'

export const VideoCollectionFindCountQuery = queryField(
  'findManyVideoCollectionCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'VideoCollectionWhereInput',
      orderBy: list('VideoCollectionOrderByWithRelationInput'),
      cursor: 'VideoCollectionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: 'VideoCollectionScalarFieldEnum',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.videoCollection.count(args as any)
    },
  },
)
