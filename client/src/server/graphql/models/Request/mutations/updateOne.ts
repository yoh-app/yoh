import { mutationField, nonNull } from 'nexus'

export const RequestUpdateOneMutation = mutationField('updateOneRequest', {
  type: nonNull('Request'),
  args: {
    data: nonNull('RequestUpdateInput'),
    where: nonNull('RequestWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.request.update({
      where,
      data,
      ...select,
    })
  },
})
