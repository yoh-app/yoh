import { objectType } from 'nexus'

export const RequestClick = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'RequestClick',
  definition(t) {
    t.nullable.field('createdAt', { type: 'DateTime' })
    t.nullable.field('deletedAt', { type: 'DateTime' })
    t.nullable.boolean('deleted')
    t.nullable.field('updatedAt', { type: 'DateTime' })
    t.nullable.string('audioId')
    t.string('id')
    t.nullable.string('ip')
    t.nullable.string('pageId')
    t.nullable.string('requestId')
    t.nullable.string('videoId')
    t.nullable.field('audio', {
      type: 'Audio',
      resolve(root: any) {
        return root.audio
      },
    })
    t.nullable.field('page', {
      type: 'Page',
      resolve(root: any) {
        return root.page
      },
    })
    t.nullable.field('request', {
      type: 'Request',
      resolve(root: any) {
        return root.request
      },
    })
    t.nullable.field('video', {
      type: 'Video',
      resolve(root: any) {
        return root.video
      },
    })
  },
})
