import { queryField, list } from 'nexus'

export const SlugCounterAggregateQuery = queryField('aggregateSlugCounter', {
  type: 'AggregateSlugCounter',
  args: {
    where: 'SlugCounterWhereInput',
    orderBy: list('SlugCounterOrderByWithRelationInput'),
    cursor: 'SlugCounterWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.slugCounter.aggregate({ ...args, ...select }) as any
  },
})
