import { objectType } from 'nexus'

export const AudioView = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'AudioView',
  definition(t) {
    t.nullable.field('createdAt', { type: 'DateTime' })
    t.nullable.field('deletedAt', { type: 'DateTime' })
    t.nullable.boolean('deleted')
    t.nullable.field('updatedAt', { type: 'DateTime' })
    t.nullable.string('audioId')
    t.string('id')
    t.nullable.string('ip')
    t.nullable.field('audio', {
      type: 'Audio',
      resolve(root: any) {
        return root.audio
      },
    })
  },
})
