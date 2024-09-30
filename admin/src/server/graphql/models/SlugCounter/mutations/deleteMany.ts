import { mutationField, nonNull } from 'nexus'

export const SlugCounterDeleteManyMutation = mutationField(
  'deleteManySlugCounter',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'SlugCounterWhereInput',
    },
    resolve: async (_parent, { where }, { prisma }) => {
      return prisma.slugCounter.deleteMany({ where } as any)
    },
  },
)
