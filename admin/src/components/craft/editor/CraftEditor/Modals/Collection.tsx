import React, { useState, useEffect, useContext } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { useEditor } from '@craftjs/core';
import { CraftContext } from '../../CraftContext';
import Modal from '@mui/material/Modal';

import Backdrop from '@mui/material/Backdrop';

import Fade from '@mui/material/Fade';

import CloseIcon from '@mui/icons-material/Close';
import {
  usePermissionQuery,
  useUpdateOneProductCollectionMutation,
  useUpdateOnePageCollectionMutation,
  useUpdateOneVideoCollectionMutation,

} from 'generated';
import { useQuery, gql } from '@apollo/client';
import { useTranslation } from 'next-i18next';
import Spinner from 'admin/components/Spinner';


const Collection = ({ }) => {
  const { setCollectionUpdated, editPart, setEditPart, loading, setLoading, setNextPage, setView } = useContext(CraftContext);
  const { t } = useTranslation('design');
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

  const [updatePageCollection] = useUpdateOnePageCollectionMutation();
  const [updateProductCollection] = useUpdateOneProductCollectionMutation();

  const [updateVideoCollection] = useUpdateOneVideoCollectionMutation();

  const { data: permissionData } = usePermissionQuery();

  useEffect(() => {
    if (selected?.size > 0) {
      const id = Array.from(selected)[0];
      setSelectedId(id);
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


  const { data: videoData, refetch: refetchVideo } = useQuery(
    gql`
      query findManyVideo($where: VideoWhereInput) {
        findManyVideo(where: $where) {
          id
          name
          videoCollections {
            id
            name
          }
          imageObj
        }
      }
    `,
    {
      variables: {
        where: {
          website: {
            id: {
              equals: permissionData?.permission?.Website,
            },
          },
          active: {
            equals: true,
          },
        },
      },
      skip: collectionType !== 'video' || !permissionData?.permission?.Website,
    }
  );

  const { data: pageData, refetch: refetchPage } = useQuery(
    gql`
      query findManyPage($where: PageWhereInput) {
        findManyPage(where: $where) {
          id
          name
          pageCollections {
            id
            name
          }
          imageObj
        }
      }
    `,
    {
      variables: {
        where: {
          website: {
            id: {
              equals: permissionData?.permission?.Website,
            },
          },
          active: {
            equals: true,
          },
        },
      },
      skip: collectionType !== 'page' || !permissionData?.permission?.Website,
    }
  );
  const { data: productData, refetch: refetchProduct } = useQuery(
    gql`
      query findManyProduct($where: ProductWhereInput) {
        findManyProduct(where: $where) {
          id
          name
          productCollections {
            id
            name
          }
          imageObj
        }
      }
    `,
    {
      variables: {
        where: {
          website: {
            id: {
              equals: permissionData?.permission?.Website,
            },
          },
          // editionAddress: {
          //   not: {
          //     equals: null
          //   }
          // },
          active: {
            equals: true,
          },
        },
      },
      skip: collectionType !== 'product' || !permissionData?.permission?.Website,
    }
  );
  const data = collectionType === 'video' ? videoData?.findManyVideo.map((video) => {
    return {
      ...video,
      collections: video.videoCollections,
    };
  }) :
    collectionType === 'page'
      ? pageData?.findManyPage.map((page) => {
        return {
          ...page,
          collections: page.pageCollections,
        };
      })
      : productData?.findManyProduct.map((product) => {
        return {
          ...product,
          collections: product.productCollections,
        };
      });

  const onClose = () => {
    selectNode(null);
    setSelectedId(null);
    setEditPart(null);
  }
  return (<div>
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
    <div style={{ margin: '10px' }}>
      {collectionType === 'product' && <Button onClick={() => {
        setNextPage('/admin/Website/Website/Product')
        setView('exit_design')
      }} size='large'>{t('manage')}</Button>}

      {collectionType === 'video' && <Button onClick={() => {
        setNextPage('/admin/Website/Website/Video')
        setView('exit_design')
      }} size='large'>{t('manage')}</Button>}

      {collectionType === 'page' && <Button onClick={() => {
        setView('new_page')
      }} size='large'>+ {t('new')}</Button>}</div>

    {selectedId && (
      <Grid container rowSpacing={2} columnSpacing={{ xs: 2 }}>
        {data?.map((item, index) => (
          <Grid xs={12} md={3} item key={index} style={{ border: 'black' }}>
            <Card
              style={{
                backgroundImage: `url('${item.imageObj?.url}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '14px',
                backgroundColor: '#C1C1C1',
                height: '100%',
              }}
            >
              <CardHeader style={{ paddingBottom: '75%' }} />
              <CardContent
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.87)', padding: '8px 12px' }}
              >
                <Typography variant="h6" style={{ color: '#212B36' }}>
                  {item.name}
                </Typography>
                <div className="text-center">
                  {!item?.collections?.find(
                    (_collection) => _collection.id === selectedId
                  ) && (
                      <button
                        style={{ color: '#39AB97' }}
                        onClick={async () => {
                          setLoading(true)
                          if (collectionType === 'product') {
                            await updateProductCollection({
                              variables: {
                                where: {
                                  id: selectedId,
                                },
                                data: {
                                  products: {
                                    connect: [
                                      {
                                        id: item.id,
                                      },
                                    ],
                                  },
                                },
                              },
                            });
                          } else if (collectionType === 'video') {
                            await updateVideoCollection({
                              variables: {
                                where: {
                                  id: selectedId,
                                },
                                data: {
                                  videos: {
                                    connect: [
                                      {
                                        id: item.id,
                                      },
                                    ],
                                  },
                                },
                              },
                            });
                          } else {
                            await updatePageCollection({
                              variables: {
                                where: {
                                  id: selectedId,
                                },
                                data: {
                                  pages: {
                                    connect: [
                                      {
                                        id: item.id,
                                      },
                                    ],
                                  },
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
                          setLoading(false)
                          // await refetch();
                          // await refetchCollection();
                        }}
                      >
                        {t('WebsiteAdmin.DesignPage.AddItem.page.collection.Add.add')}
                      </button>
                    )}
                  {item?.collections?.find(
                    (_collection) => _collection.id === selectedId
                  ) && (
                      <button
                        style={{ color: '#CB6767' }}
                        onClick={async () => {
                          setLoading(true)
                          if (collectionType === 'page') {
                            await updatePageCollection({
                              variables: {
                                where: {
                                  id: selectedId,
                                },
                                data: {
                                  pages: {
                                    disconnect: [
                                      {
                                        id: item.id,
                                      },
                                    ],
                                  },
                                },
                              },
                            });
                          } else if (collectionType === 'video') {
                            await updateVideoCollection({
                              variables: {
                                where: {
                                  id: selectedId,
                                },
                                data: {
                                  videos: {
                                    disconnect: [
                                      {
                                        id: item.id,
                                      },
                                    ],
                                  },
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
                                  products: {
                                    disconnect: [
                                      {
                                        id: item.id,
                                      },
                                    ],
                                  },
                                },
                              },
                            });
                          }

                          // await refetch();
                          // await refetchCollection();
                          setCollectionUpdated(selectedId);
                          if (collectionType === 'page') {
                            await refetchPage();
                          } else {
                            await refetchProduct();
                          }
                          setLoading(false)
                        }}
                      >
                        {t('WebsiteAdmin.DesignPage.AddItem.page.collection.Add.remove')}
                      </button>
                    )}
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    )}
  </div>
  );
};

export default Collection