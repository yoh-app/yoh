import { mutationField, nonNull } from 'nexus'

export const VideoCollectionDeleteManyMutation = mutationField(
  'deleteManyVideoCollection',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'VideoCollectionWhereInput',
    },
    resolve: async (_parent, { where }, { prisma }) => {
      return prisma.videoCollection.deleteMany({ where } as any)
    },
  },
)
