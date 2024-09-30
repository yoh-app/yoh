import React, { useContext, useState } from 'react';
import { TableContext } from '../Context';

const filterMemo = (modelName: string, filter?: any) => {
  const {
    schema: { models },
  } = useContext(TableContext);
  return React.useMemo(() => {
    const initialValue: any[] = [];
    if (filter) {
      const model = models.find((item) => item.id === modelName);
      Object.keys(filter).forEach((key) => {
        if (model && filter[key]) {
          // filter by model field type
          const field = model.fields.find((item) => item.type === key);
          const fieldModel = models.find((item) => item.id === field?.type);
          if (fieldModel) {
            const isField = fieldModel.fields.find(
              (field) => field.name === fieldModel.idField,
            );
            const filterValue = {
              [fieldModel.idField]: {
                equals:
                  isField?.type === 'String'
                    ? filter[key]
                    : parseInt(filter[key]),
              },
            };
            const value = field?.list ? { some: filterValue } : filterValue;
            initialValue.push({
              id: field ? field.name : key,
              value,
            });
          }
          // filter by model field name
          const fieldByName = model.fields.find((item) => item.name === key);
          if (fieldByName) {
            initialValue.push({
              id: key,
              value: {
                equals:
                  fieldByName.type === 'String'
                    ? filter[key]
                    : parseInt(filter[key]),
              },
            });
          }
        }
      });
    }
    return initialValue;
  }, [filter, models]);
};

const handleFilter = (filters: { id: string; value: any }[]) => {
  if (filters.length) {
    const newWhere: { [key: string]: { [key: string]: any } } = {};
    filters.forEach((item) => {
      newWhere[item.id] = item.value;
    });
    return newWhere;
  }
  return undefined;
};

export const useFilterAndSort = (model: string, filter?: any) => {
  const initialFilter = filterMemo(model, filter);
  const [where, setWhere] = useState<any>(handleFilter(initialFilter));
  const [orderBy, setOrderBy] = useState<any[]>();

  const filterHandler = (filters: { id: string; value: any }[]) => {
    setWhere(handleFilter(filters));
  };

  const sortByHandler = (sortBy: { id: string; desc: boolean }[]) => {
    if (sortBy.length > 0) {
      const newOrderBy: { [key: string]: 'asc' | 'desc' }[] = [];
      sortBy.forEach((item) => {
        newOrderBy.push({
          [item.id.split('.')[0]]: item.desc ? 'desc' : 'asc',
        });
      });
      setOrderBy(newOrderBy);
    } else if (orderBy) {
      setOrderBy(undefined);
    }
  };

  return {
    where,
    orderBy,
    initialFilter,
    filterHandler,
    sortByHandler,
  };
};
