import React, { useContext, useState } from 'react';

import { getDisplayName } from './utils';
import { SchemaField, SchemaModel, GetColumnsPartial, GetColumns } from '../../types';
import { TableContext } from '../Context';
import { buttonClasses, classNames } from '../../components/css';
import useActions from '../Form/useActions';
import Switch from '@mui/material/Switch';
const columnsObject: GetColumns = (field, model, websiteData) => ({
  boolean: {
    Header: field.title,
    accessor: field.name,
    disableFilters: !field.filter || field.list,
    defaultCanSort: field.sort,
    // Cell: ({ row, value: initialValue }) => {
    //   const [state, setState] = useState(initialValue);
    //   const { onSubmit, loading } = useActions(model, { id: row.original.id }, 'update', () => { });
    //   // const { lang } = useContext(TableContext);
    //   // return field.list ? value.join(',') : value ? lang.yes : lang.no;
    //   return (
    //     <Switch
    //       checked={state}
    //       onChange={async (e) => {
    //         await onSubmit({ [field.name]: e.target.checked });
    //         setState(!state);
    //       }}
    //     />
    //   );
    // },
    Cell: ({ value }) => {
      const { lang } = useContext(TableContext);
      return field.list ? value.join(',') : value ? lang.yes : lang.no;
    },
  },
  number: {
    Header: <>{field.title} {field?.name === 'creatorEarnings' && <div>&nbsp;(%)</div>} {(field?.name === 'stripeFee' || field?.name === 'applicationFee' || field?.name === 'price' || field?.name === 'total' || field?.name === 'amount') && <div>
      {websiteData?.paymentMethod === 'crypto' ? (
        websiteData?.chain?.iconUrl ? (
          <img className='ml-2' src={websiteData?.chain?.iconUrl} alt={websiteData?.chain?.name} />
        ) : (
          websiteData?.chain?.name
        )
      ) : websiteData?.currencyCode ? (
        <>&nbsp;({websiteData?.currencyCode})</>
      ) : <>&nbsp; (usd)</>}


    </div>}</>,
    accessor: field.name,
    disableFilters: !field.filter || field.list,
    disableSortBy: !field.sort,
    Cell: ({ value }) => (field.list ? value.join(',') : value),
  },
  enum: {
    Header: field.title,
    accessor: field.name,
    disableFilters: !field.filter || field.list,
    disableSortBy: !field.sort,
    Cell: ({ value }) => (field.list ? value.join(',') : value),
  },
  DateTime: {
    Header: field.title,
    accessor: field.name,
    minWidth: 200,

    disableSortBy: !field.sort,
    Cell: ({ value }) => (value ? new Date(value).toLocaleString() : ''),
  },
  object: {
    Header: field.title,
    accessor: field.name,

    disableSortBy: true,
    Cell: ({ value }) => {
      const {
        schema: { models },
        push,
        pagesPath,
      } = useContext(TableContext);
      const model = models.find((item) => item.id === field.type);
      if (!model || !value) return <></>;
      return (
        <button
          onClick={() =>
            push(
              `${pagesPath}${field.type}?${model.update ? 'update' : 'view'}=${value[model.idField]
              }`
            )
          }
          style={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            padding: 0,
            textTransform: 'none',
          }}
          className={classNames(
            buttonClasses,
            'rounded-md py-2 px-4 bg-transparent text-blue-600 hover:bg-blue-100 hover:bg-opacity-25'
          )}
        >
          {value?.[model.displayFields[0]] ? getDisplayName(value, model) : value?.walletAddress ? value?.walletAddress : value?.id}
        </button >
      );
    },
  },
  string: {
    Header: field.title,
    accessor: field.name,
    disableFilters: !field.filter || field.list,
    disableSortBy: !field.sort,
    // Cell: ({ value }) => (field.list ? value.join(',') : value),
    Cell: ({ row, value: initialValue }) => {
      // We need to keep and update the state of the cell normally
      const [value, setValue] = React.useState(initialValue);
      const { onSubmit, loading } = useActions(model, { id: row.original.id }, 'update', () => {
        // console.log(`${model.name}.${field.name} updated from "${initialValue}" to ${value}`);
      });

      if (field.inlineEdit) {
        return (
          <input
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            onBlur={() => {
              onSubmit({ [field.name]: value });
            }}
          />
        );
      } else {
        return field.list ? value.join(',') : value;
      }
    },
  },
  json: {
    Header: field.title,
    accessor: field.name,
    disableFilters: true,
    disableSortBy: true,
    Cell: ({ value }) => {
      if (field.name === 'imageObj') {
        return <img style={{ margin: 'auto', width: '50px', height: '50px', objectFit: 'cover' }} src={value?.url ? value?.url : '/images/placeholder.svg'} />;
      }
      return value ? JSON.stringify(value) : value;
    },
  },
  list: {
    Header: field.title,
    accessor: field.name,

    disableSortBy: true,
    Cell: ({ row }) => {
      const { push, pagesPath, lang } = useContext(TableContext);
      if (!model) return <></>;
      const id = (row.original as any)[model.idField];
      return (
        <button
          className={classNames(
            buttonClasses,
            'rounded-md py-2 px-4 bg-transparent text-blue-600 hover:bg-blue-100 hover:bg-opacity-25'
          )}
          onClick={() => push(`${pagesPath}${field.type}?${model.id}=${id}`)}
        >
          {lang.show}
        </button>
      );
    },
  },
});

