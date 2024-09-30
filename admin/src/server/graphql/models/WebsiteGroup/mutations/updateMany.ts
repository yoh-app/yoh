import { mutationField, nonNull } from 'nexus'

export const WebsiteGroupUpdateManyMutation = mutationField(
  'updateManyWebsiteGroup',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('WebsiteGroupUpdateManyMutationInput'),
      where: 'WebsiteGroupWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.websiteGroup.updateMany(args as any)
    },
  },
)
