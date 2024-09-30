import { mutationField, nonNull } from 'nexus'

export const SlugCounterCreateOneMutation = mutationField(
  'createOneSlugCounter',
  {
    type: nonNull('SlugCounter'),
    args: {
      data: 'SlugCounterCreateInput',
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.slugCounter.create({
        data,
        ...select,
      })
    },
  },
)
