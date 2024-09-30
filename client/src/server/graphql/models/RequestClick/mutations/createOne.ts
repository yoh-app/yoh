import { mutationField, nonNull } from 'nexus'

export const RequestClickCreateOneMutation = mutationField(
  'createOneRequestClick',
  {
    type: nonNull('RequestClick'),
    args: {
      data: 'RequestClickCreateInput',
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.requestClick.create({
        data,
        ...select,
      })
    },
  },
)
