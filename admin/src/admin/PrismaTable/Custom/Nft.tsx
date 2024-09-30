import React, { useState, useEffect } from 'react';

import Spinner from '../../components/Spinner';
import DynamicTable from '../dynamicTable';
import { GET_SCHEMA } from '../../SchemaQueries';
import { ModelTableProps, ContextProps } from '../../index';
import { TableContext, defaultSettings } from '../Context';
import defaultLanguage from '../language';

import { useCreateOnePageMutation, usePermissionQuery, useUpdateOneWebsiteMutation } from 'generated';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import Grid from '@mui/material/Grid';

import Fade from '@mui/material/Fade';

import Button from '@mui/material/Button';
import styled from 'styled-components';
import { ConnectButton } from '@rainbow-me/rainbowkit';

import IconButton from '@mui/material/IconButton';

import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import { useNft } from 'contexts/NftContext';
import { useEnterAdminMutation, UpdateOneWebsiteMutation, CreateOnePageMutation } from 'generated';
import { useTranslation } from 'next-i18next'
import { defaultContent } from 'templates/defaultContents/page';
import { useStripeAccountStatusQuery, useUpdateOneProductMutation } from 'generated';
import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router';
const menu = { "id": "id", "slug": "slug", "cards": [], "columns": [{ "id": "home", "name": "home", "cardIds": [] }, { "id": "blog", "name": "blog", "cardIds": [] }, { "id": "about", "name": "about", "cardIds": [] }, { "id": "team", "name": "team", "cardIds": [] }, { "id": "nft", "name": "nft", "cardIds": [] }], "columnOrder": ["home", "nft", "blog", "team", "about"] }
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const NextStep = ({ createdProduct, permissionData }) => {
  const { t } = useTranslation('admin');
  const [item, setItem] = useState(null);
  const [info, setInfo] = useState(null);
  const { data: pageData } = useQuery(gql`query findManyPage($where: PageWhereInput, $orderBy: [PageOrderByWithRelationInput!], $cursor: PageWhereUniqueInput, $skip: Int, $take: Int) {
    findManyPage(where: $where, orderBy: $orderBy, cursor: $cursor, skip: $skip, take: $take) {
      id
      name
      slug
      description
      imageObj
    }
  }`, {
    variables: {
      where: {
        website: {
          id: {
            equals: permissionData?.Website,
          }
        },
        isIndex: {
          equals: true
        }
      },
    },
    skip: !permissionData?.Website,
  })
  // const { data: pageData, refetch } = useFindManyPageQuery({
  //   variables: {
  //     where: {
  //       website: {
  //         id: {
  //           equals: permissionData?.permission?.Organization,
  //         }
  //       },
  //       isIndex: {
  //         equals: true
  //       }
  //     },
  //   },
  //   skip: !permissionData?.permission?.Organization,
  // });
  const indexPage = pageData?.findManyPage?.[0]
  const router = useRouter()
  const gridStyle = {
    background: '#F6F7F8',
    borderRadius: '10px',
    padding: '28px 10px',
    margin: '10px',
    cursor: 'pointer',
    textAlign: 'center',
    border: '1px solid #F6F7F8',
  };
  return (
    <Modal
      open={createdProduct}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
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
        <div className="w-full flex justify-between">
          <Typography
            sx={{
              color: '#4B5971',
              fontSize: '16px',
            }}
          >
            {t('product.completeModal.nextStep')}
          </Typography>

        </div>

        <div>
          <Grid container>
            <Grid xs={12} md={6} item>
              <div
                onClick={() => {
                  window.location.assign(`/${router.locale}/admin/Organization/Organization/DesignPage?id=${indexPage?.id}`)
                }}
                style={{ ...gridStyle, ...(item === 'design' && { borderColor: 'black' }) }}
              >
                {/* <AutoAwesomeMosaicIcon /> */}
                <div style={{ width: '60px' }} className="flex align-center mx-auto mb-4">
                  <img src="/icons/block.svg" />
                </div>
                <div>{t('product.completeModal.toDesignPage')}</div>
              </div>
              <div className="pl-2 text-sm">
                <div className="flex items-start cursor-pointer" onClick={() => setInfo('design')}>
                  <img className="mr-1 mt-1" src="/icons/info-white.svg" />
                  <span>{t('product.completeModal.toDesignPage.title')}</span>
                </div>
                <div
                  className={`border-l-4 rounded-l-[2px] pl-2 mt-1 ${info === 'design' ? '' : 'hidden'
                    }`}
                >
                  {t('product.completeModal.toDesignPage.description')}
                </div>
              </div>
            </Grid>
            <Grid xs={12} md={6} item>
              <div
                onClick={() => {
                  window.location.assign(`/${router.locale}/admin/Organization/Organization/Product/?view=${createdProduct?.id}`)
                }}
                style={{
                  ...gridStyle,
                  ...(item === 'info' && { borderColor: 'black' }),
                }}
              >
                {/* <CollectionsIcon /> */}
                <div style={{ width: '60px' }} className=" flex align-center mx-auto mb-4">
                  <img src="/icons/file.svg" />
                </div>
                <div>{t('product.completeModal.toInfoPage')}</div>
              </div>
              <div className="pl-2 text-sm">
                <div
                  className="flex items-start cursor-pointer"
                  onClick={() => setInfo('info')}
                >
                  <img className="mr-1 mt-1" src="/icons/info-white.svg" />
                  <span>{t('product.completeModal.toInfoPage.title')}</span>
                </div>
                <div
                  className={`border-l-4 pl-2 mt-1 ${info === 'info' ? '' : 'hidden'
                    }`}
                >
                  {t('product.completeModal.toInfoPage.description')}
                </div>
              </div>
            </Grid>
          </Grid>
        </div>

        {/* <div className="text-center mt-8">
          <SubmitButton variant="contained" onClick={() => {
            if (item === 'design') {
              window.location.assign(`/${router.locale}/admin/Organization/Organization/DesignPage?id=${indexPage?.id}`)
              // router.push(`/admin/Organization/Organization/DesignPage?id=${indexPage?.id}`)
            } else if (item === 'info') {
              window.location.assign(`/${router.locale}/admin/Organization/Organization/Product/?view=${createdProduct?.id}`)
              // router.push(`/admin/Organization/Organization/Product/?view=${createdProduct?.id}`)
            }
          }} disabled={!item}>
            <img className="mr-2" src="/icons/check-white.svg" />
            {t('product.completeModal.go')}
          </SubmitButton>
        </div> */}
      </Box>
    </Modal>
  );
};
const SubmitButton = styled(Button)(({ theme }) => ({
  '&:disabled': {
    color: 'white',
    background: '#B8B8B8',
  },
}));

