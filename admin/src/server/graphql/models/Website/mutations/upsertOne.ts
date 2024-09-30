import { mutationField, nonNull } from 'nexus'

export const WebsiteUpsertOneMutation = mutationField('upsertOneWebsite', {
  type: nonNull('Website'),
  args: {
    where: nonNull('WebsiteWhereUniqueInput'),
    create: nonNull('WebsiteCreateInput'),
    update: nonNull('WebsiteUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.website.upsert({
      ...args,
      ...select,
    })
  },
})
