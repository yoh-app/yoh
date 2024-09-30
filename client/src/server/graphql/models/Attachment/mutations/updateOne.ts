import { mutationField, nonNull } from 'nexus'

export const AttachmentUpdateOneMutation = mutationField(
  'updateOneAttachment',
  {
    type: nonNull('Attachment'),
    args: {
      data: nonNull('AttachmentUpdateInput'),
      where: nonNull('AttachmentWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.attachment.update({
        where,
        data,
        ...select,
      })
    },
  },
)
