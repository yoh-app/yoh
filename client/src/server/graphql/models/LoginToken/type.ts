import { objectType } from 'nexus'

export const LoginToken = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'LoginToken',
  definition(t) {
    t.nullable.field('createdAt', { type: 'DateTime' })
    t.nullable.field('deletedAt', { type: 'DateTime' })
    t.nullable.boolean('deleted')
    t.nullable.field('updatedAt', { type: 'DateTime' })
    t.nullable.boolean('approved')
    t.nullable.string('domain')
    t.nullable.string('email')
    t.nullable.field('expires', { type: 'DateTime' })
    t.nullable.string('geo')
    t.string('id')
    t.nullable.string('ip')
    t.nullable.string('secret')
    t.nullable.string('userAgent')
    t.nullable.string('userAgentRaw')
    t.nullable.string('userId')
    t.nullable.field('user', {
      type: 'User',
      resolve(root: any) {
        return root.user
      },
    })
  },
})
