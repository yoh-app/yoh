import { mutationField, nonNull } from 'nexus'

export const RequestDeleteOneMutation = mutationField('deleteOneRequest', {
  type: 'Request',
  args: {
    where: nonNull('RequestWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.request.delete({
      where,
      ...select,
    })
  },
})
