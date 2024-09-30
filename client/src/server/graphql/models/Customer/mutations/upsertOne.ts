import { mutationField, nonNull } from 'nexus'

export const CustomerUpsertOneMutation = mutationField('upsertOneCustomer', {
  type: nonNull('Customer'),
  args: {
    where: nonNull('CustomerWhereUniqueInput'),
    create: nonNull('CustomerCreateInput'),
    update: nonNull('CustomerUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.customer.upsert({
      ...args,
      ...select,
    })
  },
})
