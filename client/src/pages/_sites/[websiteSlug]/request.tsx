import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useEffect, useState } from 'react';
import prisma from 'admin/src/server/context/prisma';
import processWebsite from '@process/website';
import { useRouter } from 'next/router'
import { useContractWrite, usePrepareContractWrite, useAccount, useConnect, useNetwork, erc20ABI } from 'wagmi';
import c from '@web3/contractsData/arbitrum-Payments-address.json';
import PolygonPaymentsAddress from '@web3/contractsData/polygon-Payments-address.json';
import ArbitrumPaymentsAddress from '@web3/contractsData/arbitrum-Payments-address.json';

// import KlaytnPaymentsAddress from '@web3/contractsData/klaytn-Payments-address.json';
import ArbitrumPaymentsAbi from '@web3/contractsData/arbitrum-Payments.json';
// import KlaytnPaymentsAbi from '@web3/contractsData/klaytn-Payments.json';
import { utils } from "ethers";

import { useQuery, gql } from '@apollo/client'
import web3 from 'web3'
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Grid, Button as MuiButton, Card } from '@mui/material';

import Input from '@components/ui/input';
import { usePrepareRequestMutation } from '@generated'
import Button from '@components/ui/button';
import { useCustomer } from '@contexts/customer.context';

import Spinner from '@components/ui/loaders/spinner/spinner';

import { useTranslation } from 'next-i18next';
import { InjectedConnector } from 'wagmi/connectors/injected';
import Link from 'next/link'
import JoinButton from '@components/layout/navbar/join-button';


