import { mutationField, nonNull } from 'nexus'

export const WebsiteUpdateManyMutation = mutationField('updateManyWebsite', {
  type: nonNull('BatchPayload'),
  args: {
    data: nonNull('WebsiteUpdateManyMutationInput'),
    where: 'WebsiteWhereInput',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.website.updateMany(args as any)
  },
})
