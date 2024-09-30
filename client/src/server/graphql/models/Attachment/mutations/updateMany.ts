import { mutationField, nonNull } from 'nexus'

export const AttachmentUpdateManyMutation = mutationField(
  'updateManyAttachment',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('AttachmentUpdateManyMutationInput'),
      where: 'AttachmentWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.attachment.updateMany(args as any)
    },
  },
)
