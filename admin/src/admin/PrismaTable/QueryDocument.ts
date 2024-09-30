import { SchemaModel } from '../types';
import tag from 'graphql-tag';

const getFields = (
  models: SchemaModel[],
  modelName: string,
  update = false,
) => {
  const model = models.find((item) => item.id === modelName);
  if (!model) {
    return 'id';
  }
  let fieldsString = `${model.idField} `;
  model?.fields.forEach((field) => {
    if (
      (field.read && field.name !== model.idField) ||
      (update && field.update)
    ) {
      if (field.kind !== 'object') {
        fieldsString += `${field.name} `;
      } else if (!(field.list && !update)) {
        const fieldModel = models.find((item) => item.id === field.type);
        if (fieldModel) {
          fieldsString += `${field.name} {`;
          if (fieldModel.idField) {
            fieldsString += `${fieldModel.idField} `;
          } else {
            fieldModel.fields
              .filter((item) => item.kind === 'scalar')
              .forEach((field) => {
                fieldsString += `${field.name} `;
              });
          }
          if (!field.list) {
            fieldModel.displayFields.forEach((item) => {
              const splitItems = item.split('.');
              for (let i = 0; i < splitItems.length; i++) {
                if (i + 1 < splitItems.length) {
                  fieldsString += `${splitItems[i]} { `;
                } else if (
                  !(
                    splitItems.length === 1 &&
                    splitItems[i] === fieldModel.idField
                  )
                ) {
                  fieldsString += `${splitItems[i]} `;
                }
              }
              for (let i = 1; i < splitItems.length; i++) {
                fieldsString += `} `;
              }
            });
          }
          fieldsString += '} ';
        }
      }
    }
  });

  return fieldsString;
};

const allScalar = (model?: SchemaModel) => {
  return model?.fields
    .filter((item) => item.kind === 'scalar')
    .map((item) => item.name)
    .join(' ');
};
export const queryDocument = (
  models: SchemaModel[],
  modelName: string,
  findUnique = false,
  update = false,
) => {
  const fields = getFields(models, modelName, update);
  if (findUnique) {
    return tag`
query findUnique${modelName}($where: ${modelName}WhereUniqueInput!) {
  findUnique${modelName}(where: $where) {
    ${fields}
  }
}
`;
  } else {
    return tag`
query findMany${modelName}(
  $where: ${modelName}WhereInput
  $orderBy: [${modelName}OrderByWithRelationInput!]
  $cursor: ${modelName}WhereUniqueInput
  $skip: Int
  $take: Int
) {
  findMany${modelName}(where: $where, orderBy: $orderBy, cursor: $cursor, skip: $skip, take: $take) {
    ${fields}
  }
  findMany${modelName}Count(where: $where)
}
`;
  }
};

export const mutationDocument = (
  models: SchemaModel[],
  model: string,
  mutation: 'create' | 'update' | 'delete' | 'deleteMany',
) => {
  const fields = getFields(models, model, true);
  const modelObject = models.find((item) => item.id === model);
  switch (mutation) {
    case 'create':
      return tag`mutation createOne${model}($data: ${model}CreateInput!) {
  createOne${model}(data: $data) {
    ${allScalar(modelObject) || modelObject?.idField}
  }
}`;
    case 'delete':
      return tag`mutation deleteOne${model} ($where: ${model}WhereUniqueInput!) {
  deleteOne${model} (where: $where) {
    ${allScalar(modelObject) || modelObject?.idField}
  }
}`;
    case 'deleteMany':
      return tag`mutation deleteMany${model} ($where: ${model}WhereInput!) {
  deleteMany${model} (where: $where) {
    count
  }
}`;
    case 'update':
      return tag`mutation updateOne${model} ($where: ${model}WhereUniqueInput!, $data: ${model}UpdateInput!) {
  updateOne${model} (where: $where, data: $data) {
    ${fields}
  }
}`;
  }
};
