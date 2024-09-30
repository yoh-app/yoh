import { queryField, nonNull } from 'nexus'

export const VideoCollectionFindUniqueQuery = queryField(
  'findUniqueVideoCollection',
  {
    type: 'VideoCollection',
    args: {
      where: nonNull('VideoCollectionWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.videoCollection.findUnique({
        where,
        ...select,
      })
    },
  },
)
