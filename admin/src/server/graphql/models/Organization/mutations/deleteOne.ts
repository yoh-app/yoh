import { mutationField, nonNull } from 'nexus'

export const OrganizationDeleteOneMutation = mutationField(
  'deleteOneOrganization',
  {
    type: 'Organization',
    args: {
      where: nonNull('OrganizationWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.organization.delete({
        where,
        ...select,
      })
    },
  },
)
