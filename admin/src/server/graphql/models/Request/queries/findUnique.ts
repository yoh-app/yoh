import { queryField, nonNull } from 'nexus'

export const RequestFindUniqueQuery = queryField('findUniqueRequest', {
  type: 'Request',
  args: {
    where: nonNull('RequestWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.request.findUnique({
      where,
      ...select,
    })
  },
})
