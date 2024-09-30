import { mutationField, nonNull } from 'nexus'

export const OrganizationDeleteManyMutation = mutationField(
  'deleteManyOrganization',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'OrganizationWhereInput',
    },
    resolve: async (_parent, { where }, { prisma }) => {
      return prisma.organization.deleteMany({ where } as any)
    },
  },
)
