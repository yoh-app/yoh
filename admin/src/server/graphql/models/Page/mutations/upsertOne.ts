import { mutationField, nonNull } from 'nexus'

export const PageUpsertOneMutation = mutationField('upsertOnePage', {
  type: nonNull('Page'),
  args: {
    where: nonNull('PageWhereUniqueInput'),
    create: nonNull('PageCreateInput'),
    update: nonNull('PageUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.page.upsert({
      ...args,
      ...select,
    })
  },
})
