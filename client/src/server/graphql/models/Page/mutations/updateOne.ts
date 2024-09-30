import { mutationField, nonNull } from 'nexus'

export const PageUpdateOneMutation = mutationField('updateOnePage', {
  type: nonNull('Page'),
  args: {
    data: nonNull('PageUpdateInput'),
    where: nonNull('PageWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.page.update({
      where,
      data,
      ...select,
    })
  },
})
