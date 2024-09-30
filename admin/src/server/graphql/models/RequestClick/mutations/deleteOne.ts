import { mutationField, nonNull } from 'nexus'

export const RequestClickDeleteOneMutation = mutationField(
  'deleteOneRequestClick',
  {
    type: 'RequestClick',
    args: {
      where: nonNull('RequestClickWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.requestClick.delete({
        where,
        ...select,
      })
    },
  },
)
