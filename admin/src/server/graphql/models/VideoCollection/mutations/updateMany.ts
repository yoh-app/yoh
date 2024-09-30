import { mutationField, nonNull } from 'nexus'

export const VideoCollectionUpdateManyMutation = mutationField(
  'updateManyVideoCollection',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('VideoCollectionUpdateManyMutationInput'),
      where: 'VideoCollectionWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.videoCollection.updateMany(args as any)
    },
  },
)
