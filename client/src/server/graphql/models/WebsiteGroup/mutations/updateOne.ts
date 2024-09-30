import { mutationField, nonNull } from 'nexus'

export const WebsiteGroupUpdateOneMutation = mutationField(
  'updateOneWebsiteGroup',
  {
    type: nonNull('WebsiteGroup'),
    args: {
      data: nonNull('WebsiteGroupUpdateInput'),
      where: nonNull('WebsiteGroupWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.websiteGroup.update({
        where,
        data,
        ...select,
      })
    },
  },
)