function paymentsAddressSmartContract(chain) {
  switch (chain?.id) {
    case 42161:
      return ArbitrumPaymentsAddress.address;
    case 137:
      return PolygonPaymentsAddress.address;
    default:
      return 0;
  }
}
export default function Home() {
  const { t } = useTranslation('common');
  const { t: tRequest } = useTranslation('request');
  const [processingTransaction, setProcessingTransaction] = useState(false)
  const { query, push, isFallback } = useRouter()
  const { address } = useAccount()
  const { customer } = useCustomer();
  const { chain } = useNetwork();

  const [usePrepareRequest] = usePrepareRequestMutation()
  const { data } = useQuery(gql`query findManyRequest(
    $where: RequestWhereInput
  ) {
    findManyRequest(where: $where) {
      id
      imageObj
      message
      name
      paid
      price
      subject
      description
      url
      requestStatus
      page {
        id
        slug
        name
        description
        imageObj
        website {
          id
          walletAddress
          name
          description
          imageObj
        }
      }
    }
  }
  `, {
    skip: !query?.requestId,
    variables: {
      where: {
        id: {
          equals: query?.requestId
        },
        active: {
          equals: true
        }
      }
    }
  })

  const request = data?.findManyRequest?.[0]

  const usdcContractAddress = "0xaf88d065e77c8cC2239327C5EDb3A432268e5831";

  const { config: approveConfig } = usePrepareContractWrite({
    address: usdcContractAddress,
    abi: erc20ABI,
    functionName: "approve",
    enabled: true,
    args: [
      ArbitrumPaymentsAddress.address as `0x${string}`,
      utils.parseUnits("1000", 6),
      // product?.price,
      // product?.website?.walletAddress,
      // website?.walletAddress,
      // product?.commissionFee
      // ,
      // {
      //   gasLimit: 1300000,
      //   // value: web3.utils.toWei(product?.price ? `${product?.price}` : '0'),
      //   // gasPrice: feeData.data?.gasPrice ? feeData.data?.gasPrice.mul('11').div('10') : undefined
      // },
    ],
    onSettled(data, error) {
      console.log("Settled allowance", { data, error });
    },
  });

  const { writeAsync: approveWriteAsync } = useContractWrite(approveConfig);



  const { config } = usePrepareContractWrite({
    address: paymentsAddressSmartContract(chain),
    abi: ArbitrumPaymentsAbi.abi,
    functionName: 'pay',
    enabled: true,
    args: [
      request?.price,
      request?.page?.website?.walletAddress,
      request?.page?.website?.walletAddress,
      0,
      // web3.utils.toWei(request?.price ? `${request?.price * 0.02}` : '0'),
      // web3.utils.toWei(request?.price ? `${request?.price - request?.price * 0.02}` : '0'),
      // request?.id,
      {
        gasLimit: 1300000,
        // value:
        //   web3.utils.toWei(request?.price ? `${request?.price}` : '0')
      },
    ],
    onSettled(data, error) {
      console.log('Settled', { data, error });
    },
  });

  async function onSuccess(success) {
    console.log('Success', success);
    if (success?.hash) {
      console.log(success?.hash);
      const receipt = await success?.wait();
      console.log(receipt);

      await axios.post('/api/requestPaid', {
        transactionHash: success?.hash,
        requestId: query?.requestId,
        walletAddress: address
      });
      setProcessingTransaction(false)
      push(`/pages/${request?.page?.slug}`)
    }
  }

  const {
    writeAsync: payWriteAsync,
    data: payWriteData
  } = useContractWrite({
    ...config,
    onError(error) {
      console.log('Error', error);
      setProcessingTransaction(false)
    },
    onSuccess,
    onMutate({ args, overrides }) {
      console.log('Mutate', { args, overrides });
    },
  });
  if (isFallback) {
    return <div className="flex justify-center items-center bg-light relative">
      <Spinner text='Loading' />
    </div>
  }
  // useEffect(() => {
  //   async function processRequest() {
  //     if (contractData?.hash) {
  //       console.log(contractData?.hash);
  //       const receipt = await contractData?.wait();
  //       console.log(receipt);

  //       await axios.post('/api/requestPaid', {
  //         transactionHash: contractData?.hash,
  //         requestId: query?.requestId,
  //         walletAddress: address
  //       });
  //       setProcessingTransaction(false)
  //       push(`/pages/${request?.page?.slug}`)
  //     }
  //   }
  //   processRequest();
  // }, [contractData]);
  const placeholderImage = `/assets/placeholder/products/product-list.svg`;
  return (
    <div style={{ textAlign: 'center' }}>
      {/* <div style={{ borderRadius: '5px', margin: '10px', border: '1px solid grey' }}>
        <h3>Pay Request</h3>
        <div>{request?.name}</div>
        <div>{request?.description}</div>
        <div>{request?.price}</div>
        <button style={{ border: '1px solid grey' }} onClick={() => {
          if (request?.requestStatus === 'processing') {
            setProcessingTransaction(true)
            write?.()
          }
        }}>pay</button>
      </div> */}
      <Grid style={{ marginTop: '100px' }} container justifyContent="center">
        <Grid item xs={12} md={6}>
          <div className="text-xl font-bold mb-2">{tRequest('request-invitation-form-title')}</div>
          <div className="text-sm text-gray-800 mb-2">
            {tRequest('request-invitation-form-description')}
            {/* <MuiButton style={{ color: '#4B5971', paddingTop: 0, paddingBottom: 0, textDecoration: 'underline' }}>
            <img className="cursor-pointer inline align-middle" width={14} src="/icons/information.png" />
            <span className="ml-1 inline align-middle">{tRequest('request-invitation-form-introduction')}</span>
          </MuiButton> */}
          </div>
          <Card
            className="mb-6 p-6"
            style={{
              border: '1px solid rgb(233 233 233)',
              borderRadius: '14px',
              boxShadow: 'rgb(165 165 165 / 10%) 0px 0px 10px',
            }}
          >
            <Input
              label={tRequest('request-label-status')}
              name="page"
              type="text"
              variant="outline"
              className="mb-5"
              value={tRequest(`request-label-status-${request?.requestStatus}`)}
              disabled
            />
            <Input
              label={t('text-request-page')}
              name="page"
              type="text"
              variant="outline"
              className="mb-5"
              value={request?.page?.name}
              disabled
            />
            <Input
              label={tRequest('request-label-subject')}
              name='subject'
              type="text"
              variant="outline"
              className="mb-5"
              disabled
              value={request?.subject}
            />
            <Input
              label={tRequest('request-label-message')}
              name='message'
              type="text"
              variant="outline"
              className="mb-5"
              value={request?.message}
              disabled
            />
            <Input
              name="days"
              label={tRequest('request-label-days')}
              type="number"
              variant="outline"
              className="mb-5"
              value={7}
              disabled
            />
            <Input
              label={<div style={{ display: 'flex' }}><span style={request?.page?.website?.paymentMethod === 'crypto' ? { lineHeight: '25px', marginRight: '5px' } : {}}>{tRequest('request-label-price')}</span>
                <span>{request?.page?.website?.paymentMethod === 'crypto' ? request?.page?.website?.chain?.iconUrl ? <img src={request?.page?.website?.chain?.iconUrl} alt={request?.page?.website?.chain?.name} /> : request?.page?.website?.chain?.name : request?.page?.website?.currencyCode ? ` (${request?.page?.website?.currencyCode})` : ' (usd)'}</span>
              </div>}
              name='price'
              type="number"
              variant="outline"
              className="mb-5"
              value={request?.price}
              disabled
            />
            {/* <Input
              label={tRequest('request-label-accept-before')}
              name='acceptBefore'
              value={request?.acceptBefore}
              type="date"
              variant="outline"
              className="mb-5"
              disabled
            /> */}
            {request?.imageObj && <img src={request?.imageObj?.url} />}
            <Input
              label={tRequest('request-label-name')}
              name='name'
              type="text"
              variant="outline"
              className="my-5"
              value={request?.name}
              disabled
            />
            <Input
              label={tRequest('request-label-description')}
              name='description'
              type="text"
              variant="outline"
              className="mb-5"
              disabled
              value={request?.description}
            />
            <Input
              label={tRequest('request-label-url')}
              name='url'
              type="text"
              variant="outline"
              className="mb-5"
              value={request?.url}
              disabled
            />
            {(true) ? (address && request?.requestStatus === 'processing') ? <MuiButton
              variant='outlined'
              className="w-full h-11 mt-8 sm:h-12"
              loading={processingTransaction}
              disabled={processingTransaction}
              onClick={async () => {
                setProcessingTransaction(true)
                await approveWriteAsync();
                await payWriteAsync();
              }}
            >
              {t('pay')}
            </MuiButton> : request?.requestStatus === 'processing' ? <MuiButton
              className="w-full h-11 mt-8 sm:h-12"
              disabled={true}
            >
              {t('connect-wallet')}
            </MuiButton> : <></> : (request?.requestStatus === 'processing' && customer?.id) ? <MuiButton
              variant='outlined'
              className="w-full h-11 mt-8 sm:h-12"
              loading={processingTransaction}
              disabled={processingTransaction}
              onClick={async () => {
                setProcessingTransaction(true)
                const result = await usePrepareRequest({
                  variables: {
                    requestId: request?.id
                  }
                })
                if (result?.data?.prepareRequest?.url) {
                  push(result?.data?.prepareRequest?.url)
                }
              }}
            >
              {t('pay')}
            </MuiButton> : <>{!customer ? <JoinButton /> : <></>}</>}


          </Card>
        </Grid>
      </Grid>

      <Modal
        open={processingTransaction}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
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
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {t('request.processingTransactionTitle')}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {t('request.processingTransactionDescription')}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}



export const getStaticPaths = async ({ locales }) => {
  // const websites = await prisma.website.findMany({
  //   where: {},
  // });
  // const paths = websites
  //   .map((website) =>
  //     locales.map((locale) => ({
  //       params: { websiteSlug: website.slug },
  //       locale, // Pass locale here
  //     })),
  //   )
  //   .flat();
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps = async ({ params, locale }) => {
  if (!params) throw new Error('No path parameters found');

  const { websiteSlug } = params;
  const website = await prisma.website.findUnique({
    where: {
      slug: websiteSlug,
    },
    include: {
      pages: {
        select: {
          id: true,
          name: true,
          description: true,
          slug: true,
          imageObj: true,
          isIndex: true,
          isExternalLink: true,
          externalUrl: true
        }
      },
    },
  });
  // const page = website?.pages?.find((page) => page.isIndex);

  if (!website)
    return {
      notFound: true,
      // revalidate: 10,
      props: {
        ...(await serverSideTranslations(locale, ['common', 'request'])),
      },
    };

  return {
    props: {
      website: processWebsite(website),
      // page: processPage({
      //   ...page,
      //   website,
      // }),
      ...(await serverSideTranslations(locale, ['common', 'request'])),
    },
    // revalidate: 20,
  };
};


// export const getServerSideProps = async (context: any) => {
//   const websiteSlug = context.req.headers.host.split('.')[0];

//   const website = await prisma.website.findUnique({
//     where: {
//       slug: websiteSlug,
//     },
//     include: {
//       pages: true,
//     },
//   });

//   return {
//     props: {
//       website: processWebsite(website),
//       ...(await serverSideTranslations(context.locale, ['common', 'request'])),
//     },
//   };
// };
