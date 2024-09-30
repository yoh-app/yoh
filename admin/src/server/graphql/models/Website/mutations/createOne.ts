import { mutationField, nonNull } from 'nexus'

export const WebsiteCreateOneMutation = mutationField('createOneWebsite', {
  type: nonNull('Website'),
  args: {
    data: 'WebsiteCreateInput',
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.website.create({
      data,
      ...select,
    })
  },
})
