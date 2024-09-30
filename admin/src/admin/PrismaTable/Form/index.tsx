import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';

import Spinner from '../../components/Spinner';
import { Inputs } from './Inputs';
import useActions from './useActions';
import { TableContext } from '../Context';
import { SchemaModel } from '../../types';
import { buttonClasses, classNames } from '../../components/css';
import { getDate } from './getDate';

export interface FormProps {
  action: 'update' | 'create' | 'view';
  model: string;
  data: any;
  onCancel: () => void;
  onSave: () => void;
}

const getDefaultValues = (
  action: FormProps['action'],
  model: SchemaModel,
  data: any,
  models: SchemaModel[]
) => {
  const defaultValues: any = {};
  if (model.name === 'Organization') {
    // defaultValues.host = window.location.host
  }
  // if (model.name === 'Product') {
  //   if (window.location.pathname.toLowerCase().includes('item')) {
  //     defaultValues.productType = 'item'
  //   } else if (window.location.pathname.toLowerCase().includes('booking')) {
  //     defaultValues.productType = 'booking'
  //   } else if (window.location.pathname.toLowerCase().includes('nft')) {
  //     defaultValues.productType = 'nft'
  //   } else {
  //     defaultValues.productType = 'nft'
  //   }
  // } else if (model.name === 'Website') {
  //   if (window.location.origin.includes('pounds')) {
  //     defaultValues.app = 'pounds'
  //   } else if (window.location.origin.includes('nakama')) {
  //     defaultValues.app = 'nakama'
  //   } else if (window.location.origin.includes('dlbs')) {
  //     defaultValues.app = 'dlbs'
  //   } else if (window.location.origin.includes('yoh')) {
  //     defaultValues.app = 'yoh'
  //   } else {
  //     defaultValues.app = 'yoh'
  //   }
  // }
  model.fields
    .filter(
      (field) =>
        (((field.update || field.read) && action !== 'create') ||
          (action === 'create' && field.create)) &&
        !(field.list && field.kind === 'object') &&
        !field.relationField
    )
    .slice()
    .sort((a, b) => a.order - b.order)
    .forEach((field) => {
      if (!data[field.name]) {
        defaultValues[field.name] = data[field.name];
      } else {
        const valueHandler = () => {
          if (field.type === 'DateTime') {
            return getDate(new Date(data[field.name]));
          } else if (field.type === 'Json') {
            return JSON.stringify(data[field.name]);
          } else if (field.list) {
            return data[field.name].join(',');
          } else if (field.kind === 'object') {
            const fieldModel = models.find((item) => item.id === field.type)!;
            return data[field.name][fieldModel?.idField];
          } else {
            return data[field.name];
          }
        };

        defaultValues[field.name] = valueHandler();
      }
    });
  return defaultValues;
};

const Form: React.FC<FormProps> = ({ action, model: modelName, data, onCancel, onSave }) => {
  const {
    schema: { models },
    formInputs,
    lang,
    pagesPath,
  } = useContext(TableContext);
  const model = models.find((item) => item.id === modelName)!;
  const { onSubmit, loading } = useActions(model, data, action, onSave);

  const { register, handleSubmit, setValue, getValues, watch, formState } = useForm({
    defaultValues: getDefaultValues(action, model, data, models),
  });

  const { errors, isDirty } = formState;

  const InputComponents = formInputs
    ? {
      ...Inputs,
      ...formInputs,
    }
    : Inputs;

  return (
    <div
      className="flex flex-col bg-white rounded shadow-lg text-gray-800 text-base mb-5"
      style={action === 'create' ? { maxWidth: '800px', maxHeight: '100vh' } : {}}
    >
      <header className="py-4 px-5 rounded-t border-b border-gray-100 font-bold text-2xl">
        {lang[action] + ' ' + model.name}
      </header>
      <form onSubmit={handleSubmit(onSubmit)} style={{ overflow: 'auto' }}>
        <div className="relative py-4 px-5 flex-auto overflow-auto" style={{ overflow: 'visible' }}>
          {loading && <Spinner />}
          <div className="flex flex-wrap w-full">
            {model.fields
              .filter(
                (field) =>
                  ((action !== 'view' && field[action]) ||
                    (['update', 'view'].includes(action) && (field.read || field.update))) &&
                  !(field.list && field.kind === 'object') &&
                  !field.relationField
              )
              .slice()
              .sort((a, b) => a.order - b.order)
              .map((field) => {
                const options = {
                  pagesPath,
                  key: field.id,
                  data,
                  field: field,
                  value: data[field.name],
                  error: errors[field.name],
                  register,
                  setValue,
                  getValues,
                  watch,
                  disabled: (action === 'update' && !field.update) || action === 'view',
                };
                if (field.list) {
                  return <InputComponents.Default {...options} />;
                }
                if (field.kind === 'enum') return <InputComponents.Enum {...options} />;
                if (field.kind === 'object')
                  return (
                    <InputComponents.Object
                      {...options}
                      value={data[field.name] ? data[field.name] : {}}
                    />
                  );
                if (field.editor) return <InputComponents.Editor {...options} />;
                if (field.upload) return <InputComponents.Upload {...options} />;
                switch (field.type) {
                  case 'Boolean':
                    return <InputComponents.Boolean {...options} />;
                  case 'DateTime':
                    return <InputComponents.Date {...options} />;
                  default:
                    return <InputComponents.Default {...options} />;
                }
              })}
          </div>
        </div>
        <div className="flex justify-end py-4 px-5 rounded-b border-t border-gray-100">
          <button
            className={classNames(
              buttonClasses,
              'rounded-md py-2 px-4 bg-transparent text-red-600 hover:bg-red-100 hover:bg-opacity-25'
            )}
            type="button"
            onClick={onCancel}
          >
            {action !== 'view' ? lang.cancel : lang.close}
          </button>
          {action !== 'view' && (
            <button
              className={classNames(
                buttonClasses,
                'rounded-md py-2 px-4 bg-green-500 text-white active:bg-green-600 shadow hover:bg-green-800'
              )}
              type="submit"
              disabled={Object.keys(errors).length !== 0 || !isDirty}
            >
              {lang.save}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
export default Form;
