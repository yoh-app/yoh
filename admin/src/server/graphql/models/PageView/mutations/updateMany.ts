import { mutationField, nonNull } from 'nexus'

export const PageViewUpdateManyMutation = mutationField('updateManyPageView', {
  type: nonNull('BatchPayload'),
  args: {
    data: nonNull('PageViewUpdateManyMutationInput'),
    where: 'PageViewWhereInput',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.pageView.updateMany(args as any)
  },
})
