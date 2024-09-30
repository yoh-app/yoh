import { queryField, nonNull } from 'nexus'

export const WebsiteGroupFindUniqueQuery = queryField(
  'findUniqueWebsiteGroup',
  {
    type: 'WebsiteGroup',
    args: {
      where: nonNull('WebsiteGroupWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.websiteGroup.findUnique({
        where,
        ...select,
      })
    },
  },
)
