const generateSlug = {
  mutateArgs: true,
  run: async (root, args, context, info) => {
    try {
      const { getModelObject } = context.utils

      let argsWithDefault = args
      let slug
      const modelObject = getModelObject(context)
      const slugFieldExist = modelObject.fields.find((field) => field.name === 'slug')
      let title = args?.data?.title || args?.data?.name || null

      if (args?.data?.slug) {
        const slugExist = await context.prisma.slugCounter.findFirst({
          where: {
            slug: {
              equals: args?.data?.slug
            }
          }
        })
        if (slugExist) {
          throw new Error(modelObject.name + ' Slug Exists')
        }
      }

      if (!args?.data?.slug && slugFieldExist && title && context?.permission?.admin) {
        title = title?.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase()

        if (!title.match(/[a-zA-Z0-9 ]/g)) {
          title = `new-${modelObject?.name}`
        }
        let lastCount = await context.prisma.slugCounter.count({
          where: {
            title: {
              equals: title,
            },
            model: {
              equals: modelObject.name
            },
          },
        })
        if (!lastCount || lastCount === 0) {
          lastCount = 0
          slug = title.toLowerCase().trim().split(/\s+/g).join('-')
          argsWithDefault = {
            ...argsWithDefault,
            data: {
              ...argsWithDefault.data,
              slug,
            },
          }
          const newCounter = await context.prisma.slugCounter.create({
            data: {
              title,
              counter: lastCount,
              slug,
              model: modelObject.name,
            },
          })
        } else {
          slug = title.toLowerCase().trim().split(/\s+/g).join('-') + '-' + lastCount + `${Math.floor(Math.random() * 10000)}`
          argsWithDefault = {
            ...argsWithDefault,
            data: {
              ...argsWithDefault.data,
              slug,
            },
          }
          const newCounter = await context.prisma.slugCounter.create({
            data: {
              title,
              counter: lastCount,
              slug,
              model: modelObject.name,
            },
          })
        }
      }
      return { data: argsWithDefault }
    } catch (error) {
      return { error }
    }
  },
}

export default generateSlug
