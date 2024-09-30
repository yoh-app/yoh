import { objectType } from 'nexus'

export const PageView = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'PageView',
  definition(t) {
    t.nullable.field('createdAt', { type: 'DateTime' })
    t.nullable.field('deletedAt', { type: 'DateTime' })
    t.nullable.boolean('deleted')
    t.nullable.field('updatedAt', { type: 'DateTime' })
    t.string('id')
    t.nullable.string('ip')
    t.nullable.string('pageId')
    t.nullable.field('page', {
      type: 'Page',
      resolve(root: any) {
        return root.page
      },
    })
  },
})
