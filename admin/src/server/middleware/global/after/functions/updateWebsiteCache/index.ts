const removeWebsiteCache = {
  mutateResult: false,
  run: async (root, args, context, info) => {
    try {
      if (
        context?.permission?.Website &&
        (context?.params?.action === 'updateOne' || context?.params?.action === 'createOne' || context?.params?.action === 'deleteOne')
      ) {
        const website = await context?.prisma?.website?.findUnique({
          where: {
            id: context?.permission?.Website
          },
        })
        if (process.env.NODE_ENV === 'production') {
          // fetch(`https://${website.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/api/revalidate`).catch((err) => console.log(err))
          fetch(`https://${website.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/api/revalidate`)

        } else {
          fetch(`http://www.yoh.local:3003/api/revalidate`)

          // fetch(`http://www.yoh.local:3003/api/revalidate`).catch((err) => console.log(err))
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