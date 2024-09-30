import { mutationField, nonNull } from 'nexus'

export const AttachmentUpsertOneMutation = mutationField(
  'upsertOneAttachment',
  {
    type: nonNull('Attachment'),
    args: {
      where: nonNull('AttachmentWhereUniqueInput'),
      create: nonNull('AttachmentCreateInput'),
      update: nonNull('AttachmentUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.attachment.upsert({
        ...args,
        ...select,
      })
    },
  },
)
