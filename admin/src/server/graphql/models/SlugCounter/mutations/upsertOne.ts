import { mutationField, nonNull } from 'nexus'

export const SlugCounterUpsertOneMutation = mutationField(
  'upsertOneSlugCounter',
  {
    type: nonNull('SlugCounter'),
    args: {
      where: nonNull('SlugCounterWhereUniqueInput'),
      create: nonNull('SlugCounterCreateInput'),
      update: nonNull('SlugCounterUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.slugCounter.upsert({
        ...args,
        ...select,
      })
    },
  },
)
