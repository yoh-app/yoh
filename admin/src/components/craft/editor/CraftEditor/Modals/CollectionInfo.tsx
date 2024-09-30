import React, { useState, useEffect, useContext } from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import { useEditor } from '@craftjs/core';
import { CraftContext } from '../../CraftContext';

import {
  usePermissionQuery,
  useUpdateOneProductCollectionMutation,
  useUpdateOnePageCollectionMutation,
} from 'generated';
import { useQuery, gql } from '@apollo/client';
import { useTranslation } from 'next-i18next';

const CollectionInfo = ({ }) => {
  const { setCollectionUpdated, editPart, setEditPart, loading, setLoading, setView } = useContext(CraftContext);

  const {
    connectors,
    actions: { selectNode },
    query,
    selected,
  } = useEditor((state) => ({
    enabled: state.options.enabled,
    selected: state.events.selected,
  }));
  const [selectedId, setSelectedId] = useState(null);
  const [collectionType, setCollectionType] = useState(null);
  const { t } = useTranslation('design');

  const [dataName, setDataName] = useState('');
  const [dataDescription, setDataDescription] = useState('');
  const [dataDisplayTitle, setDataDisplayTitle] = useState(false);

  const [updatePageCollection] = useUpdateOnePageCollectionMutation();
  const [updateProductCollection] = useUpdateOneProductCollectionMutation();

  const { data: permissionData } = usePermissionQuery();

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

  const { data: pageData, refetch: refetchPage } = useQuery(
    gql`
      query findManyPageCollection($where: PageCollectionWhereInput) {
        findManyPageCollection(where: $where) {
          id
          name
          description
          displayTitle
        }
      }
    `,
    {
      variables: {
        where: {
          id: {
            equals: selectedId,
          },
          websiteId: {
            equals: permissionData?.permission?.Website,
          },
        },
      },
      skip: collectionType !== 'page' || !permissionData?.permission?.Website,
    }
  );
  const { data: productData, refetch: refetchProduct } = useQuery(
    gql`
      query findManyProductCollection($where: ProductCollectionWhereInput) {
        findManyProductCollection(where: $where) {
          id
          name
          description
          displayTitle
        }
      }
    `,
    {
      variables: {
        where: {
          id: {
            equals: selectedId,
          },
          websiteId: {
            equals: permissionData?.permission?.Website,
          },
        },
      },
      skip: collectionType !== 'product' || !permissionData?.permission?.Website,
    }
  );
  const data =
    collectionType === 'page'
      ? pageData?.findManyPageCollection[0]
      : productData?.findManyProductCollection[0];

  useEffect(() => {
    if (!!data?.id) {
      setDataName(data.name);
      setDataDescription(data.description);
      setDataDisplayTitle(data.displayTitle);
    }
  }, [data]);

  const onClose = () => {
    selectNode(null);
    setSelectedId(null);
    setEditPart(null);
  }

  return (
    <div>
      <Typography
        variant="h6"
        sx={{
          color: '#4B5971',
          fontSize: '18px',
          lineHeight: '28px',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <img className="w-[16px] mr-3" src="/icons/collection.svg" />
        {collectionType === 'page' ? t('WebsiteAdmin.DesignPage.collection.page.edit') : t('WebsiteAdmin.DesignPage.collection.product.edit')}
      </Typography>
      {selectedId && (
        <>
          <div className="py-2">
            <InputLabel sx={{ color: '#4B5971' }}>{t('WebsiteAdmin.DesignPage.collection.description')}</InputLabel>
            <TextField
              size="small"
              fullWidth
              inputProps={{
                style: { color: '#212B36' },
              }}
              value={dataName}
              onChange={(e) => {
                setDataName(e.target.value);
              }}
              sx={{
                marginTop: '12px',
                '& .MuiOutlinedInput-notchedOutline': { borderRadius: '8px' },
                '& .MuiOutlinedInput-root:not(.Mui-focused) .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#B8B8B8',
                },
              }}
            ></TextField>
            <TextField
              size="small"
              fullWidth
              inputProps={{
                style: { color: '#212B36' },
              }}
              value={dataDescription}
              onChange={(e) => {
                setDataDescription(e.target.value);
              }}
              sx={{
                marginTop: '16px',
                '& .MuiOutlinedInput-notchedOutline': { borderRadius: '8px' },
                '& .MuiOutlinedInput-root:not(.Mui-focused) .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#B8B8B8',
                },
              }}
            ></TextField>
          </div>
          <div className="py-2">
            <InputLabel sx={{ color: '#4B5971' }}>{t('WebsiteAdmin.DesignPage.collection.displaySetting')}</InputLabel>
            <FormControlLabel
              label={dataDisplayTitle ? t('WebsiteAdmin.DesignPage.collection.display') : t('WebsiteAdmin.DesignPage.collection.dontDisplay')}
              control={
                <Switch
                  checked={dataDisplayTitle}
                  onChange={(e) => {
                    setDataDisplayTitle(e.target.checked);
                  }}
                  sx={{
                    // '.MuiSwitch-switchBase': {
                    //   '&.Mui-checked': {
                    //     '.MuiSwitch-thumb': {
                    //       background: 'rgba(104, 81, 255, 1)',
                    //     },
                    //     '& + .MuiSwitch-track': {
                    //       background: 'rgba(104, 81, 255, 0.32)',
                    //     },
                    //   },
                    //   '&:not(.Mui-checked)': {
                    //     '.MuiSwitch-thumb': {
                    //       background: '#ffffff',
                    //     },
                    //     '& + .MuiSwitch-track': {
                    //       background: 'rgba(145, 158, 171, 0.8)',
                    //     },
                    //   },
                    // },
                  }}
                />
              }
            />
          </div>
          <div className="py-2 text-center">
            <Button
              variant="contained"
              onClick={async () => {
                setLoading(true)
                if (collectionType === 'page') {
                  await updatePageCollection({
                    variables: {
                      where: {
                        id: selectedId,
                      },
                      data: {
                        name: { set: dataName },
                        description: { set: dataDescription },
                        displayTitle: { set: dataDisplayTitle },
                      },
                    },
                  });
                } else {
                  await updateProductCollection({
                    variables: {
                      where: {
                        id: selectedId,
                      },
                      data: {
                        name: { set: dataName },
                        description: { set: dataDescription },
                        displayTitle: { set: dataDisplayTitle },
                      },
                    },
                  });
                }
                setCollectionUpdated(selectedId);
                if (collectionType === 'page') {
                  await refetchPage();
                } else {
                  await refetchProduct();
                }
                selectNode(null);
                setSelectedId(null);
                setEditPart(null);
                setView(null)
                setLoading(false)
              }}
            >
              <img className="mr-2" src="/icons/check-white.svg" />
              {t('WebsiteAdmin.DesignPage.collection.save')}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CollectionInfo