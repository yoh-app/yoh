import React from 'react';
import { useQuery } from '@apollo/client';

import Spinner from '../components/Spinner';
import DynamicTable from './dynamicTable';
import { GET_SCHEMA } from '../SchemaQueries';
import { ModelTableProps, ContextProps } from '../index';
import { TableContext, defaultSettings } from './Context';
import defaultLanguage from './language';
import { usePermissionQuery, useFindUniqueWebsiteQuery } from 'generated';
import ProductTable from './Custom/Product'
import WebsiteTable from './Custom/Website'

const PrismaTable: React.FC<ModelTableProps> = ({ children, language, model, ui, enableBack, ...rest }) => {
  // const { data, loading } = useQuery<{ getSchema: ContextProps['schema'] }>(GET_SCHEMA);
  const { data: permissionData, loading } = usePermissionQuery();
  const { data: websiteData } = useFindUniqueWebsiteQuery({
    variables: {
      where: {
        id: permissionData?.permission?.Website,
      },
    },
    skip: !permissionData?.permission?.Website,
  });
  const mergedLanguage = { ...defaultLanguage(), ...language };
  if (loading) return <Spinner />;
  if (model === 'Product') {
    return <ProductTable permissionData={permissionData?.permission} websiteData={websiteData?.findUniqueWebsite} language={language} model={model} ui={ui} {...rest}>{children}</ProductTable>
  } else if (model === 'Website') {
    return <WebsiteTable permissionData={permissionData?.permission} websiteData={websiteData?.findUniqueWebsite} language={language} model={model} ui={ui} {...rest}>{children}</WebsiteTable>
  }
  return (
    <TableContext.Provider
      value={{
        websiteData: websiteData?.findUniqueWebsite,
        permissionData: permissionData?.permission,
        schema: permissionData?.permission?.schema ?? {
          models: [],
          enums: [],
        },
        ...(rest as any),
        lang: mergedLanguage,
      }}
    >
      <DynamicTable enableBack={enableBack} ui={ui} model={model}>
        {children}
      </DynamicTable>
    </TableContext.Provider>
  );
};

PrismaTable.defaultProps = defaultSettings;

export { PrismaTable, TableContext };
export * from './Table/Filters';
export * from './Form/Inputs';