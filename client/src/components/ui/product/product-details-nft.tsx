import Image from 'next/image';
import BackButton from '@components/ui/back-button';
import { AddToCart } from '@components/ui/product/add-to-cart/add-to-cart';
import usePrice from '@utils/use-price';
import { useTranslation } from 'next-i18next';
import { getVariations } from '@utils/get-variations';
import { useState, useEffect } from 'react';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import Truncate from '@components/ui/truncate-scroll';
import { scroller, Element } from 'react-scroll';
import VariationPrice from './product-details/product-variant-price';
import ProductAttributes from './product-details/product-attributes';
import { useCustomer } from '@contexts/customer.context';
import { useSettings } from '@contexts/settings.context';
import { Modal, Grid, Backdrop, Fade, Box } from '@mui/material';
import { usePreparePurchaseMutation, useUpdateOrderMutation, useUpdateOneOrderMutation } from '@generated';
import { useContractWrite, usePrepareContractWrite, useConnect, useNetwork } from 'wagmi';

import { themes } from '@themes/index';
import { useAdminMintNftMutation } from '@generated';
import PolygonSingleEditionMintableAbi from '@web3/contractsData/polygon-SingleEditionMintable.json';

import Link from 'next/link'
import { useAccount } from 'wagmi';
import web3 from 'web3'
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';

import { GraphQLClient } from 'graphql-request';
import {
  useConnectModal,
} from '@rainbow-me/rainbowkit';
import { Network, Alchemy } from "alchemy-sdk";
import AccessContents from './access-contents'
import IncludeContents from './include-contents'
const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_API_KEY, // Replace with your Alchemy API Key.
  network: Network.MATIC_MAINNET, // Replace with your network.
};

const alchemy = new Alchemy(settings);

const graphqlRequest = async (query, variables) => {
  const accessToken = localStorage.getItem('accessToken');
  const graphQLClient = new GraphQLClient('https://api.zora.co/graphql');
  const result = await graphQLClient.request(query, variables);
  return result;
};


type Props = {
  product: any;
  variant?: 'defaultView' | 'modalView';
};

