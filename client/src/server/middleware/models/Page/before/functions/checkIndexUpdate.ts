
const createDefaultPage = {
  mutateResult: false,
  run: async (root, args, context, info) => {
    try {
      const { prisma, params } = context;
      if (args?.data?.isIndex) {
        const page = await prisma.page.findUnique({
          where: {
            id: args?.where?.id
          },
          include: {
            website: true,
          }
        })
        const updatePages = await prisma.page.updateMany({
          where: {
            website: {
              id: page.website.id
            }
          },
          data: {
            isIndex: false,
          }
        })
      }

      return { data: args };
    } catch (error) {
      return { error };
    }
  },
};

export default createDefaultPage;
