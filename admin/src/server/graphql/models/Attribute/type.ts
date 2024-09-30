import { objectType } from 'nexus'

export const Attribute = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'Attribute',
  definition(t) {
    t.nullable.field('createdAt', { type: 'DateTime' })
    t.nullable.field('deletedAt', { type: 'DateTime' })
    t.nullable.boolean('deleted')
    t.nullable.field('updatedAt', { type: 'DateTime' })
    t.string('id')
    t.nullable.string('name')
    t.nullable.string('slug')
    t.nullable.json('values')
    t.nullable.string('websiteId')
    t.nullable.field('website', {
      type: 'Website',
      resolve(root: any) {
        return root.website
      },
    })
  },
})
