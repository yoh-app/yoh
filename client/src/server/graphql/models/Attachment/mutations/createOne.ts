import { mutationField, nonNull } from 'nexus'

export const AttachmentCreateOneMutation = mutationField(
  'createOneAttachment',
  {
    type: nonNull('Attachment'),
    args: {
      data: 'AttachmentCreateInput',
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.attachment.create({
        data,
        ...select,
      })
    },
  },
)
