import { mutationField, nonNull } from 'nexus'

export const PageCollectionCreateOneMutation = mutationField(
  'createOnePageCollection',
  {
    type: nonNull('PageCollection'),
    args: {
      data: 'PageCollectionCreateInput',
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.pageCollection.create({
        data,
        ...select,
      })
    },
  },
)
