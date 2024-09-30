import { mutationField, nonNull } from 'nexus'

export const PageCollectionUpdateManyMutation = mutationField(
  'updateManyPageCollection',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('PageCollectionUpdateManyMutationInput'),
      where: 'PageCollectionWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.pageCollection.updateMany(args as any)
    },
  },
)
