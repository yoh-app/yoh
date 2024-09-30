import { mutationField, nonNull } from 'nexus'

export const OrganizationCreateOneMutation = mutationField(
  'createOneOrganization',
  {
    type: nonNull('Organization'),
    args: {
      data: 'OrganizationCreateInput',
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.organization.create({
        data,
        ...select,
      })
    },
  },
)
