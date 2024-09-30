import { objectType } from 'nexus'

export const OrderedProduct = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'OrderedProduct',
  definition(t) {
    t.nullable.field('createdAt', { type: 'DateTime' })
    t.nullable.field('deletedAt', { type: 'DateTime' })
    t.nullable.boolean('deleted')
    t.nullable.field('updatedAt', { type: 'DateTime' })
    t.nullable.string('description')
    t.nullable.string('eventId')
    t.string('id')
    t.nullable.json('imageObj')
    t.nullable.boolean('minted')
    t.nullable.string('name')
    t.nullable.string('orderId')
    t.nullable.float('price')
    t.nullable.string('productId')
    t.nullable.string('productSlug')
    t.nullable.field('productType', { type: 'ProductType' })
    t.nullable.string('productUrl')
    t.nullable.int('quantity')
    t.nullable.int('redeemedQuantity')
    t.nullable.string('slug')
    t.nullable.string('tokenId')
    t.nullable.float('total')
    t.nullable.string('transactionHash')
    t.nullable.string('variationId')
    t.nullable.string('variationName')
    t.nullable.json('variationOption')
    t.nullable.string('walletAddress')
    t.nullable.field('event', {
      type: 'Event',
      resolve(root: any) {
        return root.event
      },
    })
    t.nullable.field('order', {
      type: 'Order',
      resolve(root: any) {
        return root.order
      },
    })
    t.nullable.field('product', {
      type: 'Product',
      resolve(root: any) {
        return root.product
      },
    })
  },
})
