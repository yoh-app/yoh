import { useContext } from 'react';
import { TableContext } from './Context';
import dynamic from 'next/dynamic'

export const useModel = (name: string) => {
  const {
    schema: { models },
  } = useContext(TableContext);
  const modelUI = require(`ui/${name}`).default;

  // const modelUI = require(`pages/admin/Organization/Organization/${name}`)
  const model = { ...models.find((item) => item.id === name), ui: modelUI?.[`${name}UI`] }
  return model;
};

export const useEnum = (name: string, modelName: string) => {
  const {
    schema: { enums },
  } = useContext(TableContext);
  let ui = null
  if (modelName) {
    const modelUI = require(`ui/${modelName}`).default;

    // const modelUI = require(`pages/admin/Organization/Organization/${modelName}`)?.[`${modelName}UI`]
    modelUI?.forms?.forEach(form => {
      form?.formFields?.forEach((formField) => {
        if (formField.type === name) {
          ui = formField
        }
      })
    });
  }
  const enumObj = {
    ...enums.find((item) => item.name === name),
    ui
  }
  return enumObj;
};