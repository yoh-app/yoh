import React, { useState, useEffect, useContext } from 'react';

import Spinner from 'admin/components/Spinner';
import { ModelTableProps, ContextProps } from 'admin/index';
import { TableContext, defaultSettings } from 'admin/PrismaTable/Context';
import defaultLanguage from 'admin/PrismaTable/language';
import DynamicTable from 'admin/PrismaTable/dynamicTable'
import { usePermissionQuery, useFindUniqueWebsiteQuery, useFindUniquePageCollectionQuery } from 'generated';
import { PageCollectionUI } from 'pages/admin/Website/Website/PageCollection'
import { ProductCollectionUI } from 'pages/admin/Website/Website/ProductCollection'
import { VideoCollectionUI } from 'pages/admin/Website/Website/VideoCollection'

import { CraftContext } from '../../CraftContext';
import ThemeProvider from 'theme';
import ThemeColorPresets from 'components/ThemeColorPresets';
import { useEditor } from '@craftjs/core';
import EditRecord from 'admin/PrismaTable/EditRecord';
import { useRouter } from 'next/router'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import { useTranslation } from 'next-i18next'
import { useEdition } from 'contexts/EditionContext';

const PrismaTable: React.FC<ModelTableProps> = ({ onClose, ...rest }) => {
  const {
    connectors,
    actions: { selectNode },
    query,
    selected,
  } = useEditor((state) => ({
    enabled: state.options.enabled,
    selected: state.events.selected,
  }));
  const { setCollectionUpdated, setNextPage, setView } = useContext(CraftContext);
  const { t } = useTranslation('admin');

  const { createProductEdition, processingTransaction, step, address, chain, website, createdProduct } = useEdition();

  const router = useRouter()
  const [selectedId, setSelectedId] = useState(null);

  const [collectionType, setCollectionType] = useState(null);

  useEffect(() => {
    if (selected?.size > 0) {
      const id = Array.from(selected)[0];
      setSelectedId(Array.from(selected)[0]);
      const node = query?.node(id);
      if (node?.node?.props?.type === 'product') {
        setCollectionType('product');
      } else if (node?.node?.props?.type === 'video') {
        setCollectionType('video');
      } else {
        setCollectionType('page');
      }
    }
  }, [selected]);

  // const { data: pageCollectionData, refetch } = useFindUniquePageCollectionQuery({
  //   variables: {
  //     where: {
  //       id: selectedId
  //     }
  //   },
  //   skip: !selectedId
  // })
  const { data: permissionData, loading } = usePermissionQuery();
  const { data: websiteData } = useFindUniqueWebsiteQuery({
    variables: {
      where: {
        id: permissionData?.permission?.Website,
      },
    },
    skip: !permissionData?.permission?.Website,
  });

  const onSaveCreate = ({ model, data, setCreateModal, refetchTable, getData, parent }) => {
    if (model === 'Product') {
      if (!data?.isExternalNft) {
        if (address === website?.walletAddress) {
          createProductEdition(data);
        } else {
          alert(t('wrongAddressAlert'))
        }
      }
    }
    setCreateModal(false);
    parent?.updateRecord && parent.updateRecord();
    getData();
  };
  console.log(selectedId, collectionType)
  if (loading) return <Spinner />;
  return (
    <ThemeProvider>
      <ThemeColorPresets>

        <TableContext.Provider
          value={{
            ...rest,
            pagesPath: '/admin/Website/Website/',
            websiteData: websiteData?.findUniqueWebsite,
            permissionData,
            schema: permissionData?.permission?.schema ?? {
              models: [],
              enums: [],
            },
            push: (url) => {
              setNextPage(url)
              setView('exit_design')
            },
            query: router?.query,
            lang: defaultLanguage(),
            onSaveCreate
          }}
        >
          {/* <DynamicTable
          ui={PageUI}
          model={'Page'}
          inEdit
          filter={{ PageCollection: selectedId }}
          parent={{ name: 'PageCollection', value: { id: selectedId }, field: '', updateRecord: refetch }}
        /> */}
          {collectionType && selectedId && <EditRecord
            enableBack={false}
            ui={collectionType === 'video' ? VideoCollectionUI : collectionType === 'page' ? PageCollectionUI : ProductCollectionUI}
            model={collectionType === 'video' ? 'VideoCollection' : collectionType === 'page' ? 'PageCollection' : 'ProductCollection'}
            update={selectedId}
            onSave={() => {
              console.log('updated')
              onClose()
            }}
          />}
        </TableContext.Provider>
      </ThemeColorPresets>
      <Modal
        open={processingTransaction}
      >
        <Box sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: '20px',
          // border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography variant="h6" component="h2">
            {t('product.processingTransactionTitle')}
          </Typography>
          <Typography sx={{ mt: 2 }}>
            {t('product.processingTransactionDescription')}
          </Typography>
          <div><Checkbox disabled checked={step > 0} />{t('product.processingTransactionStep1')}</div>
          {/* <div><Checkbox disabled checked={step > 1} />{t('product.processingTransactionStep2')}</div> */}
          {/* <div><Checkbox disabled checked={step > 2} />{t('product.processingTransactionStep3')}</div> */}
        </Box>
      </Modal>

    </ThemeProvider>
  );
};

PrismaTable.defaultProps = defaultSettings;
export default PrismaTable