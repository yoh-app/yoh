import { mutationField, nonNull } from 'nexus'

export const WebsiteDeleteManyMutation = mutationField('deleteManyWebsite', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'WebsiteWhereInput',
  },
  resolve: async (_parent, { where }, { prisma }) => {
    return prisma.website.deleteMany({ where } as any)
  },
})
