import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import cn from 'classnames';
import { AddToCart } from '@components/ui/product/add-to-cart/add-to-cart';
import { useUI } from '@contexts/ui.context';
import usePrice from '@utils/use-price';
import { getVariations } from '@utils/get-variations';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import Spinner from '@components/ui/loaders/spinner/spinner';
import { Waypoint } from 'react-waypoint';
import Truncate from '@components/ui/truncate-scroll';
import ProductAttributes from '@components/ui/product/product-details/product-attributes';
import VariationPrice from '@components/ui/product/product-details/product-variant-price';
import { useTranslation } from 'next-i18next';
import { ROUTES } from '@utils/routes';
import { useModalAction } from '@components/ui/modal/modal.context';
import { useFindManyOrderedProductQuery } from '../../generated';
import Link from 'next/link';
import { useCustomer } from '@contexts/customer.context';
import { Grid } from '@mui/material';
import ContnetItems from './content-items';

import { useSettings } from '@contexts/settings.context';
import { useStripeEnabledQuery } from '@generated';

const ProductDetailsModalView = ({ card }: { card: any }) => {
  const { url, name, slug, image, description, unit, gallery = [], quantity, min_price, max_price } = card ?? {};
  const router = useRouter();
  const [focusedImage, setFocusImage] = useState(gallery[0]);
  const { t } = useTranslation('common');

  const { showModalStickyBar, hideModalStickyBar, displayModalStickyBar } = useUI();
  const { closeModal } = useModalAction();
  const { customer }: Record<string, any> = useCustomer();
  const { data: orderedProductData } = useFindManyOrderedProductQuery({
    variables: {
      where: {
        product: {
          id: {
            equals: card.id,
          },
        },
        order: {
          orderStatus: {
            in: 'completed',
            // not: {
            //   equals: 'pending' as any,
            // },
          },
          customer: {
            id: {
              equals: customer?.id,
            },
          },
          deleted: {
            not: {
              equals: true,
            },
          },
        },
      },
    },
    skip: !customer?.id || !card.id || card.itemType !== 'product',
  });

  const { slug: websiteSlug } = useSettings();
  const { data: stripeDate } = useStripeEnabledQuery({
    variables: {
      websiteSlug: websiteSlug,
    },
    skip: !websiteSlug,
  });

  const orderedProduct = orderedProductData?.findManyOrderedProduct?.[0];
  const loading = false;
  const navigate = (path: string) => {
    router.push(path);
    closeModal();
  };

  const { price, basePrice, discount } = usePrice({
    amount: card?.price!,
    baseAmount: card?.sale_price!,
  });

  const [attributes, setAttributes] = useState<{ [key: string]: string }>({});

  const variations = getVariations(card?.variations);

  const isSelected = !isEmpty(variations)
    ? !isEmpty(attributes) && Object.keys(variations).every((variation) => attributes.hasOwnProperty(variation))
    : true;

  let selectedVariation: any = {};

  if (isSelected) {
    selectedVariation = card?.variation_options?.find((o: any) => {
      const options = JSON.parse(o?.options);
      return isEqual(options.map((v: any) => v.value).sort(), Object.values(attributes).sort());
    });
    if (selectedVariation) {
      Object.keys(selectedVariation).map((key) => {
        if (!Number.isNaN(parseFloat(selectedVariation[key]))) {
          selectedVariation = {
            ...selectedVariation,
            [key]: parseFloat(selectedVariation[key]),
          };
        }
      });
    }
  }

  const onWaypointPositionChange = ({ currentPosition }: Waypoint.CallbackArgs) => {
    if (!currentPosition || currentPosition === 'above') {
      showModalStickyBar();
    }
  };

  if (loading || !card)
    return (
      <div className="w-96 flex justify-center items-center h-96 bg-light relative">
        <Spinner text={t('common:text-loading')} />
      </div>
    );

  return (
    <article className="bg-light w-full max-w-6xl">
      {/* Sticky bar */}
      <div
        className={cn(
          'max-w-6xl h-auto w-full hidden md:block bg-light fixed top-0 start-1/2 transform -translate-x-1/2 z-50 px-8 py-6 shadow transition-all duration-300',
          {
            'invisible opacity-0 -translate-y-1/2': !displayModalStickyBar,
            'visible opacity-100 translate-y-0': displayModalStickyBar,
          },
        )}
      >
        <div className="flex items-center">
          <div
            className={cn(
              'border border-border-200 border-opacity-70 rounded relative flex items-center justify-center overflow-hidden flex-shrink-0',
              {
                'w-28 h-28': isEmpty(variations),
                'w-40 lg:w-52 h-40 lg:h-52': !isEmpty(variations),
              },
            )}
          >
            <Image
              src={image?.original! ?? '/product-placeholder.svg'}
              alt={name!}
              className="product-image"
              width="100%"
              height="100%"
              layout="responsive"
              objectFit="contain"
            />
          </div>

          <div className="px-8 flex flex-col justify-center me-auto overflow-hidden">
            <h3
              className="font-semibold text-lg lg:text-xl tracking-tight text-heading truncate cursor-pointer transition-colors hover:text-accent"
              onClick={() => {
                switch (card?.itemType) {
                  case 'product':
                    navigate(`${ROUTES.PRODUCT}/${slug}`);
                    break;
                  case 'link':
                    window.location.assign(url);
                    break;
                  default:
                    break;
                }
              }}
              title={name!}
            >
              {name}
            </h3>

            {card?.itemType === 'product' && (
              <>
                {unit && isEmpty(variations) ? (
                  <span className="text-sm font-normal text-body mt-2 block">{unit}</span>
                ) : (
                  <span className="flex items-center mt-2">
                    {!isEmpty(variations) && (
                      <VariationPrice selectedVariation={selectedVariation} minPrice={min_price} maxPrice={max_price} />
                    )}
                  </span>
                )}
              </>
            )}
          </div>

          {card?.itemType === 'product' && (
            <div
              className={cn('w-full flex flex-shrink-0')}
            >
              {isEmpty(variations) && (
                <span className="me-8 flex items-center ">
                  <ins className="text-xl lg:text-2xl font-semibold text-accent no-underline">
                    {basePrice ? basePrice : price}
                  </ins>
                  {discount && <del className="text-sm lg:text-base font-normal text-muted ms-2">{price}</del>}
                </span>
              )}

              <div className="w-full">
                <div
                  className={cn('flex flex-col overflow-y-auto justify-center')}
                >
                  <ProductAttributes variations={variations} attributes={attributes} setAttributes={setAttributes} />
                </div>

                <div className={cn({ 'mt-4': !isEmpty(variations) })}>
                  {
                    stripeDate?.stripeEnabled ?
                      (
                        card?.productType === 'digital' ? (
                          <>
                            {orderedProduct ? (
                              <div className="bg-red-500 rounded text-xs text-light px-1 py-1 truncate">Purchased</div>
                            ) : (
                              <AddToCart variant="argon" data={card} />
                            )}
                          </>
                        ) : (
                          <>
                            <AddToCart
                              data={card}
                              variant="big"
                              variation={selectedVariation}
                              disabled={selectedVariation?.is_disable || !isSelected}
                            />
                          </>
                        )
                      ) : []
                  }
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* End of sticky bar */}

      {/* Main content */}
      <div className="flex flex-col md:flex-row border-b border-border-200 border-opacity-70">
        <div className="md:w-1/2 p-5 pt-10 md:p-10 md:pr-5 lg:p-14 lg:pr-7 xl:p-16 xl:pr-8">
          <div className="product-gallery h-full relative">
            {discount && (
              <div className="rounded-full text-xs leading-6 font-semibold px-3 bg-yellow-500 text-light absolute top-4 end-4 z-10">
                {discount}
              </div>
            )}

            {!!gallery?.length ? (
              <div>
                <Image
                  className="rounded-xl"
                  src={focusedImage?.original ?? '/product-placeholder.svg'}
                  alt={name!}
                  width="100%"
                  height="100%"
                  layout="responsive"
                  objectFit="contain"
                />
                <Grid container spacing={2} style={{ marginTop: '0px' }}>
                  {gallery.map((item: Record<string, any>) => {
                    return (
                      <Grid key={item.id} item xs={3}>
                        <Image
                          className="rounded-xl cursor-pointer"
                          src={item?.original ?? '/product-placeholder.svg'}
                          alt={name!}
                          width="100%"
                          height="100%"
                          layout="responsive"
                          objectFit="contain"
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
              <div className="w-full flex items-center justify-center rounded-xl overflow-hidden">
                <Image
                  className="rounded-xl"
                  src={image?.original ?? '/product-placeholder.svg'}
                  alt={name!}
                  width={600}
                  height={600}
                />
              </div>
            )}
          </div>
        </div>
        {/* End of product image / gallery */}
        <div className="flex flex-col flex-grow items-start p-5 md:p-10 md:pl-5 lg:p-14 lg:pl-7 xl:p-16 xl:pl-8">
          <Waypoint
            onLeave={showModalStickyBar}
            onEnter={hideModalStickyBar}
            onPositionChange={onWaypointPositionChange}
          >
            <div className="flex w-full flex-col items-start overflow-hidden">
              <div className="w-full">
                <h1
                  className="font-semibold text-lg md:text-xl xl:text-2xl tracking-tight text-heading cursor-pointer transition-colors hover:text-accent"
                  onClick={() => {
                    switch (card?.itemType) {
                      case 'product':
                        navigate(`${ROUTES.PRODUCT}/${slug}`);
                        break;
                      case 'link':
                        window.location.assign(url);
                        break;
                      default:
                        break;
                    }
                  }}
                  title={name!}
                >
                  {name}
                </h1>

                {unit && isEmpty(variations) && (
                  <span className="text-sm font-normal text-body mt-2 md:mt-3 block">{unit}</span>
                )}

                {description && (
                  <div className="mt-3 md:mt-4 text-body text-sm leading-7">
                    <Truncate character={400} hideButton={true}>
                      {description}
                    </Truncate>
                  </div>
                )}

                {card?.itemType === 'product' && (
                  <div className="my-5 md:my-10 flex items-center">
                    {!isEmpty(variations) ? (
                      <VariationPrice selectedVariation={selectedVariation} minPrice={min_price} maxPrice={max_price} />
                    ) : (
                      <span className="flex items-center">
                        <ins className="text-2xl md:text-3xl font-semibold text-accent no-underline">
                          {basePrice ? basePrice : price}
                        </ins>
                        {/* use del price markup when product has discount price */}
                        {discount && <del className="text-sm md:text-base font-normal text-muted ms-2">{price}</del>}
                      </span>
                    )}
                  </div>
                )}

                {/* end of del price markup  */}

                {card?.itemType === 'product' && (
                  <>
                    <div>
                      <ProductAttributes
                        variations={variations}
                        attributes={attributes}
                        setAttributes={setAttributes}
                      />
                    </div>

                    <div className="mt-4 md:mt-6 flex flex-col lg:flex-row items-center">
                      {
                        stripeDate?.stripeEnabled ?
                          (
                            card?.productType === 'digital' && orderedProduct ? (
                              <button
                                onClick={() => {
                                  navigate(`${ROUTES.PRODUCT}/${slug}`);
                                }}
                                className="my-4 py-4 px-5 w-full flex items-center justify-center text-sm lg:text-base font-light rounded text-light bg-accent hover:bg-accent-hover transition-colors duration-300 focus:outline-none focus:bg-accent-hover"
                              >
                                <span>{t('text-view-purchased')}</span>
                              </button>
                            ) : customer ? (
                              <div className="mb-3 lg:mb-0 w-full">
                                <AddToCart
                                  data={card}
                                  variant="big"
                                  variation={selectedVariation}
                                  disabled={selectedVariation?.is_disable || !isSelected}
                                />
                              </div>
                            ) : (
                              <span>{t('text-please-login')}</span>
                            )
                          ) : []
                      }
                    </div>

                    <div className="mt-10 text-xl" style={{ color: '#4B5971' }}>
                      <img className="cursor-pointer inline align-middle" width={18} src="/icons/package.png" />
                      <span className="ml-2 inline align-middle">{t('text-contents')}</span>
                    </div>
                    <ContnetItems list={card.audios} type="audio" />
                    <ContnetItems list={card.links} type="link" />
                    <ContnetItems list={card.videos} type="video" />
                  </>
                )}
                {card?.itemType === 'link' && (
                  <Link href={card?.url}>
                    <button className="my-4 py-4 px-5 w-full flex items-center justify-center text-sm lg:text-base font-light rounded text-light bg-accent hover:bg-accent-hover transition-colors duration-300 focus:outline-none focus:bg-accent-hover">
                      <span>{t('text-go')}</span>
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </Waypoint>
        </div>
      </div>
      {/*card?.itemType === 'link' && <iframe className="m-auto" width="80%" height="1000px" src={card?.link?.url} />*/}
      {card?.itemType === 'audio' && <audio className="m-auto" controls src={card?.audio?.url} />}
      {card?.itemType === 'video' && <video className="m-auto" width="80%" controls src={card?.video?.url} />}
    </article>
  );
};

export default ProductDetailsModalView;
