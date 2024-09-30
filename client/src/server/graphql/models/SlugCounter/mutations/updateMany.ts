import { mutationField, nonNull } from 'nexus'

export const SlugCounterUpdateManyMutation = mutationField(
  'updateManySlugCounter',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('SlugCounterUpdateManyMutationInput'),
      where: 'SlugCounterWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.slugCounter.updateMany(args as any)
    },
  },
)
