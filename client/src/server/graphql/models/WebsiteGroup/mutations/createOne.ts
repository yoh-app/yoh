import { mutationField, nonNull } from 'nexus'

export const WebsiteGroupCreateOneMutation = mutationField(
  'createOneWebsiteGroup',
  {
    type: nonNull('WebsiteGroup'),
    args: {
      data: 'WebsiteGroupCreateInput',
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.websiteGroup.create({
        data,
        ...select,
      })
    },
  },
)
