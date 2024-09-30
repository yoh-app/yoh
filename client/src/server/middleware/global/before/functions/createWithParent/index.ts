import dot from 'dot-object'

const createWithParent = {
  mutateArgs: true,
  run: async (root, args, context, info) => {
    try {
      const { getModelObject, capToLowerCase } = context.utils
      // if (!context.permission || context.permission.admin === 'Public') {
      //   throw new Error('Not Authenticated')
      // }
      const modelObject = getModelObject(context)
      // if (!modelObject || (!modelObject.parent && !modelObject.admin)) {
      //   throw new Error(modelObject?.name + ' doesnt have a parent field included')
      // }
      const parentField = modelObject.fields.find((field) => {
        return field.type === modelObject.parent
      })
      const argsWithDefault = { ...args }
      if (parentField) {
        if (!context.permission || context.permission.admin === 'Public') {
          throw new Error('Not Authenticated')
        }
        if (context.permission[modelObject.parent]) {
          dot.str(`data.${parentField.name}.connect.id`, context.permission[modelObject.parent], argsWithDefault)
        }

        // TODO: move this to another function
        // if (args?.data?.name && context.permission[modelObject.parent]) {
        //   const clonedContext = JSON.parse(JSON.stringify({ permission: context.permission, params: context.params }))
        //   const nameExist = await context.prisma[capToLowerCase(modelObject.name)].findFirst({
        //     where: {
        //       name: {
        //         equals: args.data.name,
        //       },
        //       [parentField.name]: {
        //         id: {
        //           equals: context.permission[modelObject.parent],
        //         },
        //       },
        //     },
        //   })
        //   if (nameExist && args.data.name !== 'index') {
        //     throw new Error(`name exist under ${modelObject.parent}, ${args.data.name}`)
        //   }
        // }

        if (!argsWithDefault.data[parentField.name]) {
          throw new Error(`missing parent ${parentField.name}`)
        }
      }

      return { data: argsWithDefault, error: null }
    } catch (error) {
      return { error }
    }
  },
}

export default createWithParent
