import { mutationField, nonNull } from 'nexus'

export const EventGroupCreateOneMutation = mutationField(
  'createOneEventGroup',
  {
    type: nonNull('EventGroup'),
    args: {
      data: 'EventGroupCreateInput',
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.eventGroup.create({
        data,
        ...select,
      })
    },
  },
)
