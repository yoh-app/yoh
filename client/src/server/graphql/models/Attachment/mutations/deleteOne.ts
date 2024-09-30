import { mutationField, nonNull } from 'nexus'

export const AttachmentDeleteOneMutation = mutationField(
  'deleteOneAttachment',
  {
    type: 'Attachment',
    args: {
      where: nonNull('AttachmentWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.attachment.delete({
        where,
        ...select,
      })
    },
  },
)
