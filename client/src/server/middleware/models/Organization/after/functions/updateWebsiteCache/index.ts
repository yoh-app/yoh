const removeWebsiteCache = {
  mutateResult: false,
  run: async (root, args, context, info) => {
    console.log(context?.req?.get('host'))

    if (process.env.NODE_ENV === 'production') {
      try {
        const organization = await context?.prisma?.organization?.findUnique({
          where: {
            id: context?.permission?.Organization
          },
        })
        fetch(`https://${organization.slug}.${context?.req?.get('host')}/api/revalidate`).catch((err) => console.log(err))
      } catch (error) {
        return { error };
      }
    }
    return { data: context.params.result };
  },
};

export default removeWebsiteCache;