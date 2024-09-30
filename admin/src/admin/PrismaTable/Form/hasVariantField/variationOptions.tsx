import Input from './ui/input';
import { useFieldArray, Controller } from 'react-hook-form';
import Button from './ui/button';
// import { Product } from '@graphql/products.graphql';
import Description from './ui/description';
import Card from './common/card';
import Label from './ui/label';
import Title from './ui/title';

import Checkbox from './ui/checkbox/checkbox';
// import { useAttributesQuery } from '@graphql/attributes.graphql';
import SelectInput from './ui/select-input';
import { cartesian } from 'utils/cartesian';
import isEmpty from 'lodash/isEmpty';
import { useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React from 'react';
import TextField from '@mui/material/TextField';
// import { useShopQuery } from '@graphql/shops.graphql';

// type IProps = {
//   initialValues?: Product | null;
// };

function filteredAttributes(attributes: any, variations: any) {
  let res = [];
  res = attributes?.filter((el: any) => {
    return !variations.find((element: any) => {
      return element?.attribute?.slug === el?.slug;
    });
  });
  return res;
}

function getCartesianProduct(values: any) {
  const formattedValues = values
    ?.map((v: any) => v.value?.map((a: any) => ({ name: v.attribute.name, value: a.value })))
    .filter((i: any) => i !== undefined);
  if (isEmpty(formattedValues)) return [];
  return cartesian(...formattedValues);
}

export default function ProductVariableForm({
  field,
  value,
  error,
  register,
  setValue,
  getValues,
  watch,
  control,
  disabled,
  ui,
  custom,
  t,
}) {
  // const { t } = useTranslation();

  // const variations = watch('variations') ?? [];
  // console.log(variations, field);
  const cartesianProduct = getCartesianProduct(
    Array.isArray(getValues('variations')) ? getValues('variations') : []
  );
  return (
    <div className="w-full">
      {/* Preview generation section start */}
      {!!cartesianProduct?.length && (
        <div className="border-t border-dashed border-border-200 pt-5 md:pt-8 mt-5 md:mt-8">
          <Title className="text-lg uppercase text-center px-5 md:px-8 mb-0">
            {cartesianProduct?.length} {t('form:total-variation-added')}
          </Title>
          {cartesianProduct.map((fieldAttributeValue: any, index: number) => {
            return (
              <div
                key={`fieldAttributeValues-${index}`}
                className="border-b last:border-0 border-dashed border-border-200 p-5 md:p-8 md:last:pb-0 mb-5 last:mb-8 mt-5"
              >
                <Title className="!text-lg mb-8">
                  {t('form:form-title-variant')}:{' '}
                  <span className="text-blue-600 font-normal">
                    {Array.isArray(fieldAttributeValue)
                      ? fieldAttributeValue?.map((a) => a.value).join('/')
                      : fieldAttributeValue.value}
                  </span>
                </Title>
                <TitleAndOptionsInput
                  register={register}
                  setValue={setValue}
                  index={index}
                  fieldAttributeValue={fieldAttributeValue}
                />

                <input {...register(`variationOptions.${index}.id`)} type="hidden" />

                <div className="grid grid-cols-2 gap-5">
                  <Controller
                    control={control}
                    name={`variationOptions.${index}.price`}
                    render={({ field }) => (
                      // Material UI TextField already supports
                      // `value` and `onChange`
                      <TextField
                        type="number"
                        error={!!error?.[index]?.price?.message}
                        helperText={t(error?.[index]?.price?.message)}
                        variant="outlined"
                        {...field}
                        label={`${t('form:input-label-price')}*`}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name={`variationOptions.${index}.sale_price`}
                    render={({ field }) => (
                      // Material UI TextField already supports
                      // `value` and `onChange`
                      <TextField
                        type="number"
                        error={!!error?.[index]?.sale_price?.message}
                        helperText={t(error?.[index]?.sale_price?.message)}
                        variant="outlined"
                        {...field}
                        label={t('form:input-label-sale-price')}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name={`variationOptions.${index}.sku`}
                    render={({ field }) => (
                      // Material UI TextField already supports
                      // `value` and `onChange`
                      <TextField
                        type="text"
                        error={!!error?.[index]?.sku?.message}
                        helperText={t(error?.[index]?.sku?.message)}
                        variant="outlined"
                        {...field}
                        label={`${t('form:input-label-sku')}*`}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name={`variationOptions.${index}.quantity`}
                    render={({ field }) => (
                      // Material UI TextField already supports
                      // `value` and `onChange`
                      <TextField
                        type="number"
                        error={!!error?.[index]?.quantity?.message}
                        helperText={t(error?.[index]?.quantity?.message)}
                        variant="outlined"
                        {...field}
                        label={`${t('form:input-label-quantity')}*`}
                      />
                    )}
                  />
                  {/* <Input
                    label={`${t('form:input-label-price')}*`}
                    type="number"
                    {...register(`variationOptions.${index}.price`)}
                    error={t(error?.[index]?.price?.message)}
                    variant="outline"
                    className="mb-5"
                  /> 
                  <Input
                    label={t('form:input-label-sale-price')}
                    type="number"
                    {...register(`variationOptions.${index}.sale_price`)}
                    error={t(error?.[index]?.sale_price?.message)}
                    variant="outline"
                    className="mb-5"
                  />
                  <Input
                    label={`${t('form:input-label-sku')}*`}
                    {...register(`variationOptions.${index}.sku`)}
                    error={t(error?.[index]?.sku?.message)}
                    variant="outline"
                    className="mb-5"
                  />
                  <Input
                    label={`${t('form:input-label-quantity')}*`}
                    type="number"
                    {...register(`variationOptions.${index}.quantity`)}
                    error={t(error?.[index]?.quantity?.message)}
                    variant="outline"
                    className="mb-5"
                  /> */}
                </div>
                <div className="mb-5 mt-5">
                  <Checkbox
                    {...register(`variationOptions.${index}.is_disable`)}
                    error={t(error?.[index]?.is_disable?.message)}
                    label={t('form:input-label-disable-variant')}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export const TitleAndOptionsInput = ({ fieldAttributeValue, index, setValue, register }: any) => {
  const title = Array.isArray(fieldAttributeValue)
    ? fieldAttributeValue.map((a) => a.value).join('/')
    : fieldAttributeValue.value;
  const options = Array.isArray(fieldAttributeValue)
    ? JSON.stringify(fieldAttributeValue)
    : JSON.stringify([fieldAttributeValue]);
  useEffect(() => {
    setValue(`variationOptions.${index}.id`, title);
    setValue(`variationOptions.${index}.title`, title);
    setValue(`variationOptions.${index}.options`, options);
  }, [fieldAttributeValue]);
  return (
    <>
      <input {...register(`variationOptions.${index}.id`)} type="hidden" />
      <input {...register(`variationOptions.${index}.title`)} type="hidden" />
      <input {...register(`variationOptions.${index}.options`)} type="hidden" />
    </>
  );
};
