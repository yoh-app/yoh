import { mutationField, nonNull } from 'nexus'

export const RequestClickUpdateManyMutation = mutationField(
  'updateManyRequestClick',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('RequestClickUpdateManyMutationInput'),
      where: 'RequestClickWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.requestClick.updateMany(args as any)
    },
  },
)
