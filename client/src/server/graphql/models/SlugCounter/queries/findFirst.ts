import { queryField, list } from 'nexus'

export const SlugCounterFindFirstQuery = queryField('findFirstSlugCounter', {
  type: 'SlugCounter',
  args: {
    where: 'SlugCounterWhereInput',
    orderBy: list('SlugCounterOrderByWithRelationInput'),
    cursor: 'SlugCounterWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'SlugCounterScalarFieldEnum',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.slugCounter.findFirst({
      ...args,
      ...select,
    })
  },
})
