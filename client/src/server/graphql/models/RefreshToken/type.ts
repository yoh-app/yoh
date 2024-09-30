import { objectType } from 'nexus'

export const RefreshToken = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'RefreshToken',
  definition(t) {
    t.nullable.field('createdAt', { type: 'DateTime' })
    t.nullable.field('deletedAt', { type: 'DateTime' })
    t.nullable.boolean('deleted')
    t.nullable.field('updatedAt', { type: 'DateTime' })
    t.nullable.field('expires', { type: 'DateTime' })
    t.nullable.string('geo')
    t.nullable.string('ip')
    t.nullable.field('lastActive', { type: 'DateTime' })
    t.string('loginTokenId')
    t.nullable.string('userAgent')
    t.nullable.string('userAgentRaw')
    t.nullable.string('userId')
    t.nullable.string('value')
    t.nullable.field('user', {
      type: 'User',
      resolve(root: any) {
        return root.user
      },
    })
  },
})
