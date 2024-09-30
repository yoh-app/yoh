import { objectType } from 'nexus'

export const Affiliate = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'Affiliate',
  definition(t) {
    t.nullable.field('createdAt', { type: 'DateTime' })
    t.nullable.field('deletedAt', { type: 'DateTime' })
    t.nullable.boolean('deleted')
    t.nullable.field('updatedAt', { type: 'DateTime' })
    t.nullable.boolean('active')
    t.nullable.string('customerId')
    t.nullable.string('description')
    t.string('id')
    t.nullable.string('igId')
    t.nullable.string('lineId')
    t.nullable.string('name')
    t.nullable.string('tgId')
    t.nullable.string('url')
    t.nullable.string('walletAddress')
    t.nullable.string('websiteId')
    t.nullable.field('customer', {
      type: 'Customer',
      resolve(root: any) {
        return root.customer
      },
    })
    t.nullable.field('website', {
      type: 'Website',
      resolve(root: any) {
        return root.website
      },
    })
  },
})
