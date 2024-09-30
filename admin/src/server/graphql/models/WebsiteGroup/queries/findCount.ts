import { queryField, nonNull, list } from 'nexus'

export const WebsiteGroupFindCountQuery = queryField(
  'findManyWebsiteGroupCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'WebsiteGroupWhereInput',
      orderBy: list('WebsiteGroupOrderByWithRelationInput'),
      cursor: 'WebsiteGroupWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: 'WebsiteGroupScalarFieldEnum',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.websiteGroup.count(args as any)
    },
  },
)
