import { queryField, list } from 'nexus'

export const AttachmentAggregateQuery = queryField('aggregateAttachment', {
  type: 'AggregateAttachment',
  args: {
    where: 'AttachmentWhereInput',
    orderBy: list('AttachmentOrderByWithRelationInput'),
    cursor: 'AttachmentWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.attachment.aggregate({ ...args, ...select }) as any
  },
})
