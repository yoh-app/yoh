import React, { useContext, useState, useEffect } from 'react';

import Select from '../../components/Select';
import { useFilter } from './useFilter';
import { useEnum, useModel } from '../useSchema';
import { SchemaField, SchemaModel } from '../../types';
import { TableContext } from '../Context';
import { SearchCircleIcon, TrashIcon } from '@heroicons/react/solid';
import { buttonClasses, classNames, inputClasses } from '../../components/css';
import { randString } from './utils';
import { useMutation, gql, useQuery } from '@apollo/client';
import { usePermissionQuery } from 'generated';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next'
import { getDate } from '../Form/getDate';


interface Option {
  id: any;
  name: any;
}

interface FilterComponentsProps {
  filterValue: any;
  setFilter: (value: any) => void;
  field: SchemaField;
}

interface FilterProps {
  model: SchemaModel;
  setAllFilters: (values: { id: string; value: any }[]) => void;
  filters: { id: string; value: any }[];
}

export const Filter: React.FC<FilterProps> = ({ model, setAllFilters, filters }) => {
  const [state, setState] = useState(filters.map(() => randString(10)));
  const { lang } = useContext(TableContext);
  const [customFilterName, setCustomFilterName] = useState('');
  const deleteFilter = (index: number) => {
    setState([...state.filter((_, i) => i !== index)]);
    setAllFilters([...filters.filter((_, i) => i !== index)]);
  };
  const { pathname } = useRouter();
  const { data } = usePermissionQuery();
  const updateAdminMutation = data?.permission
    ? `
        mutation updateOne${data?.permission?.admin}($where: ${data?.permission?.admin}WhereUniqueInput!, $data: ${data?.permission?.admin}UpdateInput!) {
          updateOne${data?.permission?.admin}(where: $where, data: $data) {
            id
          }
        }
      `
    : null;

  const findUniqueAdminQuery = data?.permission
    ? `
        query findUnique${data?.permission?.admin}($where: ${data?.permission?.admin}WhereUniqueInput!) {
          findUnique${data?.permission?.admin}(where: $where) {
            id
            adminFilters
          }
        }
      `
    : null;

  const { data: adminData, refetch } = useQuery(gql(findUniqueAdminQuery), {
    variables: {
      where: {
        id: data?.permission?.[data?.permission?.admin],
      },
    },
    skip: !data?.permission?.admin,
  });

  const [updateAdmin] = useMutation(gql(updateAdminMutation));
  return (
    <div className={`flex w-full flex-col bg-white rounded-lg shadow border border-gray-300`}>
      {/* <div className="flex p-2">
        {adminData?.[`findUnique${data?.permission?.admin}`]?.adminFilters?.[pathname] &&
          adminData?.[`findUnique${data?.permission?.admin}`]?.adminFilters?.[pathname]?.map((filterObj) => {
            if (filterObj.name && filterObj.filters) {
              return (
                <>
                  <button
                    type="button"
                    className={classNames(
                      buttonClasses,
                      'rounded-lg py-2 px-2 bg-black text-white  shadow hover:text-yellow-400',
                    )}
                    onClick={() => setAllFilters(filterObj.filters)}
                  >
                    {filterObj.name}
                  </button>
                  <button
                    type="button"
                    className={classNames(
                      buttonClasses,
                      'bg-transparent text-red-600 hover:bg-red-100 hover:bg-opacity-75 p-2 rounded-full',
                    )}
                    onClick={async () => {
                      const updatedAdmin = await updateAdmin({
                        variables: {
                          where: {
                            id: data?.permission?.[data?.permission?.admin],
                          },
                          data: {
                            adminFilters: {
                              ...adminData?.[`findUnique${data?.permission?.admin}`]?.adminFilters,
                              [pathname]: adminData?.[`findUnique${data?.permission?.admin}`]?.adminFilters?.[
                                pathname
                              ].filter((item) => {
                                return item.name !== filterObj.name;
                              }),
                            },
                          },
                        },
                      });
                      await refetch();
                    }}
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </>
              );
            }
            return null;
          })}
      </div> */}

      {state.map((key, index) => (
        <FilterRow
          model={model}
          key={key}
          index={index}
          deleteFilter={() => deleteFilter(index)}
          filter={filters[index]}
          setFilter={({ id, value }) => {
            if (!value) {
              setAllFilters([...filters.filter((item) => item.id !== id)]);
            } else {
              const newFilters = [...filters];
              newFilters[index] = { id, value };
              setAllFilters(newFilters);
            }
          }}
        />
      ))}
      {state.length === 0 && <div className="p-2 text-gray-500">{lang.nonFilterMsg}</div>}
      <div className="w-full p-2">
        <button
          type="button"
          className={classNames(
            buttonClasses,
            'rounded-lg py-2 px-2 bg-black text-white shadow',
          )}
          onClick={() => setState((prev) => prev.concat([randString(10)]))}
        >
          {lang.addFilter}
        </button>
      </div>
      {/* <div className="w-full flex p-2">
        <input
          style={{ maxWidth: '12rem', lineHeight: 'inherit' }}
          className={inputClasses.replace('py-2 px-4', 'py-2 px-3 text-sm')}
          placeholder={'Custom filter name'}
          type="text"
          value={customFilterName}
          onChange={(e) => setCustomFilterName(e.target.value)}
        />
        <button
          type="button"
          className={classNames(
            buttonClasses,
            'mx-2 rounded-lg py-2 px-2 bg-black text-white  shadow hover:text-yellow-400',
          )}
          onClick={async () => {
            if (customFilterName?.length > 0 && updateAdmin && filters?.length > 0) {
              await updateAdmin({
                variables: {
                  where: {
                    id: data?.permission?.[data?.permission?.admin],
                  },
                  data: {
                    adminFilters: {
                      [pathname]: [
                        ...(Array.isArray(adminData?.[`findUnique${data?.permission?.admin}`]?.adminFilters?.[pathname])
                          ? adminData?.[`findUnique${data?.permission?.admin}`]?.adminFilters?.[pathname]
                          : []),
                        {
                          name: customFilterName,
                          filters,
                        },
                      ],
                    },
                  },
                },
              });
              await refetch();
            }
          }}
        >
          Save
        </button>
      </div> */}
    </div>
  );
};

