import { objectType } from 'nexus'

export const Agenda = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'Agenda',
  definition(t) {
    t.nullable.field('createdAt', { type: 'DateTime' })
    t.nullable.field('deletedAt', { type: 'DateTime' })
    t.nullable.boolean('deleted')
    t.nullable.field('updatedAt', { type: 'DateTime' })
    t.nullable.string('description')
    t.nullable.field('endTime', { type: 'DateTime' })
    t.nullable.string('eventId')
    t.string('id')
    t.nullable.json('imageObj')
    t.nullable.string('name')
    t.nullable.field('startTime', { type: 'DateTime' })
    t.nullable.field('event', {
      type: 'Event',
      resolve(root: any) {
        return root.event
      },
    })
    t.list.field('speakers', {
      type: 'Speaker',
      args: {
        where: 'SpeakerWhereInput',
        orderBy: 'SpeakerOrderByWithRelationInput',
        cursor: 'SpeakerWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'SpeakerScalarFieldEnum',
      },
      resolve(root: any) {
        return root.speakers
      },
    })
    t.field('_count', {
      type: 'AgendaCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
