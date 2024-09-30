import Input from 'components/ui/input';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import Button from 'components/ui/button';
// import { Product } from '@graphql/products.graphql';
import Description from 'components/ui/description';
import Card from 'components/common/card';
import Label from 'components/ui/label';
import Title from 'components/ui/title';

import Checkbox from 'components/ui/checkbox/checkbox';
// import { useAttributesQuery } from '@graphql/attributes.graphql';
import SelectInput from 'components/ui/select-input';
import { cartesian } from 'utils/cartesian';
import isEmpty from 'lodash/isEmpty';
import { useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
// import { useShopQuery } from '@graphql/shops.graphql';
import { useFindManyAttributeQuery } from 'generated';
// type IProps = {
//   initialValues?: Product | null;
// };

function filteredAttributes(attributes: any, variations: any) {
  if (Object.keys(variations)?.length === 0) {
    return []
  }
  let res = [];
  res = attributes?.filter((el: any) => {
    return !variations?.find((element: any) => {
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
  watch,
  control,
  disabled,
  ui,
  custom,
  t,
}) {
  // const { t } = useTranslation();

  const { data, loading } = useFindManyAttributeQuery();

  // This field array will keep all the attribute dropdown fields
  const { fields, append, remove } = useFieldArray({
    shouldUnregister: true,
    control,
    name: 'variations',
  });
  // const variations = watch('variations') ?? [];
  const variations =
    useWatch({
      control,
      name: 'variations', // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
      defaultValue: [],
    }) ?? [];

  const attributes = data?.findManyAttribute;

  return (
    <div className="w-full">
      <Title className="text-lg uppercase text-center px-5 md:px-8 mb-0 mt-8">{t('form:form-title-options')}</Title>
      <div>
        {fields?.map((field: any, index: number) => {
          console.log(variations?.[index]?.attribute?.values);
          return (
            <div key={field.id} className="border-b border-dashed border-border-200 last:border-0 p-5 md:p-8">
              <div className="flex items-center justify-between">
                <Title className="mb-0">
                  {t('form:form-title-options')} {index + 1}
                </Title>
                <button
                  onClick={() => remove(index)}
                  type="button"
                  className="text-sm text-red-500 hover:text-red-700 transition-colors duration-200 focus:outline-none"
                >
                  {t('form:button-label-remove')}
                </button>
              </div>

              <div className="grid grid-cols-fit gap-5">
                <div className="mt-5">
                  <Label>{t('form:input-label-attribute-name')}*</Label>
                  <SelectInput
                    name={`variations[${index}].attribute`}
                    control={control}
                    defaultValue={field.attribute}
                    getOptionLabel={(option: any) => option.name}
                    getOptionValue={(option: any) => option.id}
                    options={filteredAttributes(attributes, variations)!}
                    isLoading={loading}
                  />
                </div>

                <div className="mt-5 col-span-2">
                  <Label>{t('form:input-label-attribute-value')}*</Label>
                  <SelectInput
                    isMulti
                    name={`variations[${index}].value`}
                    control={control}
                    defaultValue={field.value}
                    getOptionLabel={(option: any) => option.value}
                    getOptionValue={(option: any) => option.value}
                    options={variations?.[index]?.attribute?.values}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="px-5 md:px-8">
        <Button
          disabled={fields?.length === attributes?.length}
          onClick={(e: any) => {
            e.preventDefault();
            append({ attribute: '', value: [] });
          }}
          type="button"
        >
          {t('form:button-label-add-option')}
        </Button>
      </div>
    </div>
  );
}