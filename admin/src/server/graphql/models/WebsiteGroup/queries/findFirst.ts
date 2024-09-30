import { queryField, list } from 'nexus'

export const WebsiteGroupFindFirstQuery = queryField('findFirstWebsiteGroup', {
  type: 'WebsiteGroup',
  args: {
    where: 'WebsiteGroupWhereInput',
    orderBy: list('WebsiteGroupOrderByWithRelationInput'),
    cursor: 'WebsiteGroupWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'WebsiteGroupScalarFieldEnum',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.websiteGroup.findFirst({
      ...args,
      ...select,
    })
  },
})
