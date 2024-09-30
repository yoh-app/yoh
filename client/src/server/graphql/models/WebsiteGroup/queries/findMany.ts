import { queryField, nonNull, list } from 'nexus'

export const WebsiteGroupFindManyQuery = queryField('findManyWebsiteGroup', {
  type: nonNull(list(nonNull('WebsiteGroup'))),
  args: {
    where: 'WebsiteGroupWhereInput',
    orderBy: list('WebsiteGroupOrderByWithRelationInput'),
    cursor: 'WebsiteGroupWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'WebsiteGroupScalarFieldEnum',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.websiteGroup.findMany({
      ...args,
      ...select,
    })
  },
})
