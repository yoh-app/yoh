import { mutationField, nonNull } from 'nexus'

export const PageCollectionDeleteManyMutation = mutationField(
  'deleteManyPageCollection',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'PageCollectionWhereInput',
    },
    resolve: async (_parent, { where }, { prisma }) => {
      return prisma.pageCollection.deleteMany({ where } as any)
    },
  },
)
