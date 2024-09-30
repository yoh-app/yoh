import dot from 'dot-object'

const recursiveFindMany = {
  mutateArgs: true,
  run: async (root, args, context, info) => {
    try {
      const { getModelObject } = context.utils

      if (args?.where?.active) {
        return { data: args }
      }
      if (!context.permission || context.permission.admin === 'Public') {
        throw new Error('Not Authenticated')
      }
      const { prisma } = context
      const modelObject = getModelObject(context)

      if (!modelObject?.parent && modelObject?.name !== 'User') {
        throw new Error(modelObject.name + ' doesnt have a parent field or admin field included')
      }

      // if (modelObject.admin) {
      //   if (context.permission[modelObject.parent]) {
      //     const id = context.permission[modelObject.parent]
      //     const argsWithDefault = {
      //       ...args,
      //       where: {
      //         ...args.where,
      //         id: { equals: id },
      //       },
      //     }
      //     return { data: argsWithDefault }
      //   } else {
      //     throw new Error(`${context.permission.admin} not exist in token..`)
      //   }
      // }
      if (modelObject.parent) {
        const parentField = modelObject.fields.find((field) => {
          return field.type === modelObject.parent
        })
        if (context.permission[modelObject.parent]) {
          const argsWithDefault = {
            ...args,
            where: {
              ...args.where,
              [`${parentField.name}`]: { id: { equals: context.permission[parentField.type] } },
            },
          }
          return { data: argsWithDefault }
        } else if (args?.where && args?.where[parentField.name]) {
          if (modelObject.isParentAdmin) {
            if (!context.permission[parentField.type]) {
              throw new Error(`need parent id in permission ${parentField.type}`)
            } else if (context.permission[parentField.type] !== args?.where[parentField.name]) {
              throw new Error('  parent id in permission not match requesting one')
            }
          }
          return { data: args }
        } else {
          const clonedContext = JSON.parse(JSON.stringify({ permission: context.permission, params: context.params }))
          clonedContext.utils = context.utils
          const parentPath = recursiveParentPath(clonedContext)
          const argsWithDefault = {
            ...args,
            where: {
              ...args.where,
              ...parentPath,
            },
          }
          return { data: argsWithDefault }
        }
      }
      return { data: args }
    } catch (error) {
      return { error }
    }
  },
}

export const recursiveParentPath = (context) => {
  const modelObject = context.utils.getModelObject(context)
  const path = context.params.path ? context.params.path : ''

  if (context.permission[modelObject.name]) {
    const objectPath = path + '.id.equals'
    const pathObject = {}
    dot.str(objectPath, context.permission[modelObject.name], pathObject)

    return pathObject
  }

  if (modelObject.parent) {
    const parentField = modelObject.fields.find((field) => {
      return field.type === modelObject.parent
    })

    const newPath = path.length === 0 ? parentField?.name : path + '.' + parentField?.name
    context.params.model = modelObject.parent
    context.params.path = newPath
    return recursiveParentPath(context)
  }
}

export default recursiveFindMany
