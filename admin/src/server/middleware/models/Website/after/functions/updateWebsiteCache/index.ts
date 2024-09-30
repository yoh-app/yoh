const removeWebsiteCache = {
  mutateResult: false,
  run: async (root, args, context, info) => {
    try {
      if (
        context?.permission?.Website
      ) {
        const website = await context?.prisma?.website?.findUnique({
          where: {
            id: context?.permission?.Website
          },
        })

        // context.axios.interceptors.request.use(function (config) {
        //   // Do something before request is sent
        //   return config;
        // }, function (error) {
        //   // Do something with request error
        //   return Promise.reject(error);
        // });
        if (process.env.NODE_ENV === 'production') {
          fetch(`https://${website.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/api/revalidate`).catch((err) => console.log(err))
        } else {
          fetch(`http://www.yoh.local:3003/api/revalidate`).catch((err) => console.log(err))
        }

        // if (process.env.NODE_ENV === 'production') {
        //   context?.axios.get(`https://${website.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/api/revalidate/website/${website.id}`)
        // } else {
        //   context?.axios.get(`http://www.yoh.local:3003/api/revalidate/website/${website.id}`)
        // }
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