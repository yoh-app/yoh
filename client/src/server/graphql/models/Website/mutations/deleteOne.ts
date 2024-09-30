import { mutationField, nonNull } from 'nexus'

export const WebsiteDeleteOneMutation = mutationField('deleteOneWebsite', {
  type: 'Website',
  args: {
    where: nonNull('WebsiteWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.website.delete({
      where,
      ...select,
    })
  },
})
