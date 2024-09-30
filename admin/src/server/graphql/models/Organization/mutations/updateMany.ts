import { mutationField, nonNull } from 'nexus'

export const OrganizationUpdateManyMutation = mutationField(
  'updateManyOrganization',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('OrganizationUpdateManyMutationInput'),
      where: 'OrganizationWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.organization.updateMany(args as any)
    },
  },
)
