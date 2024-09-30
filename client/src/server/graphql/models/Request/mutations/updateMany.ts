import { mutationField, nonNull } from 'nexus'

export const RequestUpdateManyMutation = mutationField('updateManyRequest', {
  type: nonNull('BatchPayload'),
  args: {
    data: nonNull('RequestUpdateManyMutationInput'),
    where: 'RequestWhereInput',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.request.updateMany(args as any)
  },
})
