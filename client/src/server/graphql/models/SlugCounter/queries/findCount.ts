import { queryField, nonNull, list } from 'nexus'

export const SlugCounterFindCountQuery = queryField(
  'findManySlugCounterCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'SlugCounterWhereInput',
      orderBy: list('SlugCounterOrderByWithRelationInput'),
      cursor: 'SlugCounterWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: 'SlugCounterScalarFieldEnum',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.slugCounter.count(args as any)
    },
  },
)
