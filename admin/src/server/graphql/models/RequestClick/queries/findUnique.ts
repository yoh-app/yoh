import { queryField, nonNull } from 'nexus'

export const RequestClickFindUniqueQuery = queryField(
  'findUniqueRequestClick',
  {
    type: 'RequestClick',
    args: {
      where: nonNull('RequestClickWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.requestClick.findUnique({
        where,
        ...select,
      })
    },
  },
)
