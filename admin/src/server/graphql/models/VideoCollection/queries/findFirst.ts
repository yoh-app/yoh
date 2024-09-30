import { queryField, list } from 'nexus'

export const VideoCollectionFindFirstQuery = queryField(
  'findFirstVideoCollection',
  {
    type: 'VideoCollection',
    args: {
      where: 'VideoCollectionWhereInput',
      orderBy: list('VideoCollectionOrderByWithRelationInput'),
      cursor: 'VideoCollectionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: 'VideoCollectionScalarFieldEnum',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.videoCollection.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
