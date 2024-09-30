import React, { useEffect, useState, useContext } from 'react';
import { useEditor } from '@craftjs/core';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { useTranslation } from 'next-i18next';
import {
  useCreateOnePageCollectionMutation,
  useCreateOneProductCollectionMutation,
} from 'generated';
import { CraftContext } from '../../CraftContext';
import Spinner from 'admin/components/Spinner';
import { addCollection } from './utils';

const NewCollection = ({ type, onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [createPageCollection] = useCreateOnePageCollectionMutation();
  const [createProductCollection] = useCreateOneProductCollectionMutation();
  const { addItemIndex, setView, permissionData, setEditPart, setEditMode, loading, setLoading } = useContext(CraftContext);
  const { t } = useTranslation('design');
  const {
    actions: { deserialize, selectNode },
    query,
  } = useEditor();
  return (
    <div>
      {/* <div className="flex align-center">
        <img className="w-[16px]" src="/icons/collection.svg" />
        <Typography sx={{ flexGrow: 1, marginLeft: 1.5, marginRight: 1.5, color: '#4B5971' }}>
          {t('WebsiteAdmin.DesignPage.AddItem.product.collection.Add.title')}
        </Typography>
        <Button sx={{ minWidth: 'unset' }} onClick={() => }>
          <img src="/icons/close.svg" />
        </Button>
      </div> */}
      <div className="w-full flex justify-between">
        <Typography
          sx={{
            // color: '#4B5971',
            fontSize: '16px',
          }}
        >
          {t('WebsiteAdmin.DesignPage.addSection')}
        </Typography>
      </div>
      <div className='mt-3'>
        <Typography
          sx={{
            color: '#4B5971',
            fontSize: '16px',
          }}
        >
          {t(`WebsiteAdmin.DesignPage.addSection.${type}.description`)}
        </Typography>

      </div>
      <div className="my-4">
        <TextField
          label={t(`WebsiteAdmin.DesignPage.AddItem.${type}.collection.Add.name`)}
          fullWidth
          inputProps={{
            style: { color: '#212B36' },
          }}
          size="small"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div className="my-4">
        <TextField
          label={t(`WebsiteAdmin.DesignPage.AddItem.${type}.collection.Add.description`)}
          fullWidth
          inputProps={{
            style: { color: '#212B36' },
          }}
          size="small"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </div>
      <div className="absolute bottom-6">
        <Button onClick={() => setView(type + '_collection')}>
          &lt; {t('WebsiteAdmin.DesignPage.AddItem.block.Access.back')}
        </Button>
      </div>
      <div className="text-center mt-8">
        <Button
          variant="contained"
          onClick={async () => {
            setLoading(true)
            const currentJson = query.serialize();
            let item
            if (type === 'product') {
              const { data } = await createProductCollection({
                variables: {
                  data: {
                    name,
                    description,
                  },
                },
              });
              const newJson = addCollection({
                currentJson,
                collectionId: data?.createOneProductCollection?.id,
                websiteId: permissionData?.Website,
                type,
                addItemIndex,
              });
              deserialize(newJson);
              item = data?.createOneProductCollection
            } else {
              const { data } = await createPageCollection({
                variables: {
                  data: {
                    name,
                    description,
                  },
                },
              });
              const newJson = addCollection({
                currentJson,
                collectionId: data?.createOnePageCollection?.id,
                websiteId: permissionData?.permission?.Website,
                type,
                addItemIndex,
              });
              deserialize(newJson);
              item = data?.createOnePageCollection
            }

            setView(null);
            if (item?.id) {
              selectNode(item?.id)
              setView('collection')
              // setEditMode(true);
            }
            setLoading(false)
          }}
          disabled={!name || !description}
        >
          <img className="mr-2" src="/icons/check-white.svg" />
          {t('WebsiteAdmin.DesignPage.AddPage.buttonSubmit')}
        </Button>
      </div>
    </div>
  );
};
export default NewCollection