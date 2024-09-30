const removeWebsiteCache = {
  mutateResult: false,
  run: async (root, args, context, info) => {
    try {
      if (
        context?.permission?.Website
      ) {
        const page = await context?.prisma?.page?.findUnique({
          where: {
            id: context?.params?.result.id
          },
          include: {
            website: true
          }
        })
        if (process.env.NODE_ENV === 'production') {
          fetch(`https://${page.website.slug}.${context?.domain}/api/revalidate/page/${page.id}`).catch((err) => console.log(err))
          // fetch(`https://${page.website.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/api/revalidate/page/${page.id}`).catch((err) => console.log(err))
        } else {
          fetch(`http://www.awkns.local:3003/api/revalidate/page/${page.id}`).catch((err) => console.log(err))
        }
        // await context?.utils?.updateWebsiteCache({
        //   websiteId: context?.permission?.Website,
        //   redisClient: context?.redisClient,
        //   prisma: context?.prisma
        // })
      }
      return { data: context.params.result };
    } catch (error) {
      return { error };
    }
  },
};

export default removeWebsiteCache;