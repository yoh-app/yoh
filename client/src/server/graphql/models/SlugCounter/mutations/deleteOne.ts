import { mutationField, nonNull } from 'nexus'

export const SlugCounterDeleteOneMutation = mutationField(
  'deleteOneSlugCounter',
  {
    type: 'SlugCounter',
    args: {
      where: nonNull('SlugCounterWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.slugCounter.delete({
        where,
        ...select,
      })
    },
  },
)
