import { objectType } from 'nexus'

export const Notification = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'Notification',
  definition(t) {
    t.nullable.field('createdAt', { type: 'DateTime' })
    t.nullable.field('deletedAt', { type: 'DateTime' })
    t.nullable.boolean('deleted')
    t.nullable.field('updatedAt', { type: 'DateTime' })
    t.nullable.string('action')
    t.nullable.string('description')
    t.string('id')
    t.nullable.boolean('isUnRead')
    t.nullable.string('message')
    t.nullable.string('model')
    t.nullable.string('modelId')
    t.nullable.string('title')
    t.nullable.string('url')
    t.nullable.string('userId')
    t.nullable.string('websiteId')
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
