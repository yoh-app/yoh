import { objectType } from 'nexus'

export const Attachment = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'Attachment',
  definition(t) {
    t.nullable.field('createdAt', { type: 'DateTime' })
    t.nullable.field('deletedAt', { type: 'DateTime' })
    t.nullable.boolean('deleted')
    t.nullable.field('updatedAt', { type: 'DateTime' })
    t.nullable.json('attachmentObj')
    t.nullable.field('attachmentType', { type: 'AttachmentType' })
    t.nullable.string('description')
    t.nullable.string('eventId')
    t.string('id')
    t.nullable.json('imageObj')
    t.nullable.string('name')
    t.nullable.json('previewObj')
    t.nullable.string('productId')
    t.nullable.json('upload')
    t.nullable.string('url')
    t.nullable.string('userId')
    t.nullable.string('websiteId')
    t.nullable.field('event', {
      type: 'Event',
      resolve(root: any) {
        return root.event
      },
    })
    t.nullable.field('product', {
      type: 'Product',
      resolve(root: any) {
        return root.product
      },
    })
    t.nullable.field('user', {
      type: 'User',
      resolve(root: any) {
        return root.user
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
