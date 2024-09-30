
const setupPage = {
  mutateResult: false,
  run: async (root, args, context, info) => {
    try {
      const { prisma, params } = context;
      const page = await context?.prisma?.page?.findUnique({
        where: {
          id: context?.params?.result.id
        },
        include: {
          website: true
        }
      })
      const allPageCollection = await prisma.pageCollection.findFirst({
        where: {
          name: {
            equals: 'All Pages'
          },
          website: {
            id: {
              equals: page?.website?.id
            }
          }
        }
      })

      const updatePage = await prisma.page.update({
        where: {
          id: params?.result?.id,
        },
        data: {
          pageCollections: {
            connect: [{
              id: allPageCollection.id
            }]
          }
        },
        include: {
          website: true,
        }
      })
      const websitePages = await prisma.page.findMany({
        where: {
          website: {
            id: page.website.id
          }
        }
      })

      const existIndexPage = websitePages.find((page) => page.isIndex)

      if (!existIndexPage) {
        const updatePage = await prisma.page.update({
          where: {
            id: params.result.id
          },
          data: {
            isIndex: true
          }
        })
        // return { data: updatePage };
      }

      return { data: params.result };
    } catch (error) {
      return { error };
    }
  },
};

export default setupPage;
