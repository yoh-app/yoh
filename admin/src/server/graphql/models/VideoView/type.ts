import { objectType } from 'nexus'

export const VideoView = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'VideoView',
  definition(t) {
    t.nullable.field('createdAt', { type: 'DateTime' })
    t.nullable.field('deletedAt', { type: 'DateTime' })
    t.nullable.boolean('deleted')
    t.nullable.field('updatedAt', { type: 'DateTime' })
    t.string('id')
    t.nullable.string('ip')
    t.nullable.string('videoId')
    t.nullable.field('video', {
      type: 'Video',
      resolve(root: any) {
        return root.video
      },
    })
  },
})