const ProductDetails: React.FC<Props> = ({ loading, view, setView, product, productData, orderedProduct, nftBought }) => {
  const {
    name,
    image, //could only had image we need to think it also
    description,
    unit,
    gallery,
    editionAddress,
    // shop,
  } = product ?? {};
  const [processingTransaction, setProcessingTransaction] = useState(false)
  const [step, setStep] = useState(null)
  const [preparePurchase] = usePreparePurchaseMutation()
  const { openConnectModal } = useConnectModal()
  const [updateOrder] = useUpdateOrderMutation()
  const [updateOneOrder] = useUpdateOneOrderMutation()
  const { t } = useTranslation('common');
  const galleryWithImage = [image, ...gallery ? gallery : []];
  const [focusedImage, setFocusImage] = useState(gallery?.[0] ?? null);
  const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
  const { price, basePrice, discount } = usePrice({
    amount: product?.price,
    baseAmount: product?.sale_price,
  });
  const { customer } = useCustomer();
  const { chain } = useNetwork();

  const { address } = useAccount();
  const { themeColor, currency, slug: websiteSlug, id, walletAddress } = useSettings();
  const [order, setOrder] = useState(null);
  const [adminMintNft] = useAdminMintNftMutation();
  // const { connectAsync: connectToklaytn } = useConnect({
  //   connector: new InjectedConnector(),
  //   chainId: 4,
  //   onSettled(data, error, variables, context) {
  //     console.log('connect to klaytn settled: ', data);
  //   },
  // });
  // const { connectAsync: connectToPolygon } = useConnect({
  //   connector: new InjectedConnector(),
  //   chainId: 137,
  //   onSettled(data, error, variables, context) {
  //     console.log('connect to polygon settled: ', data);
  //   },
  // });

  // const { data: stripeDate } = useStripeEnabledQuery({
  //   variables: {
  //     websiteSlug: websiteSlug,
  //   },
  //   skip: !websiteSlug,
  // });
  const variations = getVariations(product?.variations);

  const isSelected = !isEmpty(variations)
    ? !isEmpty(attributes) && Object.keys(variations).every((variation) => attributes.hasOwnProperty(variation))
    : true;
  let selectedVariation: any = {};
  if (isSelected) {
    selectedVariation = product?.variation_options?.find((o: any) => {
      const options = JSON.parse(o?.options);
      return isEqual(options.map((v: any) => v.value).sort(), Object.values(attributes).sort());
    });
    if (selectedVariation) {
      Object.keys(selectedVariation).map((key) => {
        if (!Number.isNaN(parseFloat(selectedVariation[key]))) {
          selectedVariation[key] = parseFloat(selectedVariation[key]);
        }
      });
    }
  }

  const scrollDetails = () => {
    scroller.scrollTo('details', {
      smooth: true,
      offset: -80,
    });
  };
  const outOfStock = product?.editionSize - product?.editionMinted === 0 ? true : false
  const disabled = outOfStock || processingTransaction || !editionAddress

  // const args = [
  //   walletAddress,
  //   web3.utils.toWei(order?.applicationFee && order?.storageFee ? `${order?.applicationFee + order?.storageFee}` : '0'),
  //   web3.utils.toWei(order?.amount ? `${order?.amount - (order?.applicationFee + order?.storageFee)}` : '0'),
  //   order?.id,
  //   {
  //     gasLimit: 1300000,
  //     value:
  //       web3.utils.toWei(order?.amount ? `${order?.amount}` : '0')
  //   },
  // ]

  const { config: polygonConfig } = usePrepareContractWrite({
    address: product?.editionAddress,
    abi: PolygonSingleEditionMintableAbi.abi,
    functionName: 'purchase',
    enabled: walletAddress && order?.id && product?.website?.chain?.name === 'Polygon' && product?.price && processingTransaction,
    args: [order?.id, {
      value: web3.utils.toWei(product?.price ? `${product?.price}` : '0'),
      gasLimit: 1300000,
    }],
    onSettled(data, error) {
      console.log('Settled', { data, error });
    },
  });

  const { config: klaytnConfig } = usePrepareContractWrite({
    address: product?.editionAddress,
    abi: PolygonSingleEditionMintableAbi.abi,
    functionName: 'purchase',
    enabled: walletAddress && order?.id && product?.website?.chain?.name === 'Klaytn' && product?.price && processingTransaction,
    args: [{
      value: web3.utils.toWei(product?.price ? `${product?.price}` : '0'),
      gasLimit: 1300000,
    }],
    onSettled(data, error) {
      console.log('Settled', { data, error });
    },
  });

  async function onSuccess(success) {
    console.log('Success', success);
    if (success?.hash) {
      setStep(2)
      await updateOneOrder({
        variables: {
          where: {
            id: order.id
          },
          data: {
            transactionHash: {
              set: success?.hash
            },
            orderStatus: {
              set: 'processing'
            }
          }
        }
      })
      const receipt = await success?.wait();
      console.log(receipt);
      setStep(3)

      // await updateOrder({
      //   variables: {
      //     orderId: order.id,
      //     transactionHash: success.hash
      //   },
      // });
      // if (customer?.id) {
      //   await refetchOrderedProduct();
      // }
      setProcessingTransaction(false)
      // setStep(4)
      window.location.reload()
    }
  }

  const {
    data: polygonContractData,
    isLoading: polygonIsLoading,
    isSuccess: polygonIsSuccess,
    write: polygonWrite,
  } = useContractWrite({
    ...polygonConfig,
    onError(error) {
      setProcessingTransaction(false)

      console.log('Error', error);
    },
    onSuccess,
    onMutate({ args, overrides }) {
      console.log('Mutate', { args, overrides });
    },
  });

  const {
    data: klaytnContractData,
    isLoading: klaytnIsLoading,
    isSuccess: klaytnIsSuccess,
    write: klaytnWrite,
  } = useContractWrite({
    ...klaytnConfig,
    onError(error) {
      setProcessingTransaction(false)

      console.log('Error', error);
    },
    onSuccess,
    onMutate({ args, overrides }) {
      console.log('Mutate', { args, overrides });
    },
  });


  const execPurchase = async () => {
    setProcessingTransaction(true)
    const { data } = await preparePurchase({
      variables: {
        productId: product?.id,
        customerId: customer?.id,
        websiteSlug,
        paymentAddress: address,
      },
    });
    if (data?.preparePurchase?.id) {
      setOrder(data?.preparePurchase);
    }
    setStep(1)
  };

  useEffect(() => {
    // console.log(order?.amount ? web3.utils.toWei(`${order?.amount}`) : '0', order?.applicationFee ? web3.utils.toWei(`${order.applicationFee}`) : '0')
    if (!polygonIsLoading && !klaytnIsLoading && !polygonContractData &&
      !klaytnContractData && order?.id && processingTransaction) {
      if (product?.website?.chain?.name === 'Polygon') {
        polygonWrite?.()
      } else if (product?.website?.chain?.name === 'Klaytn') {
        klaytnWrite?.()
      }
    }
  }, [order, klaytnWrite, polygonWrite, polygonContractData, klaytnContractData, polygonIsLoading, klaytnIsLoading, product]);

  return (
    <article className="rounded-lg bg-light">

      <div className="p-6 lg:px-8">
        <BackButton />
      </div>
      <div className="flex flex-col md:flex-row">
        <div style={{ maxWidth: '600px' }} className="md:w-1/2 p-6 lg:px-8">
          <div className="product-gallery h-full relative">
            {discount && (
              <div
                className="rounded-full text-xs leading-6 font-semibold px-3 bg-accent-300 font-accent-900 text-white absolute top-4 end-4 z-10"
                style={{ backgroundColor: themes[themeColor].accent50, color: themes[themeColor].accent900 }}
              >
                {discount}
              </div>
            )}

            {!!galleryWithImage?.length ? (
              <div>
                <Image
                  className="rounded-xl"
                  src={focusedImage?.original ?? galleryWithImage[0]?.original ?? '/product-placeholder.svg'}
                  width="100%"
                  height="100%"
                  layout="responsive"
                  objectFit="cover"
                  alt={name!}
                  loader={({ src }) => { return src }}
                />
                <Grid container spacing={2} style={{ marginTop: '0px' }}>
                  {galleryWithImage.map((item: Record<string, any>) => {
                    return (
                      <Grid key={item?.id} item xs={3}>
                        <Image
                          className="rounded-xl cursor-pointer"
                          src={item?.original ?? '/product-placeholder.svg'}
                          alt={name!}
                          width="100%"
                          height="100%"
                          layout="responsive"
                          objectFit="cover"
                          onClick={() => {
                            setFocusImage(item);
                          }}
                          loader={({ src }) => { return src }}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Image
                  className="rounded-xl"
                  src={image?.original ?? '/product-placeholder.svg'}
                  alt={name}
                  width={600}
                  height={600}
                  loader={({ src }) => { return src }}
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col flex-grow items-start p-6 lg:px-8">
          <div className="w-full">
            <h1 className="font-semibold text-lg md:text-xl xl:text-2xl tracking-tight text-heading">
              {name}
            </h1>
            <div className="mt-3 md:mt-4 text-body text-sm  leading-7">
              {t('edition-address')}:&nbsp;{editionAddress ? editionAddress : t('edition-address-preparing')}
            </div>

            {unit && isEmpty(variations) && (
              <span className="text-sm font-normal text-body mt-2 md:mt-3 block">{unit}</span>
            )}

            {description && (
              <div className="mt-3 md:mt-4 text-body text-sm  leading-7">
                <Truncate character={450} onClick={scrollDetails}>
                  {description}
                </Truncate>
              </div>
            )}

            <div className="my-5 md:my-10 flex items-center">
              {!isEmpty(variations) ? (
                <VariationPrice
                  selectedVariation={selectedVariation}
                  minPrice={product.min_price}
                  maxPrice={product.max_price}
                />
              ) : (
                <span className="flex items-center">
                  {/* <ins
                    className="text-2xl md:text-3xl font-semibold no-underline"
                    style={{ color: themes[themeColor].accent900 }}
                  >
                    <span className="uppercase">{currency}</span> {(basePrice ? basePrice : price).replace('$', '')}
                  </ins>
                  {discount && (
                    <del className="text-sm md:text-base font-normal text-muted  ms-2">
                      <span className="uppercase">{currency}</span> {price.replace('$', '')}
                    </del>
                  )} */}
                  {!product?.isExternalNft && <div className="text-sm md:text-base font-normal text-muted  ms-2 flex">
                    {/* <span className="uppercase">{currency}</span> */}
                    <span style={{ marginRight: '5px' }}>{product?.price}</span>
                    {product?.website?.chain?.iconUrl ? <img src={product?.website?.chain?.iconUrl} alt={product?.website?.chain?.name} /> : product?.website?.chain?.name}

                  </div>}
                </span>
              )}
            </div>

            <div>
              <ProductAttributes variations={variations} attributes={attributes} setAttributes={setAttributes} />
            </div>

            {product?.isExternalNft ? <div className="mt-4 md:mt-6 flex flex-col lg:flex-row items-center">
              <div className="mb-3 lg:mb-0 w-full">

                {nftBought && (
                  <button
                    disabled
                    className="py-4 px-5 w-full flex items-center justify-center text-sm lg:text-base font-light rounded text-white bg-accent hover:bg-accent-hover transition-colors duration-300 focus:outline-none focus:bg-accent-hover border !bg-gray-300 hover:!bg-gray-300 border-border-400 !text-body cursor-not-allowed"
                  >
                    <span className="flex-1">{t('text-purchased')}</span>
                  </button>
                )}
                {product?.externalUrl && (<Link href={product.externalUrl}>
                  <button
                    className={"my-3 py-4 px-5 w-full flex items-center justify-center text-sm lg:text-base font-light rounded text-white bg-accent hover:bg-accent-hover transition-colors duration-300 focus:outline-none focus:bg-accent-hover"}
                  >
                    <span className="flex-1">{t('text-explore')}</span>
                  </button></Link>)}

              </div>
            </div> : <div className="mt-4 md:mt-6 flex flex-col lg:flex-row items-center">
              <div className="mb-3 lg:mb-0 w-full">

                {!editionAddress || loading ? <button
                  disabled
                  className="py-4 px-5 w-full flex items-center justify-center text-sm lg:text-base font-light rounded text-white bg-accent hover:bg-accent-hover transition-colors duration-300 focus:outline-none focus:bg-accent-hover border !bg-gray-300 hover:!bg-gray-300 border-border-400 !text-body cursor-not-allowed"
                >
                  <span className="flex-1">{t('edition-address-preparing')}</span>
                </button> : orderedProduct || nftBought ? (
                  <button
                    disabled
                    className="py-4 px-5 w-full flex items-center justify-center text-sm lg:text-base font-light rounded text-white bg-accent hover:bg-accent-hover transition-colors duration-300 focus:outline-none focus:bg-accent-hover border !bg-gray-300 hover:!bg-gray-300 border-border-400 !text-body cursor-not-allowed"
                  >
                    <span className="flex-1">{t('text-purchased')}</span>
                  </button>
                ) : address ? (
                  // <AddToCart
                  //   data={product}
                  //   variant="big"
                  //   variation={selectedVariation}
                  //   disabled={selectedVariation?.is_disable || !isSelected}
                  // />
                  <button
                    onClick={async () => {
                      await execPurchase();
                    }}
                    disabled={disabled}
                    className="py-4 px-5 w-full flex items-center justify-center text-sm lg:text-base font-light rounded text-white bg-accent hover:bg-accent-hover transition-colors duration-300 focus:outline-none focus:bg-accent-hover"
                  >
                    {processingTransaction ? t('text-loading') : t('text-mint')}
                    {/* <PlusIcon className="w-5 h-5 stroke-2" /> */}
                  </button>
                ) : (<button
                  disabled
                  className="py-4 px-5 w-full flex items-center justify-center text-sm lg:text-base font-light rounded text-white bg-accent hover:bg-accent-hover transition-colors duration-300 focus:outline-none focus:bg-accent-hover border !bg-gray-300 hover:!bg-gray-300 border-border-400 !text-body cursor-not-allowed"
                >
                  <span className="flex-1">{t('text-connect-wallet')}</span>
                </button>)}
                {product?.externalUrl && (
                  <Link href={product.externalUrl}>
                    <button className="my-3 py-4 px-5 w-full flex items-center justify-center text-sm lg:text-base font-light rounded text-white bg-accent hover:bg-accent-hover transition-colors duration-300 focus:outline-none focus:bg-accent-hover" >
                      <span className="flex-1">{t('text-explore')}</span>
                    </button>
                  </Link>)}
              </div>
            </div>}
            {!orderedProduct && !nftBought && product && (
              <IncludeContents product={product} setView={setView} />
            )}
          </div>
        </div>
      </div >

      {
        (orderedProduct || nftBought) && productData && (
          <AccessContents setView={setView} productData={productData} />
        )
      }

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
            {t('product-purchase.processingTransactionTitle')}
          </Typography>
          <Typography sx={{ mt: 2 }}>
            {t('product-purchase.processingTransactionDescription')}
          </Typography>
          <div><Checkbox disabled checked={step > 0} />{t('product-purchase.processingTransactionStep1')}</div>
          <div><Checkbox disabled checked={step > 1} />{t('product-purchase.processingTransactionStep2')}</div>
          <div><Checkbox disabled checked={step > 2} />{t('product-purchase.processingTransactionStep3')}</div>
          {/* <div><Checkbox disabled checked={step > 3} />{t('product-purchase.processingTransactionStep4')}</div> */}
        </Box>
      </Modal>
    </article >
  );
};

export default ProductDetails;
