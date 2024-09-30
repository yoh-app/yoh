import { Label } from 'admin/PrismaTable/Form/Inputs';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import React, { useContext, useState } from 'react';
import { TableContext } from 'admin/PrismaTable/Context';
import { useFieldArray, Controller } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

const values = ({
  field,
  value,
  error,
  register,
  setValue,
  watch,
  control,
  disabled,
  ui,
  custom,
  t,
}) => {
  const { lang, inputValidation } = useContext(TableContext);

  // This field array will keep all the attribute dropdown fields
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'values',
  });
  return (
    <div className={`w-full ${!custom?.fullWidth && 'sm:w-1/2'} pr-2 pt-2`}>
      <Label t={t} custom={custom} lang={lang} field={field} />
      <div>
        {fields.map((item, index) => {
          // const { ref: valueRef, ...valueInputProps } = register(`values.${index}.value`);
          // const { ref: metaRef, ...metaInputProps } = register(`values.${index}.meta`);

          return (
            <div
              className="border-b border-dashed border-border-200 last:border-0 py-5 md:py-8"
              key={item.id}
            >
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-5">
                <Controller
                  control={control}
                  name={`values.${index}.value`}
                  render={({ field }) => (
                    // Material UI TextField already supports
                    // `value` and `onChange`
                    <TextField
                      fullWidth
                      type="text"
                      className="sm:col-span-2"
                      variant="outlined"
                      {...field}
                      label={t('form:input-label-value')}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name={`values.${index}.meta`}
                  render={({ field }) => (
                    // Material UI TextField already supports
                    // `value` and `onChange`
                    <TextField
                      fullWidth
                      type="text"
                      className="sm:col-span-2"
                      variant="outlined"
                      {...field}
                      label={t('form:input-label-meta')}
                    />
                  )}
                />

                {/* <TextField
                  className="sm:col-span-2"
                  label={t('form:input-label-value')}
                  variant="outlined"
                  defaultValue={item.value} // make sure to set up defaultValue
                  inputRef={valueRef}
                  {...valueInputProps}
                /> */}
                {/* <TextField
                  className="sm:col-span-2"
                  label={t('form:input-label-meta')}
                  variant="outlined"
                  defaultValue={item.meta} // make sure to set up defaultValue
                  inputRef={metaRef}
                  {...metaInputProps}
                /> */}
                <button
                  onClick={() => remove(index)}
                  type="button"
                  className="text-sm text-red-500 hover:text-red-700 transition-colors duration-200 focus:outline-none sm:mt-4 sm:col-span-1"
                >
                  {t('form:button-label-remove')}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <Button
        type="button"
        onClick={() => append({ id: uuidv4(), value: '', meta: '' })}
        className="w-full sm:w-auto"
      >
        {t('form:button-label-add-value')}
      </Button>
    </div>
  );
};

export default values;
