import { mutationField, nonNull } from 'nexus'

export const RequestCreateOneMutation = mutationField('createOneRequest', {
  type: nonNull('Request'),
  args: {
    data: 'RequestCreateInput',
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.request.create({
      data,
      ...select,
    })
  },
})
