import { mutationField, nonNull } from 'nexus'

export const RequestClickDeleteManyMutation = mutationField(
  'deleteManyRequestClick',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'RequestClickWhereInput',
    },
    resolve: async (_parent, { where }, { prisma }) => {
      return prisma.requestClick.deleteMany({ where } as any)
    },
  },
)
