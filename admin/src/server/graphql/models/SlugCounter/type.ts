import { objectType } from 'nexus'

export const SlugCounter = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'SlugCounter',
  definition(t) {
    t.nullable.int('counter')
    t.nullable.field('createdAt', { type: 'DateTime' })
    t.nullable.boolean('deleted')
    t.nullable.field('deletedAt', { type: 'DateTime' })
    t.string('id')
    t.nullable.string('model')
    t.nullable.string('slug')
    t.nullable.string('title')
    t.nullable.field('updatedAt', { type: 'DateTime' })
  },
})
