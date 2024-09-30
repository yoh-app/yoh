import { queryField, nonNull } from 'nexus'

export const SlugCounterFindUniqueQuery = queryField('findUniqueSlugCounter', {
  type: 'SlugCounter',
  args: {
    where: nonNull('SlugCounterWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.slugCounter.findUnique({
      where,
      ...select,
    })
  },
})
