import { mutationField, nonNull } from 'nexus'

export const PageViewCreateOneMutation = mutationField('createOnePageView', {
  type: nonNull('PageView'),
  args: {
    data: 'PageViewCreateInput',
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.pageView.create({
      data,
      ...select,
    })
  },
})
