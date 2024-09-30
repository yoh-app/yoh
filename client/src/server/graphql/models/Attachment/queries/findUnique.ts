import { queryField, nonNull } from 'nexus'

export const AttachmentFindUniqueQuery = queryField('findUniqueAttachment', {
  type: 'Attachment',
  args: {
    where: nonNull('AttachmentWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.attachment.findUnique({
      where,
      ...select,
    })
  },
})
