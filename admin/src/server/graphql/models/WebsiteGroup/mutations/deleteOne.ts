import { mutationField, nonNull } from 'nexus'

export const WebsiteGroupDeleteOneMutation = mutationField(
  'deleteOneWebsiteGroup',
  {
    type: 'WebsiteGroup',
    args: {
      where: nonNull('WebsiteGroupWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.websiteGroup.delete({
        where,
        ...select,
      })
    },
  },
)
