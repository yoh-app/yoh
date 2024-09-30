import { mutationField, nonNull } from 'nexus'

export const PageDeleteManyMutation = mutationField('deleteManyPage', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'PageWhereInput',
  },
  resolve: async (_parent, { where }, { prisma }) => {
    return prisma.page.deleteMany({ where } as any)
  },
})
