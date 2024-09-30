import gql from 'graphql-tag';

const fieldFragment = gql`
  fragment Field on Field {
    id
    name
    title
    type
    list
    kind
    read
    required
    isId
    unique
    create
    order
    update
    sort
    filter
    editor
    upload
    relationField
  }
`;

const modelFragment = gql`
  fragment Model on Model {
    id
    name
    create
    delete
    update
    idField
    displayFields
    fields {
      ...Field
    }
  }
  ${fieldFragment}
`;

export const GET_SCHEMA = gql`
  query getSchema {
    getSchema {
      models {
        ...Model
      }
      enums {
        name
        fields
      }
    }
  }
  ${modelFragment}
`;

// export const UPDATE_MODEL = gql`
//   mutation updateModel($id: String!, $data: UpdateModelInput!) {
//     updateModel(id: $id, data: $data) {
//       ...Model
//     }
//   }
//   ${modelFragment}
// `;

// export const UPDATE_FIELD = gql`
//   mutation updateField($id: String!, $modelId: String!, $data: UpdateFieldInput!) {
//     updateField(id: $id, modelId: $modelId, data: $data) {
//       ...Field
//     }
//   }
//   ${fieldFragment}
// `;

export const UPDATE_MODEL = gql`
  mutation updateAdminSettingsModel($modelName: String!, $data: JSON!) {
    updateAdminSettingsModel(modelName: $modelName, data: $data) {
      ...Model
    }
  }
  ${modelFragment}
`;

export const UPDATE_FIELD = gql`
  mutation updateAdminSettingsField($fieldName: String!, $modelName: String!, $data: JSON!) {
    updateAdminSettingsField(fieldName: $fieldName, modelName: $modelName, data: $data) {
      ...Field
    }
  }
  ${fieldFragment}
`;

export const GET_METADATA = gql`
  mutation getMetadata($pageUrl: String) {
    getMetadata(pageUrl: $pageUrl) {
      ...Field
    }
  }
  ${fieldFragment}
`;

export const GET_ANALYTICS= gql`
  mutation getAnalytics($type: String, $begin: Int, $end: Int, $wedsiteId: String, $isRenew: Boolean) {
    getAnalytics(type: $type, begin: $begin, end: $end, wedsiteId: $wedsiteId, isRenew: $isRenew) {
      ...Field
    }
  }
  ${fieldFragment}
`;