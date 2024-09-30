import { mutationField, nonNull } from 'nexus'

export const PageDeleteOneMutation = mutationField('deleteOnePage', {
  type: 'Page',
  args: {
    where: nonNull('PageWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.page.delete({
      where,
      ...select,
    })
  },
})
