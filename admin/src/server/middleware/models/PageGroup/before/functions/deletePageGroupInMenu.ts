
const deletePageGroupInMenu = {
  mutateResult: false,
  run: async (root, args, context, info) => {
    try {
      const { prisma, params } = context;
      const pageGroup = await prisma.pageGroup.findUnique({
        where: {
          id: args?.where?.id,
        },
        include: {
          organization: {
            include: {
              pages: true
            }
          },
        }
      })

      await Promise.all(pageGroup.organization.pages.map(async (page) => {
        let content = page.content
        if (typeof page?.content === 'string') {
          content = JSON.parse(page.content)
        }
        if (content.ROOT.nodes.find((node) => node === page.id)) {
          const index = content?.ROOT?.nodes?.indexOf(page.id);
          if (index > -1) { // only splice array when item is found
            content.ROOT.nodes.splice(index, 1); // 2nd parameter means remove one item only
          }
          delete content?.ROOT?.[page.id]

          await prisma.page.update({
            where: {
              id: page.id
            },
            data: {
              content
            }
          })
        }
      }))

      return { data: args };
    } catch (error) {
      return { error };
    }
  },
};

export default deletePageGroupInMenu;
