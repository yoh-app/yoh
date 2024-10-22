import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Spinner from 'admin/components/Spinner';
import { ModelTableProps, ContextProps } from 'admin/index';
import { TableContext, defaultSettings } from 'admin/PrismaTable/Context';
import defaultLanguage from 'admin/PrismaTable/language';
import BasicForm from 'admin/custom/BasicForm'
import { usePermissionQuery, useFindUniqueOrganizationQuery } from 'generated';
import { PageGroupUI } from 'pages/admin/Organization/Organization/PageGroup'
import ThemeProvider from 'theme';
import ThemeColorPresets from 'components/ThemeColorPresets';
import { CraftContext } from '../../CraftContext';
import { useTranslation } from 'next-i18next'
import { addCollection } from './utils';
import { useEditor } from '@craftjs/core';
import { useRouter } from 'next/router'

const PrismaTable: React.FC<ModelTableProps> = ({ onSave, data, setView }) => {
  const { loading, addItemIndex, permissionData, websiteData, setNextPage, setEditingCollection } = useContext(CraftContext)
  const { t } = useTranslation('design');
  const router = useRouter()
  const {
    actions: { deserialize, selectNode },
    query } = useEditor()

  if (loading) return <Spinner />;
  return (

    <ThemeProvider>
      <ThemeColorPresets>
        <TableContext.Provider
          value={{
            websiteData: websiteData,
            permissionData,
            schema: permissionData?.schema ?? {
              models: [],
              enums: [],
            },
            push: setNextPage,
            query: router?.query,
            lang: defaultLanguage(),
          }}
        >
          <div className="w-full flex justify-between">
            <Typography
              sx={{
                color: '#4B5971',
                fontSize: '16px',
              }}
            >
              {t('WebsiteAdmin.DesignPage.addSection')}
            </Typography>
          </div>
          <BasicForm
            ui={PageGroupUI}
            model={'PageGroup'}
            action="create"
            data={data}
            onSave={async (data) => {
              // console.log(collection.id, 'updated collection')
              // setCollectionUpdated(collection.id)
              // await refetch()
              const currentJson = query.serialize();
              const newJson = addCollection({
                currentJson,
                collectionId: data?.id,
                websiteId: websiteData?.id,
                type: 'page',
                addItemIndex,
              });
              deserialize(newJson);
              setView(null);
              if (data?.id) {
                selectNode(data?.id)
                setEditingCollection(data?.id)
                setView('collection_info')
                // setEditMode(true);
              }
              // refetchPageGroup()
              onSave(data)
            }}
          />
          <div className="bottom-6">
            <Button onClick={() => setView('add_item')}>
              &lt; {t('WebsiteAdmin.DesignPage.AddItem.block.Access.back')}
            </Button>
          </div>
        </TableContext.Provider>
      </ThemeColorPresets>
    </ThemeProvider>
  );
};

PrismaTable.defaultProps = defaultSettings;
export default PrismaTable