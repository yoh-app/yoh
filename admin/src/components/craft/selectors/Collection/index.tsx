import React, { useEffect, useContext, useState } from 'react';
import { useNode, useEditor } from '@craftjs/core';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';

import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { RenderEdit } from '../../editor/RenderEdit';
import styled from 'styled-components';
import { useQuery, gql } from '@apollo/client';
import { CraftContext } from '../../editor/CraftContext';
import Iconify from '../../../../components/Iconify';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { RenderSection } from '../../editor/RenderSection';
import Link from 'next/link';
import { themes } from '../../../../assets/client_themes_map';
// import { useFindJobCollectionQuery, useFindManyDepartmentCollectionQuery, useFindManyAttachmentGroupQuery } from '../../../.././generated';
import { CollectionSettings } from './CollectionSettings'
import useResponsive from '../../../../hooks/useResponsive';


const TagStyle = styled('div')(({ theme }) => ({
  background: 'rgba(0,0,0,0.54)',
  color: '#ffffff',
  border: '1px solid #ffffff',
  width: '25px',
  height: '25px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
export const Collection = (props: any) => {
  const { t } = useTranslation('design');
  const router = useRouter();
  const isDesktop = useResponsive('up', 'sm');

  const {
    connectors: { connect },
    node,
  } = useNode((node) => ({
    node,
  }));
  const { setModalView, modalView, collectionUpdated, setCollectionUpdated, permissionData, websiteData, inEdit, setEditingCollection, setNextPage, setView } = useContext(CraftContext);
  const [displayHead, updateDisplayHead] = useState(null);
  const { enabled, query } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  const { data: videoCollectionData, refetch: refetchVideoCollection } = useQuery(gql`query findFirstVideoCollection($where: VideoCollectionWhereInput) {
    findFirstVideoCollection(where: $where) {
      id
      name
      description
      videos {
        slug
        id
        name
        description
        imageObj
      }
    }
  }`, {
    variables: {
      where: {
        id: {
          equals: props?.id
        },
        active: {
          equals: true
        },
        website: {
          id: { equals: websiteData?.id }
        },
      }
    },
    skip: !props?.id || props?.type !== 'video'
  })


  const { data: productCollectionData, refetch: refetchProductCollection } = useQuery(gql`query findFirstProductCollection($where: ProductCollectionWhereInput) {
    findFirstProductCollection(where: $where) {
      id
      name
      description
      products {
        slug
        id
        name
        description
        price
        salePrice
        imageObj
      }
    }
  }`, {
    variables: {
      where: {
        id: {
          equals: props?.id
        },
        active: {
          equals: true
        },
        website: {
          id: { equals: websiteData?.id }
        },
      }
    },
    skip: !props?.id || props?.type !== 'product'
  })

  const { data: pageCollectionData, refetch: refetchPageCollection } = useQuery(gql`query findFirstPageCollection($where: PageCollectionWhereInput) {
    findFirstPageCollection(where: $where) {
      id
      name
      description
      pages {
        id
        name
        description
        slug
        isExternalLink
        externalUrl
        password
        products {
          id
          name
        }
        website {
          themeColor
        }
        imageObj
      }
    }
  }`, {
    variables: {
      where: {
        id: {
          equals: props?.id
        },
        active: {
          equals: true
        },
        website: {
          id: { equals: websiteData?.id }
        },
      }
    },
    skip: !props?.id || props?.type !== 'page'
  })

  const collectionData =
    props?.type === 'video'
      ? {
        ...videoCollectionData?.findFirstVideoCollection,
        displayStyle: props?.displayStyle,
        items: videoCollectionData?.findFirstVideoCollection?.videos
      }
      : props?.type === 'page'
        ? {
          ...pageCollectionData?.findFirstPageCollection,
          displayStyle: props?.displayStyle,
          items: pageCollectionData?.findFirstPageCollection?.pages
        }
        : {
          ...productCollectionData?.findFirstProductCollection,
          displayStyle: props?.displayStyle,
          items: productCollectionData?.findFirstProductCollection.products
        }


  useEffect(() => {
    async function refetchCollection() {
      if (collectionUpdated === props?.id) {
        if (props?.type === 'page') {
          await refetchPageCollection();
        } else if (props?.type === 'video') {
          await refetchVideoCollection();
        } else {
          await refetchProductCollection();
        }
        setCollectionUpdated(null)
      }
    }
    refetchCollection();
  }, [collectionUpdated]);

  // if ((props?.type === 'product' && !productCollectionData?.findManyProductCollection?.[0]) || (props?.type === 'page' && !pageCollectionData?.findManyPageCollection?.[0])) {
  //   return null
  // }

  const isFirstSection = query.node(node.node.parent).id === 'ROOT' &&
    query.node(node.node.parent).node.nodes[0] === node.id

  const textShadow = `0px 0px 2px rgba(0,0,0,${(props?.shadow || 0) / 100})`
  const fontSize = `${props?.fontSize}px`
  const padding = `${isFirstSection && props?.padding?.[0] < 150 ? '150' : props?.padding[0]}px ${props?.padding[1]}px ${props?.padding[2]}px ${props?.padding[3]}px`;
  const textAlign = props?.textAlign
  const margin = `${props?.margin[0]}px ${props?.margin[1]}px ${props?.margin[2]}px ${props?.margin[3]}px`
  const color = `rgba(${props?.color?.r},${props?.color?.g},${props?.color?.b},${props?.color?.a})`
  const fontWeight = props?.fontWeight
  const style = {
    textShadow,
    fontSize,
    textAlign,
    margin,
    color,
    fontWeight
  }

  const backgroundImage = props?.backgroundImage
  const backgroundColor = props?.backgroundColor
  const backgroundSet = props?.backgroundSet


  let backgroundStyle = {
    backgroundImage: `linear-gradient(to right, rgba(${backgroundColor?.r}, ${backgroundColor?.g}, ${backgroundColor?.b}, ${backgroundColor?.a}), rgba(${backgroundColor?.r}, ${backgroundColor?.g}, ${backgroundColor?.b}, ${backgroundColor?.a})), url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    padding
  }

  const ColGrid = ({ item, index, href, type, isModal }) => {
    const ContentCard = () =>
      <Link href={href}>
        <Card sx={{
          display: 'flex', borderRadius: '15px', position: 'relative',
          cursor: 'pointer',
        }}>

          <CardMedia
            component="img"
            sx={{ width: 100, height: 100, objectFit: 'cover', padding: '20px' }}
            image={item.imageObj?.url ?? '/images/placeholder.svg'}
            alt={item.name}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h6">
                {item.name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                {item.description}
              </Typography>
              {props?.type === 'product' && <Typography variant="h6" sx={{ fontSize: '16px', display: 'flex' }}>
                {/* <span style={{ textTransform: 'uppercase', marginRight: '8px' }}>
              {item?.website?.paymentMethod === 'crypto' ? item?.website?.chain?.iconUrl ? <img src={item?.website?.chain?.iconUrl} alt={item?.website?.chain?.name} /> : item?.website?.chain?.name : item?.website?.currencyCode ? item?.website?.currencyCode : 'usd'}
            </span> */}
                <span>{item.salePrice || item.price}</span>
              </Typography>}
            </CardContent>
            {/* <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
    <IconButton aria-label="previous">
      {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
    </IconButton>
    <IconButton aria-label="play/pause">
      <PlayArrowIcon sx={{ height: 38, width: 38 }} />
    </IconButton>
    <IconButton aria-label="next">
      {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
    </IconButton>
  </Box> */}
          </Box>

          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              display: 'flex',
              columnGap: '8px',
              padding: '16px',
            }}

          >
            {props?.type === 'product' ? <>
              {item?.videos.length ? (
                <TagStyle>
                  <Iconify icon={'icon-park-outline:film'} width={14} height={14} />
                </TagStyle>
              ) : (
                []
              )}
              {item?.pages.length ? (
                <TagStyle>
                  <Iconify icon={'ph:link-simple-bold'} width={14} height={14} />
                </TagStyle>
              ) : (
                []
              )}
              {item?.audios.length ? (
                <TagStyle>
                  <Iconify icon={'lucide:headphones'} width={14} height={14} />
                </TagStyle>
              ) : (
                []
              )}
              {item?.documents.length ? (
                <TagStyle>
                  <Iconify icon={'lucide:file-text'} width={14} height={14} />
                </TagStyle>
              ) : (
                []
              )}
              {item?.pictures.length ? (
                <TagStyle>
                  <Iconify icon={'lucide:image'} width={14} height={14} />
                </TagStyle>
              ) : (
                []
              )}</> : <>{item?.requests?.filter((request) => {
                return request?.requestStatus === 'active'
              }).length ? (
                <TagStyle>
                  <Iconify icon={'bi:badge-ad'} width={14} height={14} />
                </TagStyle>
              ) : (
                []
              )}
              {item?.products?.length ? (
                <TagStyle>
                  <Iconify icon={'material-symbols:image-rounded'} width={14} height={14} />
                </TagStyle>
              ) : (
                []
              )}
              {item?.password?.length ? (
                <TagStyle>
                  <Iconify icon={'icon-park-outline:unlock-one'} width={14} height={14} />
                </TagStyle>
              ) : (
                []
              )}</>}
          </div>
        </Card>
      </Link>

    return <Grid
      item
      key={index}
      style={{ width: isDesktop ? '500px' : '100%' }}
    >
      {isModal ? <a onClick={() => {
        const modalView = { ...item, type, status: 'purchased' }
        if (modalView.attachmentType === 'audio') {
          modalView.audioObj = modalView.attachmentObj
          modalView.audioPreviewObj = modalView.attachmentPreviewObj
        } else if (modalView.attachmentType === 'video') {
          modalView.videoObj = modalView.attachmentObj
          item.videoPreviewObj = modalView.attachmentPreviewObj
        } else if (item.attachmentType === 'document') {
          modalView.documentObj = modalView.attachmentObj
          modalView.documentPreviewObj = modalView.attachmentPreviewObj
        } else if (modalView.attachmentType === 'image') {
          modalView.imageObj = modalView.attachmentObj
          modalView.imagePreviewObj = modalView.attachmentPreviewObj
        }
        setModalView(modalView)
      }}><ContentCard /></a> :
        <ContentCard />
      }

    </Grid>
  }

  const RowGrid = ({ item, index, href, type, isModal }) => {

    const ContentCard = () => <Link href={href}>
      <Card
        sx={{
          cursor: 'pointer',
          position: 'relative',
          backgroundImage: `url('${item.imageObj?.url}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '14px',
          backgroundColor: '#C1C1C1',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid #ebebeb',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 20px 25px -5px rgb(0 0 0 / 10%), 0 8px 10px -6px rgb(0 0 0 / 10%)',
          },
        }}
      >
        <CardHeader sx={{ paddingBottom: '75%' }} />
        {props?.type === 'product' ? (
          <>
            {/* {item.price !== item.sale_price ? (
            <DiscountTagStyle themeColor={item.website.themeColor}>
              {`${Math.round(((item.price - item.sale_price) / item.price) * 100)}%`}
            </DiscountTagStyle>
          ) : (
            []
          )} */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                display: 'flex',
                columnGap: '8px',
                padding: '16px',
              }}
            >
              {item?.videos?.length ? (
                <TagStyle>
                  <Iconify icon={'icon-park-outline:film'} width={14} height={14} />
                </TagStyle>
              ) : (
                []
              )}
              {item?.pages?.length ? (
                <TagStyle>
                  <Iconify icon={'ph:link-simple-bold'} width={14} height={14} />
                </TagStyle>
              ) : (
                []
              )}
              {item?.audios?.length ? (
                <TagStyle>
                  <Iconify icon={'lucide:headphones'} width={14} height={14} />
                </TagStyle>
              ) : (
                []
              )}
              {item?.documents?.length ? (
                <TagStyle>
                  <Iconify icon={'lucide:file-text'} width={14} height={14} />
                </TagStyle>
              ) : (
                []
              )}
              {item?.pictures?.length ? (
                <TagStyle>
                  <Iconify icon={'lucide:image'} width={14} height={14} />
                </TagStyle>
              ) : (
                []
              )}
            </div>
            <CardContent
              sx={{ flexGrow: 1, color: '#ffffff', background: 'linear-gradient(0deg, rgba(89,81,81,1) 0%, rgba(255,255,255,0) 100%)' }}
              style={{ padding: '8px 12px' }}
            >
              <Typography variant="h6" sx={{ fontSize: '22px' }}>
                {item.name}
              </Typography>
              <Typography variant="h6" sx={{ fontSize: '16px', display: 'flex' }}>
                <span style={{ textTransform: 'uppercase', marginRight: '8px' }}>
                  {item?.website?.paymentMethod === 'crypto' ? item?.website?.chain?.iconUrl ? <img src={item?.website?.chain?.iconUrl} alt={item?.website?.chain?.name} /> : item?.website?.chain?.name : item?.website?.currencyCode ? item?.website?.currencyCode : 'usd'}
                </span>
                <span>{item.salePrice || item.price}</span>
              </Typography>
            </CardContent>
          </>
        ) : (
          <CardContent
            sx={{ flexGrow: 1, background: '#ffffff' }}
            style={{ padding: '8px 12px' }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                display: 'flex',
                columnGap: '8px',
                padding: '16px',
              }}
            >
              {item?.requests?.filter((request) => {
                return request?.requestStatus === 'active'
              }).length ? (
                <TagStyle>
                  <Iconify icon={'bi:badge-ad'} width={14} height={14} />
                </TagStyle>
              ) : (
                []
              )}
              {item?.nfts?.length ? (
                <TagStyle>
                  <Iconify icon={'material-symbols:image-rounded'} width={14} height={14} />
                </TagStyle>
              ) : (
                []
              )}
              {item?.password?.length ? (
                <TagStyle>
                  <Iconify icon={'icon-park-outline:unlock-one'} width={14} height={14} />
                </TagStyle>
              ) : (
                []
              )}
            </div>
            <Typography variant="h6" style={{ color: '#212B36' }}>
              {item.name}
            </Typography>
            <Typography style={{ color: '#212B36', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.description}</Typography>
          </CardContent>
        )}
      </Card>
    </Link>


    return <Grid
      xs={12}
      md={3}
      item
      key={index}
      style={{ border: 'black' }}
    >
      {isModal ? <a onClick={() => {
        const modalView = { ...item, type, status: 'purchased' }
        if (modalView.attachmentType === 'audio') {
          modalView.audioObj = modalView.attachmentObj
          modalView.audioPreviewObj = modalView.attachmentPreviewObj
        } else if (modalView.attachmentType === 'video') {
          modalView.videoObj = modalView.attachmentObj
          item.videoPreviewObj = modalView.attachmentPreviewObj
        } else if (item.attachmentType === 'document') {
          modalView.documentObj = modalView.attachmentObj
          modalView.documentPreviewObj = modalView.attachmentPreviewObj
        } else if (modalView.attachmentType === 'image') {
          modalView.imageObj = modalView.attachmentObj
          modalView.imagePreviewObj = modalView.attachmentPreviewObj
        }
        setModalView(modalView)
      }}><ContentCard /></a> :
        <ContentCard />
      }
    </Grid>
  }

  // backgroundStyle.padding = `${isFirstSection ? '150' : padding[0]}px ${padding[1]}px ${padding[2]}px ${padding[3]}px`;
  return (
    <div
      style={backgroundStyle}
      ref={connect}
    >
      {collectionData.name?.length > 0 && <div
        style={style}
      >
        {collectionData.name}
      </div>}

      {collectionData?.displayStyle === 'column' ? <Grid container direction='column' alignItems={'center'} className="px-3" rowSpacing={2} columnSpacing={2}>
        {
          collectionData?.items?.map((item, index) => {
            let href = props?.type === 'page'
              ? item?.isExternalLink && item?.externalUrl ? item?.externalUrl : `/pages/${item.slug}`
              : props?.type === 'video' ? `/videos/${item.slug}` : `/products/${item.slug}`

            if (inEdit) {
              href = process.env.NODE_ENV === 'production' ? `https://${websiteData?.slug}.${window?.location?.host}${href}` : `http://${websiteData?.slug}.${window?.location?.host}${href}`
            }
            // if (!enabled) {
            //   return (
            //     <a style={{ display: 'contents' }} href={href}>
            //       <ColGrid item={item} index={index} />
            //     </a>
            //   )
            // } else {
            return <ColGrid type={props.type} isModal={props?.type === 'attachment' && !enabled ? true : false} item={item} index={index} href={href} />
            // }
          })}
        {((enabled || inEdit) && collectionData?.items?.length === 0) && <Grid item xs={12} style={{ minHeight: '120px', color: '#212B36', fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {t(`WebsiteAdmin.DesignPage.edit.${props?.type}.collection`)}
        </Grid>}
      </Grid> : <Grid container justifyContent='center' className="px-3" rowSpacing={2} columnSpacing={{ xs: 2 }}>
        {
          collectionData?.items?.map((item, index) => {
            let href = props?.type === 'page'
              ? item?.isExternalLink && item?.externalUrl ? item?.externalUrl : `/pages/${item.slug}`
              : props?.type === 'video' ? `/videos/${item.slug}` : `/products/${item.slug}`
            if (inEdit) {
              href = process.env.NODE_ENV === 'production' ? `https://${websiteData?.slug}.${window?.location?.host}${href}` : `http://${websiteData?.slug}.${window?.location?.host}:3003${href}`
            }
            // if (!enabled) {
            //   return (
            //     <a style={{ display: 'contents' }} href={href}>
            //       <RowGrid item={item} index={index} />
            //     </a>
            //   )
            // } else {
            return <RowGrid type={props.type} isModal={props?.type === 'attachment' && !enabled ? true : false} item={item} index={index} href={href} />
            // }
          })}
        {((enabled || inEdit) && collectionData?.items?.length === 0) && <Grid item xs={12} style={{ minHeight: '120px', color: '#212B36', fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {t(`WebsiteAdmin.DesignPage.edit.${props?.type}.collection`)}
        </Grid>}
      </Grid>
      }
      {/* <RenderEdit /> */}
      <RenderSection />
    </div >
  );
};

const defaultProps = {
  fontSize: '30',
  textAlign: 'left',
  fontWeight: '700',
  color: { r: 92, g: 90, b: 90, a: 1 },
  backgroundColor: { r: 255, g: 255, b: 255, a: 1 },
  margin: [20, 20, 20, 20],
  shadow: 0,
  padding: [60, 60, 60, 60],
  displayStyle: 'row'
};


Collection.craft = {
  displayName: 'Collection',
  rules: {},
  props: defaultProps,
  custom: {
    src: '',
    className: '',
    htmlElement: 'div',
  },
  related: {
    toolbar: CollectionSettings,
  },
};
