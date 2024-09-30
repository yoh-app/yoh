import { queryField, nonNull, list } from 'nexus'

export const SlugCounterFindManyQuery = queryField('findManySlugCounter', {
  type: nonNull(list(nonNull('SlugCounter'))),
  args: {
    where: 'SlugCounterWhereInput',
    orderBy: list('SlugCounterOrderByWithRelationInput'),
    cursor: 'SlugCounterWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'SlugCounterScalarFieldEnum',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.slugCounter.findMany({
      ...args,
      ...select,
    })
  },
})
