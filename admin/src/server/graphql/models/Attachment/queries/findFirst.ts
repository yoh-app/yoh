import { queryField, list } from 'nexus'

export const AttachmentFindFirstQuery = queryField('findFirstAttachment', {
  type: 'Attachment',
  args: {
    where: 'AttachmentWhereInput',
    orderBy: list('AttachmentOrderByWithRelationInput'),
    cursor: 'AttachmentWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'AttachmentScalarFieldEnum',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.attachment.findFirst({
      ...args,
      ...select,
    })
  },
})
