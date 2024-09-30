import { mutationField, nonNull } from 'nexus'

export const PageCollectionUpsertOneMutation = mutationField(
  'upsertOnePageCollection',
  {
    type: nonNull('PageCollection'),
    args: {
      where: nonNull('PageCollectionWhereUniqueInput'),
      create: nonNull('PageCollectionCreateInput'),
      update: nonNull('PageCollectionUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.pageCollection.upsert({
        ...args,
        ...select,
      })
    },
  },
)
