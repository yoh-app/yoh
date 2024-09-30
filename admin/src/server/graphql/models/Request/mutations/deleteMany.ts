import { mutationField, nonNull } from 'nexus'

export const RequestDeleteManyMutation = mutationField('deleteManyRequest', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'RequestWhereInput',
  },
  resolve: async (_parent, { where }, { prisma }) => {
    return prisma.request.deleteMany({ where } as any)
  },
})
