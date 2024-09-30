import { mutationField, nonNull } from 'nexus'

export const VideoCollectionUpsertOneMutation = mutationField(
  'upsertOneVideoCollection',
  {
    type: nonNull('VideoCollection'),
    args: {
      where: nonNull('VideoCollectionWhereUniqueInput'),
      create: nonNull('VideoCollectionCreateInput'),
      update: nonNull('VideoCollectionUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.videoCollection.upsert({
        ...args,
        ...select,
      })
    },
  },
)
