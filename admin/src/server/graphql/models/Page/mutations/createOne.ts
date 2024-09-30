import { mutationField, nonNull } from 'nexus'

export const PageCreateOneMutation = mutationField('createOnePage', {
  type: nonNull('Page'),
  args: {
    data: 'PageCreateInput',
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.page.create({
      data,
      ...select,
    })
  },
})
