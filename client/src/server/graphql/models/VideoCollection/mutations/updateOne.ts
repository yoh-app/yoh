import { mutationField, nonNull } from 'nexus'

export const VideoCollectionUpdateOneMutation = mutationField(
  'updateOneVideoCollection',
  {
    type: nonNull('VideoCollection'),
    args: {
      data: nonNull('VideoCollectionUpdateInput'),
      where: nonNull('VideoCollectionWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.videoCollection.update({
        where,
        data,
        ...select,
      })
    },
  },
)
