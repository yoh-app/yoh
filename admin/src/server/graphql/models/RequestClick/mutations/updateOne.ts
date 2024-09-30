import { mutationField, nonNull } from 'nexus'

export const RequestClickUpdateOneMutation = mutationField(
  'updateOneRequestClick',
  {
    type: nonNull('RequestClick'),
    args: {
      data: nonNull('RequestClickUpdateInput'),
      where: nonNull('RequestClickWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.requestClick.update({
        where,
        data,
        ...select,
      })
    },
  },
)
