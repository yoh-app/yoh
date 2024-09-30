import { mutationField, nonNull } from 'nexus'

export const SlugCounterUpdateOneMutation = mutationField(
  'updateOneSlugCounter',
  {
    type: nonNull('SlugCounter'),
    args: {
      data: nonNull('SlugCounterUpdateInput'),
      where: nonNull('SlugCounterWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.slugCounter.update({
        where,
        data,
        ...select,
      })
    },
  },
)
