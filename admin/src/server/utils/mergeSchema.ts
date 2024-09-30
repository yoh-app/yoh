import { SchemaObject, Model, Field, Schema, SchemaModel, SchemaField } from '@paljs/types'
import { existsSync, readFileSync } from 'fs'

export function parseSchema(path: string): Schema {
  return existsSync(path)
    ? JSON.parse(readFileSync(path, { encoding: 'utf-8' }))
    : {
      models: [],
      enums: [],
    }
}

export function mergeSchema(object: SchemaObject, schemaPath: string): Schema {
  const schema = parseSchema(schemaPath)
  const newSchema: Schema = {
    models: [],
    enums: object.enums,
  }
  object.models.forEach((item) => {
    const schemaItem = schema.models.find((model) => model.id === item.name)
    if (!schemaItem) {
      newSchema.models.push(handleNewModel(item))
    } else {
      const newItem: SchemaModel = {
        ...schemaItem,
        fields: [],
      }
      item.fields.forEach((field) => {
        const schemaField = schemaItem.fields.find((item) => item.name === field.name)
        if (!schemaField) {
          newItem.fields.push(handleNewField(field, schemaItem.name))
        } else {
          const newFields = {}
          newItem.fields.push({
            ...newFields,
            ...schemaField,
            ...getOriginalField(field, schemaItem.id),
          })
        }
      })
      newItem.fields.sort((a, b) => a.order - b.order)
      newSchema.models.push(newItem)
    }
  })
  return newSchema
}

function checkIdFieldExist(model: Model) {
  return !!model.fields.find((field) => field.isId)
}

function defaultDisplayFields(model: Model) {
  const displayFields = []
  const nameField = model.fields.find((field) => field?.name === 'name')
  const titleField = model.fields.find((field) => field?.name === 'title')
  const trackingNumberField = model.fields.find((field) => field?.name === 'tracking_number')
  const idField = model.fields.find((field) => field?.name === 'id')
  // const descriptionField = model.fields.find((field) => field?.name === 'description')

  if (nameField) {
    displayFields.push(nameField?.name)
  } else if (titleField) {
    displayFields.push(titleField?.name)
  } else if (trackingNumberField) {
    displayFields.push(trackingNumberField?.name)
  } else if (idField) {
    displayFields.push(idField?.name)
  }
  return displayFields
}

function handleNewModel(model: Model) {
  const newItem: SchemaModel = {
    id: model.name,
    title: getTitle(model.name),
    name: model.name,
    idField: model.fields.find((field) => field.isId)?.name ?? '',
    displayFields: defaultDisplayFields(model),
    create: true,
    update: checkIdFieldExist(model),
    delete: checkIdFieldExist(model),
    fields: [],
  }
  model.fields.forEach((field) => {
    newItem.fields.push(handleNewField(field, model.name))
  })
  return newItem
}

const defaultField = ['id', 'createdAt', 'updatedAt']

function handleNewField(field: Field, modelName: string): SchemaField {
  return {
    ...getOriginalField(field, modelName),
    title: getTitle(field.name),
    create: !defaultField.includes(field.name) && !field.relationField && field.name !== 'id',
    update: !defaultField.includes(field.name) && !field.relationField,
    editor: false,
    upload: false,
    read: true,
    filter: true,
    sort: true,
    order: -1,
  }
}

function getTitle(id: string) {
  const split = id.split(/(?=[A-Z])/)
  split[0] = split[0].charAt(0).toUpperCase() + split[0].slice(1)
  return split.join(' ')
}

function getOriginalField(
  field: Field,
  modelName: string,
): Omit<Field, 'relation' | 'documentation' | 'map'> & { id: string } {
  delete field.relation
  delete field.documentation
  return {
    id: modelName + '.' + field.name,
    ...field,
  }
}
