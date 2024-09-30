import { objectType } from 'nexus'

export const Speaker = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'Speaker',
  definition(t) {
    t.nullable.field('createdAt', { type: 'DateTime' })
    t.nullable.field('deletedAt', { type: 'DateTime' })
    t.nullable.boolean('deleted')
    t.nullable.field('updatedAt', { type: 'DateTime' })
    t.nullable.string('agendaId')
    t.nullable.string('description')
    t.nullable.string('eventId')
    t.string('id')
    t.nullable.json('imageObj')
    t.nullable.string('name')
    t.nullable.field('agenda', {
      type: 'Agenda',
      resolve(root: any) {
        return root.agenda
      },
    })
    t.nullable.field('event', {
      type: 'Event',
      resolve(root: any) {
        return root.event
      },
    })
  },
})
