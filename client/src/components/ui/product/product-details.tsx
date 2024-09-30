import Image from 'next/image';
import BackButton from '@components/ui/back-button';
import { AddToCart } from '@components/ui/product/add-to-cart/add-to-cart';
import usePrice from '@utils/use-price';
import { useTranslation } from 'next-i18next';
import { getVariations } from '@utils/get-variations';
import { useState } from 'react';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import Truncate from '@components/ui/truncate-scroll';
import { scroller, Element } from 'react-scroll';
import VariationPrice from './product-details/product-variant-price';
import ProductAttributes from './product-details/product-attributes';
import { useFindManyOrderedProductQuery } from '@generated';
import { useCustomer } from '@contexts/customer.context';
import { useSettings } from '@contexts/settings.context';
import { Modal, Grid, Backdrop, Fade, Box } from '@mui/material';
import { useQuery, gql } from '@apollo/client';
import { useStripeEnabledQuery, useServerMintMutation, usePrepareStripePurchaseMutation } from '@generated';
import web3 from 'web3'
import Iconify from 'admin/src/components/Iconify';
import { useAccount } from 'wagmi';
import AccessContents from './access-contents'
import IncludeContents from './include-contents'
import { themes } from '@themes/index';

type Props = {
  product: any;
  variant?: 'defaultView' | 'modalView';
};

