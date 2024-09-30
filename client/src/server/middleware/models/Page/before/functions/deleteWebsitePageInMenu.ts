
const deleteWebsitePageOrder = {
  mutateResult: false,
  run: async (root, args, context, info) => {
    try {
      const { prisma, params } = context;
      const page = await prisma.page.findUnique({
        where: {
          id: args?.where?.id,
        },
        include: {
          website: true,
        }
      })
      console.log('this is the indicator', page.website.menu)
      const updateWebsite = await prisma.website.update({
        where: {
          id: page.website.id
        },
        data: {
          menu: {
            ...page?.website?.menu,
            columns: page?.website?.menu?.columns?.map((column) => {
              const cardIds = column?.cardIds?.filter((pageId) => pageId !== page.id) ?? []
              return {
                ...column,
                cardIds
              }
            }),
            cards: page?.website?.menu?.cards?.filter((card) => card.id !== page.id) ?? []
          }
        }
      })

      return { data: args };
    } catch (error) {
      return { error };
    }
  },
};

export default deleteWebsitePageOrder;
