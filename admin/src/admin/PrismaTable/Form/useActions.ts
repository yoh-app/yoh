import { useMutation } from '@apollo/client';
import { useContext } from 'react';

import { TableContext } from '../Context';
import { FormProps } from './index';
import { mutationDocument } from '../QueryDocument';
import { SchemaModel, SchemaField } from '../../types';

interface GetValueOptions {
  value: string;
  field?: SchemaField;
  useSet?: boolean;
}

export const getValueByType = ({ value, field, useSet = true }: GetValueOptions) => {
  if (!field) {
    return value;
  }
  if (field.type === 'Json') {
    if (typeof value === 'string') {
      return value ? JSON.parse(value) : field.list ? [] : {};
    }
    return value;
  }
  if (field.list) {
    if (!value) return [];
    const result: any[] = Array.isArray(value) ? value : value.split(',');
    switch (field.type) {
      case 'Int':
        result.forEach((value1, index) => {
          result[index] = parseInt(value1);
        });
        break;
      case 'Float':
        result.forEach((value1, index) => {
          result[index] = parseFloat(value1);
        });
        break;
      case 'Boolean':
        result.forEach((value1, index) => {
          result[index] = value1 === 'true';
        });
        break;
    }
    return result;
  } else {
    const result = ['BigInt', 'Int'].includes(field.type)
      ? parseInt(value)
      : ['Float', 'Decimal'].includes(field.type)
        ? parseFloat(value)
        : value;
    return !useSet ? result : { set: result };
  }
};

const useActions = (model: SchemaModel, data: any, action: FormProps['action'], onSave: () => void) => {
  const {
    schema: { models },
    valueHandler,
    useSet,
  } = useContext(TableContext);
  const [updateModel, { loading: updateLoading }] = useMutation(mutationDocument(models, model.id, 'update'));
  const [createModel, { loading: createLoading }] = useMutation(mutationDocument(models, model.id, 'create'));
  const getField = (name: string) => {
    return model.fields.find((item) => item.name === name);
  };

  const onUpdateHandler = (newData: any) => {
    const updateData: any = {};

    Object.keys(newData).forEach((key) => {
      const field = getField(key);
      if (field?.update) {
        if (field.kind === 'object') {
          if (field.list) {
            updateData[key] = undefined;
          } else {
            const fieldModel = models.find((item) => item.id === field.type)!;
            if ((newData[key] && !data[key]) || (newData[key] && newData[key] !== data[key][fieldModel.idField])) {
              const editField = fieldModel.fields.find((item) => item.name === fieldModel.idField)!;
              updateData[key] = {
                connect: {
                  [fieldModel.idField]: getValueByType({
                    value: newData[key],
                    field: editField,
                    useSet: false,
                  }),
                },
              };
            } else if (!newData[key] && data?.[key]) {
              updateData[key] = { disconnect: true };
            }
          }
        } else if (newData[key] !== data?.[key]) {
          updateData[key] = valueHandler
            ? valueHandler(newData[key], field)
            : getValueByType({ value: newData[key], field, useSet });
        }
      }
    });
    if (Object.keys(updateData).length > 0) {
      updateModel({
        variables: {
          where: {
            [model.idField]: data?.[model.idField],
          },
          data: updateData,
        },
      }).then((data) => {
        onSave({ ...data[`updateOne${model.name}`], ...updateData });
      });
    }
  };

  const onCreateHandler = (newData: any) => {
    const createData: any = {};
    Object.keys(newData).forEach((key) => {
      const field = getField(key);
      if (field?.kind === 'object') {
        const fieldModel = models.find((item) => item.id === field.type)!;
        const editField = fieldModel.fields.find((item) => item.name === fieldModel.idField)!;
        if (newData[key]) {
          if (field.list) {
            createData[key] = {
              connect: {
                [fieldModel.idField]: getValueByType({
                  value: newData[key][model.idField],
                  field: editField,
                  useSet: false,
                }),
              },
            };
          } else {
            createData[key] = {
              connect: {
                [fieldModel.idField]: getValueByType({
                  value: newData[key],
                  field: editField,
                  useSet: false,
                }),
              },
            };
          }
        }
      } else {
        createData[key] = valueHandler
          ? valueHandler(newData[key], field, true)
          : getValueByType({
            value: newData[key],
            field,
            useSet: false,
          });
      }
    });
    createModel({
      variables: {
        data: createData,
      },
    }).then((data) => {
      onSave({ ...data?.data?.[`createOne${model.name}`], ...createData });
    });
  };

  const onSubmit = (newData: any) => {
    action === 'create' ? onCreateHandler(newData) : onUpdateHandler(newData);
  };

  return {
    onSubmit,
    loading: updateLoading || createLoading,
  };
};

export default useActions;
