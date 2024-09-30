import { mutationField, nonNull } from 'nexus'

export const AttachmentDeleteManyMutation = mutationField(
  'deleteManyAttachment',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'AttachmentWhereInput',
    },
    resolve: async (_parent, { where }, { prisma }) => {
      return prisma.attachment.deleteMany({ where } as any)
    },
  },
)