export const columns = (model?: SchemaModel, customColumns?: GetColumnsPartial, ui, t, websiteData) => {
  const getColumn = (field: SchemaField) => {
    const uiField = ui?.forms
      ?.flatMap((form) => form.formFields)
      ?.find((formField) => formField?.name === field.name);

    return typeof customColumns !== 'undefined'
      ? {
        ...columnsObject(field, model, websiteData),
        ...customColumns(field, model, websiteData),
      }
      : columnsObject({ ...field, title: t(uiField.intl.titleId) }, model, websiteData);
  };

  return React.useMemo(() => {
    return model
      ? model.fields
        .slice()
        .sort((a, b) => a.order - b.order)
        .filter((field) => field.read)
        .filter(
          (field) =>
            !field.list &&
            ((field.name === 'imageObj' && field.type === 'Json') || field.type !== 'Json') &&
            // field.kind !== 'object' &&
            !field.relationField
        )
        .filter((field) => {
          let existField = null;
          ui?.forms?.forEach((form) => {
            form?.formFields?.forEach((formField) => {
              if (formField?.name === field?.name) {
                existField = formField;
              }
            });
          });
          return !!existField;
        })
        .filter((field) => {
          switch (model?.name) {
            case 'Product':
              if (websiteData?.paymentMethod === 'crypto') {
                if (field.name === 'stripeFee') {
                  return false
                }
              }
              break;
            case 'Order':
              if (websiteData?.paymentMethod === 'stripe') {
                if (field?.name === 'transactionHash' || field?.name === 'walletAddress') {
                  return false
                }
              } else if (websiteData?.paymentMethod === 'crypto') {
                if (field?.name === 'stripeFee') {
                  return false
                }
              }
              break;
            case 'Request':
              if (websiteData?.paymentMethod === 'stripe') {
                if (field?.name === 'transactionHash' || field?.name === 'walletAddress') {
                  return false
                }
              } else if (websiteData?.paymentMethod === 'crypto') {
                if (field?.name === 'stripeFee') {
                  return false
                }
              }
              break;

              break;

            default:
              break;
          }

          return true;
        })
        .map((field) => {
          if (field.list && field.kind === 'object') {
            return getColumn(field).list;
          }
          if (field.kind !== 'scalar') {
            return getColumn(field)[field.kind];
          }
          switch (field.type) {
            case 'Int':
            case 'Float':
              return getColumn(field).number;
            case 'Boolean':
              return getColumn(field).boolean;
            case 'DateTime':
              return getColumn(field).DateTime;
            case 'String':
              return getColumn(field).string;
            case 'Json':
              return getColumn(field).json;
            default:
              return getColumn(field).string;
          }
        })
      : [];
  }, [model, websiteData]);
};
