import { mutationField, nonNull } from 'nexus'

export const VideoCollectionCreateOneMutation = mutationField(
  'createOneVideoCollection',
  {
    type: nonNull('VideoCollection'),
    args: {
      data: 'VideoCollectionCreateInput',
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.videoCollection.create({
        data,
        ...select,
      })
    },
  },
)
