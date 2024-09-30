import { mutationField, nonNull } from 'nexus'

export const PageViewDeleteOneMutation = mutationField('deleteOnePageView', {
  type: 'PageView',
  args: {
    where: nonNull('PageViewWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.pageView.delete({
      where,
      ...select,
    })
  },
})
