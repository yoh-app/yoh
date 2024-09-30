import { mutationField, nonNull } from 'nexus'

export const WebsiteUpdateOneMutation = mutationField('updateOneWebsite', {
  type: nonNull('Website'),
  args: {
    data: nonNull('WebsiteUpdateInput'),
    where: nonNull('WebsiteWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.website.update({
      where,
      data,
      ...select,
    })
  },
})
