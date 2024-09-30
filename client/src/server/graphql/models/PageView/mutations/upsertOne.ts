import { mutationField, nonNull } from 'nexus'

export const PageViewUpsertOneMutation = mutationField('upsertOnePageView', {
  type: nonNull('PageView'),
  args: {
    where: nonNull('PageViewWhereUniqueInput'),
    create: nonNull('PageViewCreateInput'),
    update: nonNull('PageViewUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.pageView.upsert({
      ...args,
      ...select,
    })
  },
})
