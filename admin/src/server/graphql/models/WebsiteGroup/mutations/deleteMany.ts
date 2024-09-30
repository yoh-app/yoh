import { mutationField, nonNull } from 'nexus'

export const WebsiteGroupDeleteManyMutation = mutationField(
  'deleteManyWebsiteGroup',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'WebsiteGroupWhereInput',
    },
    resolve: async (_parent, { where }, { prisma }) => {
      return prisma.websiteGroup.deleteMany({ where } as any)
    },
  },
)
