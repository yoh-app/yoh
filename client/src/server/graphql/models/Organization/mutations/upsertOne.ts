import { mutationField, nonNull } from 'nexus'

export const OrganizationUpsertOneMutation = mutationField(
  'upsertOneOrganization',
  {
    type: nonNull('Organization'),
    args: {
      where: nonNull('OrganizationWhereUniqueInput'),
      create: nonNull('OrganizationCreateInput'),
      update: nonNull('OrganizationUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.organization.upsert({
        ...args,
        ...select,
      })
    },
  },
)