interface FilterRowProps {
  index: number;
  model: SchemaModel;
  filter?: { id: string; value: any };
  setFilter: (option: { id: string; value: any }) => void;
  deleteFilter: () => void;
}

const FilterRow: React.FC<FilterRowProps> = ({ model, filter, setFilter, index, deleteFilter }) => {
  const { t } = useTranslation('generated')
  const options: Option[] = model.fields
    .filter((f) => f.filter)
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((f) => {
      return ({ id: f.name, name: t(f.uiFormField.intl.titleId) })
    });
  const { dir } = useContext(TableContext);

  const [option, setOption] = useState<Option>(!filter ? options[0] : options.find((item) => item.id === filter.id)!);

  const getField = model.fields.find((f) => f.name === option.id)!;
  const props: FilterComponentsProps = {
    field: getField,
    filterValue: getField.name === filter?.id ? filter.value : undefined,
    setFilter: (value) => setFilter({ id: option.id, value }),
    model
  };
  let filterComponent;
  if (getField.kind === 'enum') {
    filterComponent = <EnumFilter key={getField.name} {...props} />;
  } else if (getField.kind === 'object') {
    filterComponent = <ObjectFilter key={getField.name} {...props} />;
  } else {
    switch (getField.type) {
      case 'Int':
      case 'BigInt':
      case 'Decimal':
      case 'Float':
      case 'DateTime':
      case 'String':
        filterComponent = <DefaultFilter key={getField.name} {...props} />;
        break;
      case 'Boolean':
        filterComponent = <BooleanFilter key={getField.name} {...props} />;
        break;
    }
  }
  return (
    <div
      className={classNames(
        'flex flex-col space-y-2 items-center border-b p-1 md:space-y-0 md:flex-row md:space-x-2',
        dir === 'rtl' ? 'md:space-x-reverse' : '',
        index === 0 ? 'rounded-t-lg' : '',
      )}
    >
      <Select dir={dir} value={option} onChange={(option: Option) => setOption(option)} options={options} />
      {filterComponent}
      <button
        type="button"
        className={classNames(
          buttonClasses,
          'bg-transparent text-red-600 hover:bg-red-100 hover:bg-opacity-75 p-2 rounded-full',
        )}
        onClick={deleteFilter}
      >
        <TrashIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

const DefaultFilter: React.FC<FilterComponentsProps> = ({ filterValue, setFilter, field }) => {
  const { value, onChange } = useFilter(filterValue, setFilter, !['String', 'DateTime'].includes(field.type));
  const { lang, dir } = useContext(TableContext);

  const getName = (name: string): any => {
    return (
      <div className="flex items-center">
        <span>{name}</span>{' '}
        {filterValue && filterValue[name] && <SearchCircleIcon className="h-5 w-5 text-green-500" />}
      </div>
    );
  };
  const options: Option[] = ['equals', 'in', 'notIn', 'lt', 'lte', 'gt', 'gte', 'not'].map((item) => ({
    id: item,
    name: getName(lang[item as 'gt']),
  }));
  if (options.length === 8 && field.type === 'String') {
    options.push(
      ...['contains', 'startsWith', 'endsWith'].map((item) => ({
        id: item,
        name: getName(lang[item as 'gt']),
      })),
    );
  }
  const [option, setOption] = useState<Option>(
    filterValue ? options.find((item) => !!filterValue[item.id])! : options[0],
  );

  const inputProps =
    field.type === 'DateTime'
      ? { type: 'datetime-local', defaultValue: value[option.id] ? getDate(new Date(value[option.id])) : undefined }
      : { type: 'text', value: value[option.id] || '' };

  return (
    <>
      <Select
        key={field.id}
        dir={dir}
        value={option}
        onChange={(option: Option) => setOption(option)}
        options={options}
      />
      <input
        style={{ maxWidth: '13rem', lineHeight: 'inherit' }}
        className={inputClasses.replace('py-2 px-4', 'py-2 px-3 text-sm')}
        placeholder={lang[option.id as 'gt']}
        {...inputProps}
        onChange={(event) =>
          onChange({
            name: option.id,
            value: field.type === 'DateTime' ? new Date(event.target.value).toISOString() : event.target.value,
            wait: true,
          })
        }
      />
    </>
  );
};
// const DefaultFilter: React.FC<FilterComponentsProps> = ({ filterValue, setFilter, field }) => {
//   const { value, onChange } = useFilter(filterValue, setFilter, !['String', 'DateTime'].includes(field.type));
//   const { lang, dir } = useContext(TableContext);

//   const getName = (name: string): any => {
//     return (
//       <div className="flex items-center">
//         <span>{name}</span>{' '}
//         {filterValue && filterValue[name] && <SearchCircleIcon className="h-5 w-5 text-green-500" />}
//       </div>
//     );
//   };
//   // const options: Option[] = ['equals', 'in', 'notIn', 'lt', 'lte', 'gt', 'gte', 'not'].map((item) => ({
//   //   id: item,
//   //   name: getName(lang[item as 'gt']),
//   // }));
//   // if (options.length === 8 && field.type === 'String') {
//   //   options.push(
//   //     ...['contains', 'startsWith', 'endsWith'].map((item) => ({
//   //       id: item,
//   //       name: getName(lang[item as 'gt']),
//   //     })),
//   //   );
//   // }
//   const options = []
//   // const options: Option[] = ['equals', 'not'].map((item) => ({
//   //   id: item,
//   //   name: getName(lang[item as 'gt']),
//   // }));
//   if (field.type === 'String') {
//     options.push(
//       ...['contains'].map((item) => ({
//         id: item,
//         name: getName(lang[item as 'gt']),
//       })),
//     );
//   }
//   if (field.type === 'DateTime' || field.type === 'Float' || field.type === 'Int') {
//     options.push(
//       ...['lt', 'lte', 'gt', 'gte'].map((item) => ({
//         id: item,
//         name: getName(lang[item as 'gt']),
//       })),
//     );
//   }
//   const [option, setOption] = useState<Option>(
//     filterValue ? options.find((item) => !!filterValue[item.id])! : options[0],
//   );
//   return (
//     <>
//       <Select
//         key={field.id}
//         dir={dir}
//         value={option}
//         onChange={(option: Option) => setOption(option)}
//         options={options}
//       />
//       <input
//         style={{ maxWidth: '12rem', lineHeight: 'inherit' }}
//         className={inputClasses.replace('py-2 px-4', 'py-2 px-3 text-sm')}
//         placeholder={lang[option.id as 'gt']}
//         type={field.type === 'DateTime' ? 'date' : 'text'}
//         value={value ? value[option.id] || '' : ''}
//         onChange={(event) => onChange({ event, name: option.id })}
//       />
//     </>
//   );
// };

export const BooleanFilter: React.FC<FilterComponentsProps> = ({ filterValue, setFilter }) => {
  const { lang, dir } = useContext(TableContext);
  const { value, onChange } = useFilter(filterValue, setFilter);
  const options: Option[] = [
    { id: undefined, name: lang.all },
    { id: true, name: lang.yes },
    { id: false, name: lang.no },
  ];
  return (
    <Select
      dir={dir}
      value={options.find((option) => option.id === value?.equals)}
      onChange={(option: Option) => onChange({ value: option.id, name: 'equals' })}
      options={options}
    />
  );
};

export const EnumFilter: React.FC<FilterComponentsProps> = ({ field, filterValue, setFilter, model }) => {
  const { lang, dir } = useContext(TableContext);
  const { t } = useTranslation('generated')
  const enumType = useEnum(field.type, model.name);
  const options: Option[] = [{ id: undefined, name: lang.all }];
  if (enumType) {
    options.push(...enumType?.ui?.enumValues?.map((item) => ({ id: item.name, name: t(item.intl.titleId) })));
  }
  const { value, onChange } = useFilter(filterValue, setFilter);
  return (
    <Select
      dir={dir}
      value={options.find((option) => option.id === value?.equals)}
      onChange={(option: Option) => onChange({ value: option.id, name: 'equals' })}
      options={options}
    />
  );
};

// const ObjectFilter: React.FC<FilterComponentsProps> = ({ field, filterValue, setFilter }) => {
//   const { dir, websiteData } = useContext(TableContext);
//   const { t } = useTranslation('generated')
//   const model = useModel(field.type)!; const filter = filterValue ? (field.list ? filterValue.some : filterValue) : {};
//   const options = model.fields
//     .filter((item) => item.filter && item.kind !== 'object' && !item.list && item.type !== 'Json')
//     .filter((field) => {
//       switch (model?.name) {
//         case 'Product':
//           if (websiteData?.paymentMethod === 'crypto') {
//             if (field.name === 'stripeFee') {
//               return false
//             }
//           }
//           break;
//         case 'Order':
//           if (websiteData?.paymentMethod === 'stripe') {
//             if (field?.name === 'transactionHash' || field?.name === 'walletAddress') {
//               return false
//             }
//           } else if (websiteData?.paymentMethod === 'crypto') {
//             if (field?.name === 'stripeFee') {
//               return false
//             }
//           }
//           break;
//         case 'Request':
//           if (websiteData?.paymentMethod === 'stripe') {
//             if (field?.name === 'transactionHash' || field?.name === 'walletAddress') {
//               return false
//             }
//           } else if (websiteData?.paymentMethod === 'crypto') {
//             if (field?.name === 'stripeFee') {
//               return false
//             }
//           }
//           break;

//           break;

//         default:
//           break;
//       }

//       return true;
//     })
//     .sort((a, b) => a.order - b.order)
//     .map((field, index) => {
//       let filter = false
//       let uiFormField = null
//       model?.ui?.forms?.forEach(form => {
//         form?.formFields?.forEach(formField => {
//           if (formField.name === field.name && field.type !== 'Json' && !field.name.endsWith('Id')) {
//             filter = true
//             uiFormField = formField
//             // model.fields[index] = {
//             //   ...model.fields[index],
//             //   filter: true
//             // }
//           }
//         });
//       });

//       if (filter) {
//         return {
//           ...field,
//           uiFormField,
//           filter
//         }
//       }
//       return null

//     }).filter((item) => item?.uiFormField)
//     .map((item) => ({
//       id: item.name,
//       name: (
//         <div className="flex items-center">
//           <span>{t(item?.uiFormField?.intl?.titleId)}</span> {filter[item.name] && <SearchCircleIcon className="h-5 w-5 text-green-500" />}
//         </div>
//       ),
//     }));

//   const [currentField, setCurrentField] = useState<Option>(
//     filterValue ? options.find((item) => !!filter[item.id])! : options[0],
//   );

//   const getField = model.fields.find((item) => item.name === currentField.id)!;

//   const props: FilterComponentsProps | null = getField
//     ? {
//       field: getField,
//       filterValue: filter[getField.name],
//       setFilter: (value: any) => {
//         const newValue = { ...filter };
//         if (value) {
//           newValue[getField.name] = value;
//         } else {
//           delete newValue[getField.name];
//         }
//         setFilter(Object.keys(newValue).length > 0 ? (field.list ? { some: newValue } : newValue) : undefined);
//       },
//     }
//     : null;

//   useEffect(() => {
//     setCurrentField(filterValue ? options.find((item) => !!filter[item.id])! : options[0]);
//   }, [field]);

//   if (!props) {
//     return null;
//   }

//   let filterComponent;
//   if (getField.kind === 'enum') {
//     filterComponent = <EnumFilter {...props} />;
//   } else {
//     switch (getField.type) {
//       case 'Int':
//       case 'BigInt':
//       case 'Decimal':
//       case 'Float':
//       case 'DateTime':
//       case 'String':
//         filterComponent = <DefaultFilter {...props} />;
//         break;
//       case 'Boolean':
//         filterComponent = <BooleanFilter {...props} />;
//         break;
//     }
//   }
//   return (
//     <>
//       <Select
//         dir={dir}
//         value={currentField}
//         onChange={(option: Option) => {
//           if (option) {
//             setCurrentField(option);
//           }
//         }}
//         options={options as any}
//       />
//       {filterComponent}
//     </>
//   );
// };

const ObjectFilter: React.FC<FilterComponentsProps> = ({ field, filterValue, setFilter }) => {
  const { dir } = useContext(TableContext);
  const model = useModel(field.type)!;
  const filter = filterValue ? (field.list ? filterValue.some : filterValue.is) : {};
  const options = model.fields
    .filter((item) => item.filter && item.kind !== 'object' && !item.list && item.type !== 'Json')
    .sort((a, b) => a.order - b.order)
    .map((item) => ({
      id: item.name,
      name: (
        <div className="flex items-center">
          <span className="truncate">{item.title}</span>{' '}
          {filter?.[item?.name] && <SearchCircleIcon className="h-5 w-5 text-green-500" />}
        </div>
      ),
    }));

  const [currentField, setCurrentField] = useState<Option>(
    filterValue ? options.find((item) => !!filter?.[item?.id])! : options[0],
  );

  const getField = model.fields.find((item) => item.name === currentField.id)!;

  const props: FilterComponentsProps | null = getField
    ? {
      field: getField,
      filterValue: filter?.[getField?.name],
      setFilter: (value: any) => {
        const newValue = { ...filter };
        if (value) {
          newValue[getField.name] = value;
        } else {
          delete newValue[getField.name];
        }
        console.log("newValue: ", newValue)
        setFilter(
          Object.keys(newValue).length > 0 ? (field.list ? { some: newValue } : newValue) : undefined,
        );
      },
    }
    : null;

  useEffect(() => {
    setCurrentField(filterValue ? options.find((item) => !!filter?.[item?.id])! : options[0]);
  }, [field]);

  if (!props) {
    return null;
  }

  let filterComponent;
  if (getField.kind === 'enum') {
    filterComponent = <EnumFilter {...props} />;
  } else {
    switch (getField.type) {
      case 'Int':
      case 'BigInt':
      case 'Decimal':
      case 'Float':
      case 'DateTime':
      case 'String':
        filterComponent = <DefaultFilter {...props} />;
        break;
      case 'Boolean':
        filterComponent = <BooleanFilter {...props} />;
        break;
    }
  }
  return (
    <>
      <Select
        dir={dir}
        value={currentField}
        onChange={(option: Option) => {
          if (option) {
            setCurrentField(option);
          }
        }}
        options={options as any}
      />
      {filterComponent}
    </>
  );
};