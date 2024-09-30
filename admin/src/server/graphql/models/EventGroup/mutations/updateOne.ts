import { mutationField, nonNull } from 'nexus'

export const EventGroupUpdateOneMutation = mutationField(
  'updateOneEventGroup',
  {
    type: nonNull('EventGroup'),
    args: {
      data: nonNull('EventGroupUpdateInput'),
      where: nonNull('EventGroupWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.eventGroup.update({
        where,
        data,
        ...select,
      })
    },
  },
)
