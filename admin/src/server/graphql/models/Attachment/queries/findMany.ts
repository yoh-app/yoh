import { queryField, nonNull, list } from 'nexus'

export const AttachmentFindManyQuery = queryField('findManyAttachment', {
  type: nonNull(list(nonNull('Attachment'))),
  args: {
    where: 'AttachmentWhereInput',
    orderBy: list('AttachmentOrderByWithRelationInput'),
    cursor: 'AttachmentWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'AttachmentScalarFieldEnum',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.attachment.findMany({
      ...args,
      ...select,
    })
  },
})
