import { mutationField, nonNull } from 'nexus'

export const PageViewUpdateOneMutation = mutationField('updateOnePageView', {
  type: nonNull('PageView'),
  args: {
    data: nonNull('PageViewUpdateInput'),
    where: nonNull('PageViewWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.pageView.update({
      where,
      data,
      ...select,
    })
  },
})
