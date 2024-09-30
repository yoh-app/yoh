import { mutationField, nonNull } from 'nexus'

export const WebsiteGroupUpsertOneMutation = mutationField(
  'upsertOneWebsiteGroup',
  {
    type: nonNull('WebsiteGroup'),
    args: {
      where: nonNull('WebsiteGroupWhereUniqueInput'),
      create: nonNull('WebsiteGroupCreateInput'),
      update: nonNull('WebsiteGroupUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.websiteGroup.upsert({
        ...args,
        ...select,
      })
    },
  },
)
