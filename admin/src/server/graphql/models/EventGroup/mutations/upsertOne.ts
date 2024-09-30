import { mutationField, nonNull } from 'nexus'

export const EventGroupUpsertOneMutation = mutationField(
  'upsertOneEventGroup',
  {
    type: nonNull('EventGroup'),
    args: {
      where: nonNull('EventGroupWhereUniqueInput'),
      create: nonNull('EventGroupCreateInput'),
      update: nonNull('EventGroupUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.eventGroup.upsert({
        ...args,
        ...select,
      })
    },
  },
)
