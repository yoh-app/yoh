
const getModelAndAction = (fieldName, returnType) => {
  const actions = [
    'findUnique',
    'findMany',
    'createOne',
    'updateOne',
    'updateMany',
    'upsertOne',
    'deleteOne',
    'deleteMany',
  ]
  for (let index = 0; index < actions.length; index++) {
    const action = actions[index]
    if (fieldName.startsWith(action)) {
      const model = fieldName.replace(action, '').replace('Count', '')
      return {
        model,
        action,
      }
    }
  }
  return { model: null, action: null }
}

export const beforeHooks = async (resolve, root, args, context, info) => {
  try {
    const { model, action } = getModelAndAction(info.fieldName, info.returnType)

    let result

    let argsWithDefault = {
      ...args,
    }
    if (model && action) {
      context.params = {
        model,
        action,
      }
    }

    const globalBeforeFunctions = context?.middlewares[`global/before/hooks/${action}.ts`]
    if (globalBeforeFunctions) {
      await globalBeforeFunctions.reduce(async (previous, func) => {
        try {
          await previous
          const { data, error } = await func.run(root, argsWithDefault, context, info)
          if (error) {
            console.log(`global/before/hooks/${action}.ts`)
            throw new Error(error)
          } else {
            if (func.mutateArgs) {
              argsWithDefault = data
            }
          }
        } catch (err) {
          console.log(err)
          throw new Error(err)
        }
      }, Promise.resolve())
    }

    const beforeFunctions = context?.middlewares[`models/${model}/before/hooks/${action}.ts`]

    if (beforeFunctions) {
      await beforeFunctions.reduce(async (previous, func) => {
        try {
          await previous
          const { data, error } = await func.run(root, argsWithDefault, context, info)
          if (error) {
            console.log(`models/${model}/before/hooks/${action}.ts`)
            throw new Error(error)
          } else {
            if (func.mutateArgs) {
              argsWithDefault = data
            }
          }
        } catch (err) {
          console.log(err)
          throw new Error(err)
        }
      }, Promise.resolve())
    }

    result = await resolve(root, argsWithDefault, context, info)
    return result
  } catch (error) {
    console.log(error)
    // fs.appendFileSync('errorLog.txt', JSON.stringify({ ...context.params, error }, null, 2));
    throw new Error(error)
  }
}

export const afterHooks = async (resolve, root, args, context, info) => {
  try {
    const { model, action } = getModelAndAction(info.fieldName, info.returnType)

    let result = await resolve(root, args, context, info)
    const argsWithDefault = {
      ...args,
    }
    context.params = {
      model,
      action,
      result,
    }

    const globalAfterFunctions = context?.middlewares[`global/after/hooks/${action}.ts`]
    if (globalAfterFunctions) {
      await globalAfterFunctions.reduce(async (previous, func) => {
        try {
          await previous
          const { data, error } = await func.run(root, argsWithDefault, context, info)
          if (error) {
            console.log(`global/after/hooks/${action}.ts`)
            throw new Error(error)
          } else {
            if (func.mutateResult) {
              result = data
            }
          }
        } catch (err) {
          console.log(err)
          throw new Error(err)
        }
      }, Promise.resolve())
    }

    const afterFunctions = context?.middlewares[`models/${model}/after/hooks/${action}.ts`]
    if (afterFunctions) {
      await afterFunctions.reduce(async (previous, func) => {
        try {
          await previous
          const { data, error } = await func.run(root, argsWithDefault, context, info)
          if (error) {
            console.log(`models/${model}/after/hooks/${action}.ts`)
            throw new Error(error)
          } else {
            if (func.mutateResult) {
              result = data
            }
          }
        } catch (err) {
          console.log(err)
          throw new Error(err)
        }
      }, Promise.resolve())
    }

    return result
  } catch (error) {
    console.log(error)
    // fs.appendFileSync('errorLog.txt', JSON.stringify({ ...context.params, error }, null, 2))
    throw new Error(error)
  }
}
