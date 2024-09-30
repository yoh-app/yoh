import { mutationField, nonNull } from 'nexus'

export const PageUpdateManyMutation = mutationField('updateManyPage', {
  type: nonNull('BatchPayload'),
  args: {
    data: nonNull('PageUpdateManyMutationInput'),
    where: 'PageWhereInput',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.page.updateMany(args as any)
  },
})
