import { mutationField, nonNull } from 'nexus'

export const RequestUpsertOneMutation = mutationField('upsertOneRequest', {
  type: nonNull('Request'),
  args: {
    where: nonNull('RequestWhereUniqueInput'),
    create: nonNull('RequestCreateInput'),
    update: nonNull('RequestUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.request.upsert({
      ...args,
      ...select,
    })
  },
})
