import { mutationField, nonNull } from 'nexus'

export const RequestClickUpsertOneMutation = mutationField(
  'upsertOneRequestClick',
  {
    type: nonNull('RequestClick'),
    args: {
      where: nonNull('RequestClickWhereUniqueInput'),
      create: nonNull('RequestClickCreateInput'),
      update: nonNull('RequestClickUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.requestClick.upsert({
        ...args,
        ...select,
      })
    },
  },
)
