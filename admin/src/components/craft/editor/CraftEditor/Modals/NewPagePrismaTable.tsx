import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';

import Spinner from 'admin/components/Spinner';
import { ModelTableProps, ContextProps } from 'admin/index';
import { TableContext, defaultSettings } from 'admin/PrismaTable/Context';
import defaultLanguage from 'admin/PrismaTable/language';
import BasicForm from 'admin/custom/BasicForm'
import { usePermissionQuery, useFindUniqueWebsiteQuery } from 'generated';
import { PageUI } from 'pages/admin/Website/Website/Page'
import ThemeProvider from 'theme';
import ThemeColorPresets from 'components/ThemeColorPresets';
import { CraftContext } from '../../CraftContext';

const PrismaTable: React.FC<ModelTableProps> = ({ onSave, refetch, data, onCancel }) => {

  const { data: permissionData, loading } = usePermissionQuery();
  const { data: websiteData } = useFindUniqueWebsiteQuery({
    variables: {
      where: {
        id: permissionData?.permission?.Website,
      },
    },
    skip: !permissionData?.permission?.Website,
  });
  if (loading) return <Spinner />;
  return (
    <div style={{
      background: '#F8F8F8'
    }}>
      <ThemeProvider>
        <ThemeColorPresets>
          <TableContext.Provider
            value={{
              websiteData: websiteData?.findUniqueWebsite,
              permissionData,
              schema: permissionData?.permission?.schema ?? {
                models: [],
                enums: [],
              },
              lang: defaultLanguage(),
            }}
          >
            <BasicForm
              ui={PageUI}
              model={'Page'}
              action="create"
              data={data}
              onCancel={onCancel}
              onSave={async (data) => {
                // console.log(collection.id, 'updated collection')
                // setCollectionUpdated(collection.id)
                // await refetch()
                onSave(data)
              }}
            />
          </TableContext.Provider>
        </ThemeColorPresets>
      </ThemeProvider>
    </div>
  );
};

PrismaTable.defaultProps = defaultSettings;
export default PrismaTable