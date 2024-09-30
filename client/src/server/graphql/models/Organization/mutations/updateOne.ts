import { mutationField, nonNull } from 'nexus'

export const OrganizationUpdateOneMutation = mutationField(
  'updateOneOrganization',
  {
    type: nonNull('Organization'),
    args: {
      data: nonNull('OrganizationUpdateInput'),
      where: nonNull('OrganizationWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.organization.update({
        where,
        data,
        ...select,
      })
    },
  },
)