const PrismaTable: React.FC<ModelTableProps> = ({ children, organizationData, permissionData, language, model, ui, ...rest }) => {
  // const { data, loading } = useQuery<{ getSchema: ContextProps['schema'] }>(GET_SCHEMA);
  const { createNFT, processingTransaction, step, address, chain, organization, createdProduct } = useNft();
  const mergedLanguage = { ...defaultLanguage(), ...language };
  const { t } = useTranslation(['admin'])
  const [updateProduct] = useUpdateOneProductMutation()
  const { pathname } = useRouter()


  // if (website?.paymentMethod === 'stripe' && stripeAccountStatusData?.stripeAccountStatus?.accountLink && stripeAccountStatusData?.stripeAccountStatus?.accountLink !== 'access') {
  //   return (<div>
  //     <Typography variant="h4" component="h2">{t('product.setupPaymentWarningTitle')}
  //     </Typography>
  //     <div style={{ marginTop: '20px', marginBottom: '20px' }}><a target='_blank' href={`https://${website.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}`}>https://{website.slug}.{process.env.NEXT_PUBLIC_COOKIE_DOMAIN}</a>
  //     </div>
  //     <div style={{ marginTop: '20px', marginBottom: '20px' }}>{t('product.setupPaymentWarningDescription')}
  //     </div>
  //     <div><a target='_blank' href={stripeAccountStatusData?.stripeAccountStatus?.accountLink.url}><Button>{t('verify')}</Button></a></div>
  //   </div>)
  // }
  // if ((!address || (address !== website?.walletAddress))) {
  //   return (<div>
  //     <Typography variant="h4" component="h2">{t('product.connectWalletWarningTitle')}</Typography>
  //     <div style={{ marginTop: '20px', marginBottom: '20px' }}>{t('product.connectWalletWarningDescription')}
  //     </div>

  //     <ConnectButton />
  //   </div>)
  // }
  const onSaveCreate = ({ model, data, setCreateModal, refetchTable, getData, parent }) => {
    // if (pathname.toLowerCase().includes('item')) {
    //   updateProduct({
    //     variables: {
    //       data: {
    //         productType: {
    //           set: "item"
    //         }
    //       }
    //     }
    //   })
    // } else if (pathname.toLowerCase().includes('booking')) {
    //   updateProduct({
    //     variables: {
    //       data: {
    //         productType: {
    //           set: "booking"
    //         }
    //       }
    //     }
    //   })
    // } else if (pathname.toLowerCase().includes('booking')) {
    //   updateProduct({
    //     variables: {
    //       data: {
    //         productType: {
    //           set: "nft"
    //         }
    //       }
    //     }
    //   })
    // }
    if (model === 'NFT') {
      if (!data?.isExternalNft) {
        if (address === organization?.walletAddress) {
          createNFT(data);
        } else {
          alert(t('wrongAddressAlert'))
        }
      }
    }
    setCreateModal(false);
    parent?.updateRecord && parent.updateRecord();
    getData();
  };
  return (
    <TableContext.Provider
      value={{
        organizationData,
        permissionData,
        schema: permissionData?.schema ?? {
          models: [],
          enums: [],
        },
        ...(rest as any),
        lang: mergedLanguage,
        onSaveCreate,
      }}
    >
      <DynamicTable enableBack={true} ui={ui} model={model}>
        {children}
      </DynamicTable>
      <NextStep permissionData={permissionData} createdProduct={createdProduct} />
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

    </TableContext.Provider>
  );
};

PrismaTable.defaultProps = defaultSettings;
export default PrismaTable


