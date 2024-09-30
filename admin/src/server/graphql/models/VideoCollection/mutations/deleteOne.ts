import { mutationField, nonNull } from 'nexus'

export const VideoCollectionDeleteOneMutation = mutationField(
  'deleteOneVideoCollection',
  {
    type: 'VideoCollection',
    args: {
      where: nonNull('VideoCollectionWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.videoCollection.delete({
        where,
        ...select,
      })
    },
  },
)
