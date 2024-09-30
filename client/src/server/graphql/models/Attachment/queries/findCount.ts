import { queryField, nonNull, list } from 'nexus'

export const AttachmentFindCountQuery = queryField('findManyAttachmentCount', {
  type: nonNull('Int'),
  args: {
    where: 'AttachmentWhereInput',
    orderBy: list('AttachmentOrderByWithRelationInput'),
    cursor: 'AttachmentWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'AttachmentScalarFieldEnum',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.attachment.count(args as any)
  },
})
