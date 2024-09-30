
const createDefaultDepartment = {
  mutateResult: false,
  run: async (root, args, context, info) => {
    try {
      const { prisma } = context;
      const department = await prisma.department.findUnique({
        where: {
          id: context?.params?.result.id,
        },
        include: {
          organization: true
        }
      });

      const allDepartmentCollection = await prisma.departmentCollection.findFirst({
        where: {
          name: {
            equals: 'All Departments'
          },
          website: {
            id: {
              equals: department?.website?.id
            }
          }
        }
      })

      const updateDepartment = await prisma.department.update({
        where: {
          id: context?.params?.result.id,
        },
        data: {
          // departmentType: 'digital',
          departmentCollections: {
            connect: [{
              id: allDepartmentCollection.id
            }]
          }
        }
      })

      return { data: updateDepartment };
    } catch (error) {
      return { error };
    }
  },
};

export default createDefaultDepartment;
