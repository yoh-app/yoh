const createDefaultContent = {
  mutateResult: false,
  run: async (root, args, context, info) => {
    try {
      const { getModelObject, capToLowerCase } = context.utils
      const modelObject = getModelObject(context)
      if ((!args?.data?.content || Object.keys(args?.data?.content)?.length === 0) && modelObject.fields.find((field) => field.name === 'content')) {
        const createDefaultContent = await context.prisma[capToLowerCase(modelObject.name)].update({
          where: {
            id: context.params.result.id,
          },
          data: {
            content: {
              ROOT: {
                type: { resolvedName: 'Root' },
                isCanvas: true,
                hidden: false,
                displayName: 'Root',
                nodes: [],
                props: {},
              },
            },
          },
        })
        return { data: createDefaultContent }
      }
      return { data: context.params.result }

    } catch (error) {
      return { error }
    }
  },
}

export default createDefaultContent