const ProductDetails: React.FC<Props> = ({ loading, view, setView, product, orderedProduct, productData, nftBought }) => {
  let {
    name,
    image, //could only had image we need to think it also
    description,
    unit,
    gallery,
    editionAddress,
    // shop,
  } = product ?? {};
  console.log('prodyct ::: ', product)
  const [processingTransaction, setProcessingTransaction] = useState(false)

  const { customer } = useCustomer();
  const { t } = useTranslation('common');
  // const galleryWithImage = [image, ...gallery];
  const galleryWithImage = [image, ...gallery?.length > 0 ? gallery : []];

  const [focusedImage, setFocusImage] = useState(gallery?.[0]);
  const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
  const { price, basePrice, discount } = usePrice({
    amount: product?.price,
    baseAmount: product?.sale_price,
  });
  const { address } = useAccount()
  const website = useSettings();
  const [serverMint] = useServerMintMutation()
  const [prepareStripePurchase] = usePrepareStripePurchaseMutation()

  const { slug: websiteSlug } = useSettings();
  const { data: stripeDate } = useStripeEnabledQuery({
    variables: {
      websiteSlug: websiteSlug,
    },
    skip: !websiteSlug,
  });

  const outOfStock = product?.editionSize - product?.editionMinted === 0 ? true : false
  const disabled = outOfStock || processingTransaction || !editionAddress

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

  const [customWalletAddress, setCustomWalletAddress] = useState(null)

  return (
    <article className="rounded-lg bg-light">
      <div className="p-6 lg:px-8">
        <BackButton />
      </div>
      <div className="flex flex-col md:flex-row">
        <div style={{ maxWidth: '600px' }} className="md:w-1/2 p-6 lg:px-8">
          <div className="product-gallery h-full relative">
            {discount && (
              <div className="rounded-full text-xs leading-6 font-semibold px-3 bg-accent-300 font-accent-900 text-light absolute top-4 end-4 z-10"
                style={{ backgroundColor: themes[website?.themeColor].accent50, color: themes[website?.themeColor].accent900 }}>
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
                          loader={({ src }) => { return src }}

                          onClick={() => {
                            setFocusImage(item);
                          }}
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
            <h1 className="font-semibold text-lg md:text-xl xl:text-2xl tracking-tight text-heading ">{name}</h1>
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
              ) :
                (<div><span className='mr-1'>{`${product?.price}`}</span>
                  <span>{website?.paymentMethod === 'crypto' ? website?.chain?.iconUrl ? <img src={website?.chain?.iconUrl} alt={website?.chain?.name} /> : website?.chain?.name : website?.currencyCode ? website?.currencyCode : 'usd'}</span>
                </div>)
                // (
                //   <span className="flex items-center">
                //     <ins className="text-2xl md:text-3xl font-semibold no-underline" style={{ color: themes[themeColor].accent900 }}>
                //       <span className="uppercase">{currency}</span> {(basePrice ? basePrice : price).replace("$", "")}
                //     </ins>
                //     {discount && <del className="text-sm md:text-base font-normal text-muted  ms-2"><span className="uppercase">{currency}</span> {price.replace("$", "")}</del>}
                //   </span>
                // )
              }
            </div>

            <div>
              <ProductAttributes variations={variations} attributes={attributes} setAttributes={setAttributes} />
            </div>

            <div className="mt-4 md:mt-6 flex flex-col lg:flex-row items-center">
              <div className="mb-3 lg:mb-0 w-full">
                {stripeDate?.stripeEnabled ? (!editionAddress || loading ? <div className="mt-4 md:mt-6 flex flex-col lg:flex-row items-center">
                  <div className="mb-3 lg:mb-0 w-full">
                    <button
                      disabled
                      className="py-4 px-5 w-full flex items-center justify-center text-sm lg:text-base font-light rounded text-light bg-accent hover:bg-accent-hover transition-colors duration-300 focus:outline-none focus:bg-accent-hover border !bg-gray-300 hover:!bg-gray-300 border-border-400 !text-body cursor-not-allowed"
                    >
                      <span className="flex-1">{t('edition-address-preparing')}</span>
                    </button>
                  </div>
                </div> :
                  orderedProduct || nftBought ? (
                    <button
                      disabled
                      className="py-4 px-5 w-full flex items-center justify-center text-sm lg:text-base font-light rounded text-light bg-accent hover:bg-accent-hover transition-colors duration-300 focus:outline-none focus:bg-accent-hover border !bg-gray-300 hover:!bg-gray-300 border-border-400 !text-body cursor-not-allowed"
                    >
                      <span className="flex-1">{t('text-purchased')}</span>
                    </button>
                  ) : customer ? (
                    // <AddToCart
                    //   data={product}
                    //   variant="big"
                    //   variation={selectedVariation}
                    //   disabled={selectedVariation?.is_disable || !isSelected}
                    // />
                    <button
                      onClick={async () => {
                        setProcessingTransaction(true)
                        const result = await prepareStripePurchase({
                          variables: {
                            productId: product.id,
                            websiteSlug,
                            customerId: customer?.id
                          }
                        })
                        window.location.assign(result.data.prepareStripePurchase.session.url)
                      }}
                      disabled={disabled}
                      className="py-4 px-5 w-full flex items-center justify-center text-sm lg:text-base font-light rounded text-light bg-accent hover:bg-accent-hover transition-colors duration-300 focus:outline-none focus:bg-accent-hover"
                    >
                      <span className="flex-1">{processingTransaction ? t('text-loading') : t('text-purchase')}</span>
                    </button>
                  ) : (
                    <button
                      disabled
                      className="py-4 px-5 w-full flex items-center justify-center text-sm lg:text-base font-light rounded text-light bg-accent hover:bg-accent-hover transition-colors duration-300 focus:outline-none focus:bg-accent-hover border !bg-gray-300 hover:!bg-gray-300 border-border-400 !text-body cursor-not-allowed"
                    >
                      <span className="flex-1">{t('text-login')}</span>
                    </button>
                  )
                ) : (
                  []
                )}

              </div>

            </div>
            {orderedProduct?.minted || nftBought ?
              <div className="mt-4 md:mt-6 flex flex-col lg:flex-row items-center">
                <div className="mb-3 lg:mb-0 w-full">
                  <button
                    disabled
                    className="py-4 px-5 w-full flex items-center justify-center text-sm lg:text-base font-light rounded text-light bg-accent hover:bg-accent-hover transition-colors duration-300 focus:outline-none focus:bg-accent-hover border !bg-gray-300 hover:!bg-gray-300 border-border-400 !text-body cursor-not-allowed"
                  >
                    <span className="flex-1">{t('text-minted')}</span>
                  </button>
                </div>
              </div> :
              <div className="mt-4 md:mt-6 flex flex-col lg:flex-row items-center"><div className="mb-3 lg:mb-0 w-full">
                {address ? orderedProduct ?
                  <button
                    disabled={disabled}
                    onClick={async () => {
                      setProcessingTransaction(true)
                      const result = await serverMint({
                        variables: {
                          orderedProductId: orderedProduct.id,
                          walletAddress: address,
                        }
                      })
                      window.location.reload()
                    }}
                    className="py-4 px-5 w-full flex items-center justify-center text-sm lg:text-base font-light rounded text-light bg-accent hover:bg-accent-hover transition-colors duration-300 focus:outline-none focus:bg-accent-hover"
                  >
                    <span className="flex-1">{processingTransaction ? t('text-loading') : t('text-mint')}</span>
                  </button> : <></> : <button
                    disabled
                    className="py-4 px-5 w-full flex items-center justify-center text-sm lg:text-base font-light rounded text-light bg-accent hover:bg-accent-hover transition-colors duration-300 focus:outline-none focus:bg-accent-hover border !bg-gray-300 hover:!bg-gray-300 border-border-400 !text-body cursor-not-allowed"
                  >
                  <span className="flex-1">{t('text-connect-wallet')}</span>
                </button>}

              </div>
              </div>}
            {!orderedProduct && !nftBought && product && (
              <IncludeContents product={product} setView={setView} />
            )}

          </div>
        </div>
      </div>

      {(orderedProduct || nftBought) && productData && (
        <AccessContents productData={productData} setView={setView} />
      )}
    </article>
  );
};

export default ProductDetails;
