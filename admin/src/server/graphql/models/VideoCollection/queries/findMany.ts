import { queryField, nonNull, list } from 'nexus'

export const VideoCollectionFindManyQuery = queryField(
  'findManyVideoCollection',
  {
    type: nonNull(list(nonNull('VideoCollection'))),
    args: {
      where: 'VideoCollectionWhereInput',
      orderBy: list('VideoCollectionOrderByWithRelationInput'),
      cursor: 'VideoCollectionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: 'VideoCollectionScalarFieldEnum',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.videoCollection.findMany({
        ...args,
        ...select,
      })
    },
  },
)
