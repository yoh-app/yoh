import { mutationField, nonNull } from 'nexus'

export const EventGroupDeleteOneMutation = mutationField(
  'deleteOneEventGroup',
  {
    type: 'EventGroup',
    args: {
      where: nonNull('EventGroupWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.eventGroup.delete({
        where,
        ...select,
      })
    },
  },
)
