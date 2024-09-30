import { mutationField, nonNull } from 'nexus'

export const PageViewDeleteManyMutation = mutationField('deleteManyPageView', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'PageViewWhereInput',
  },
  resolve: async (_parent, { where }, { prisma }) => {
    return prisma.pageView.deleteMany({ where } as any)
  },
})
