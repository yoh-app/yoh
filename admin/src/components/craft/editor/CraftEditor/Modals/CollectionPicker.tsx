import React, { useEffect, useState, useContext } from 'react';
import { useEditor } from '@craftjs/core';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { useTranslation } from 'next-i18next';
import { CraftContext } from '../../CraftContext';
import { addCollection } from './utils';
import {
  useFindManyPageCollectionQuery,
  useFindManyProductCollectionQuery,
  useCreateOnePageCollectionMutation,
  useCreateOneProductCollectionMutation,
  useCreateOneVideoCollectionMutation,
  useFindManyVideoCollectionQuery
} from 'generated';
const CollectionPicker = ({ type, onClose }) => {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('');
  const { t } = useTranslation('design');
  const [createProductCollection] = useCreateOneProductCollectionMutation()
  const [createPageCollection] = useCreateOnePageCollectionMutation()
  const [createVideoCollection] = useCreateOneVideoCollectionMutation()


  const { data: videoCollectionData, } =
    useFindManyVideoCollectionQuery({
      variables: {
        where: {
          name: {
            not: {
              equals: ''
            }
          }
        }
      },
      skip: type !== 'video'
    });

  const { data: productCollectionData, } =
    useFindManyProductCollectionQuery({
      variables: {
        where: {
          name: {
            not: {
              equals: ''
            }
          }
        }
      },
      skip: type !== 'product'
    });
  const { data: pageCollectionData, } =
    useFindManyPageCollectionQuery({
      variables: {
        where: {
          name: {
            not: {
              equals: ''
            }
          }
        }
      },
      skip: type !== 'page'
    });

  const collections = type === 'video' ? videoCollectionData?.findManyVideoCollection : type === 'page' ? pageCollectionData?.findManyPageCollection : productCollectionData?.findManyProductCollection

  const { addItemIndex, setView, view, permissionData, websiteData, setEditPart, setEditMode, setEditingCollection } = useContext(CraftContext);
  const {
    actions: { deserialize, selectNode },
    query,
  } = useEditor();

  const [nodes, setNodes] = useState([])

  useEffect(() => {
    let currentJson = query?.serialize()
    currentJson = JSON.parse(currentJson)
    setNodes(currentJson?.ROOT?.nodes)
  }, [view])

  return (
    <div>
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
      <div className="my-[10px]">
        <TextField
          label={'Filter'}
          style={{ width: '100%' }}
          size="small"
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        />
      </div>
      <List className="border-[1px] border-solid border-lightgrey mb-[10px]">
        {collections?.length === 0 && (
          <div style={{ margin: '10px' }}>
            <div>{t(`WebsiteAdmin.DesignPage.AddItem.${type}.collection.empty.2`)}</div>
          </div>
        )}
        {collections?.length > 0 &&
          collections?.filter((item) => item.name.includes(filter))?.length === 0 && (
            <div style={{ margin: '10px' }}>
              {t(`WebsiteAdmin.DesignPage.AddItem.${type}.collection.Search.result.empty`)} {filter}
            </div>
          )}
        {collections
          ?.filter((item) => item.name.includes(filter))
          ?.filter((collection) => {
            const collectionExist = nodes?.find((id) => id === collection.id)
            return !collectionExist
          })
          ?.map((item, index) => {
            return (
              <ListItemButton
                onClick={() => {
                  setSelected(item);
                }}
                key={index}
                selected={selected?.id === item.id}
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            );
          })}
      </List>
      <div className="mt-2">
        <Button onClick={async () => {
          let collection
          if (type === 'product') {
            const { data } = await createProductCollection({
              variables: {
                data: {
                  name: ''
                }
              }
            })
            collection = data?.createOneProductCollection
          } else if (type === 'video') {
            const { data } = await createVideoCollection({
              variables: {
                data: {
                  name: ''
                }
              }
            })
            collection = data?.createOneVideoCollection
          } else {
            const { data } = await createPageCollection({
              variables: {
                data: {
                  name: ''
                }
              }
            })
            collection = data?.createOnePageCollection
          }
          const currentJson = query.serialize();

          const newJson = addCollection({
            currentJson,
            collectionId: collection?.id,
            websiteId: websiteData?.id,
            type: type,
            addItemIndex,
          });
          deserialize(newJson);
          setView(null);
          if (collection?.id) {
            setEditingCollection(collection?.id)
            selectNode(collection?.id)
            setView('collection_info')
            // setEditMode(true);
          }
          // setView(`new_${type}_collection`)
        }}>
          + {t(`WebsiteAdmin.DesignPage.AddItem.${type}.collection.Access.AddBlock`)}
        </Button>
      </div>
      <div className="bottom-6">
        <Button onClick={() => setView('add_item')}>
          &lt; {t('WebsiteAdmin.DesignPage.AddItem.block.Access.back')}
        </Button>
      </div>
      <div className="text-center mt-8">
        <Button
          variant="contained"
          disabled={!selected}
          onClick={async () => {
            const currentJson = query.serialize();

            const newJson = addCollection({
              currentJson,
              collectionId: selected?.id,
              websiteId: permissionData?.Website,
              type,
              addItemIndex,
            });

            deserialize(newJson);

            setView('collection_info');
            setEditingCollection(selected.id)
            // setEditPart('collection_basic')
            // setEditMode(true);
            selectNode(selected?.id)

          }}
        >
          <img className="mr-2" src="/icons/check-white.svg" />
          {t('WebsiteAdmin.DesignPage.AddItem.block.Access.buttonSubmit')}
        </Button>
      </div>
    </div>
  );
};
export default CollectionPicker