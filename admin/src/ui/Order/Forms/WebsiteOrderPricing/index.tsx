import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useFindUniqueOrderQuery } from 'generated';
import Label from 'components/ui/label';
import { Collapse, Button } from '@mui/material';
import { ArrowRight, ArrowDropDown } from '@mui/icons-material';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
const WebsiteOrderPricing = ({ action, register, errors, handleSubmit, setValue, getValues, watch, data }) => {
  const { t } = useTranslation(['admin']);
  const { data: orderData } = useQuery(
    gql`
      query findUniqueOrder($where: OrderWhereUniqueInput!) {
        findUniqueOrder(where: $where) {
          id
          applicationFee
          stripeFee
          storageFee
          delivery_fee
          orderStatus
          amount
          total
          discount
          sales_tax
          website {
            id
            chain
            currencyCode
            paymentMethod
            name
          }
          orderedProducts {
            id
            quantity
            name
            imageObj
            description
            price
            itemTotal
            product {
              id
              name
              slug
            }
            orderedAudios {
              id
              name
              description
              imageObj
              audioObj
            }
            orderedLinks {
              id
              name
              description
              imageObj
              url
            }
            orderedVideos {
              id
              name
              description
              imageObj
              videoObj
            }
          }
          coupon {
            name
            couponType
            amount_off
            percent_off
          }
        }
      }
    `,
    {
      variables: {
        where: {
          id: data?.id,
        },
      },
    },
  );
  const orderedData = orderData?.findUniqueOrder;

  const [open, setOpen] = useState(null);

  // const countTotal = () => {
  //   const amount = orderedData?.amount || 0;
  //   const applicationFee = orderedData?.applicationFee || 0;
  //   const storageFee = orderedData?.storageFee || 0;
  //   return amount - applicationFee - storageFee;
  // };
  return (
    <div style={{ height: '400px', overflow: 'scroll' }}>
      <div className="p-2">
        <Label>NFTs</Label>
        {orderedData?.orderedProducts?.map((orderedProduct) => {
          return (
            <div className="py-[6px] px-3 bg-gray-100 rounded-lg mb-3">
              <div
                className="flex cursor-pointer"
                style={{ alignItems: 'center' }}
                onClick={() => {
                  if (open) {
                    setOpen(null);
                  } else {
                    setOpen(orderedProduct.id);
                  }
                }}
              >
                <div>{open ? <ArrowDropDown /> : <ArrowRight />}</div>
                <div className="ml-2">{orderedProduct?.name}</div>
                <div className="ml-auto flex">
                  <span>{orderedProduct?.price}</span>
                  {orderedData?.website?.paymentMethod === 'crypto' ? (
                    orderedData?.website?.chain?.iconUrl ? (
                      <img
                        className="ml-1"
                        src={orderedData?.website?.chain?.iconUrl}
                        alt={orderedData?.website?.chain?.name}
                      />
                    ) : (
                      orderedData?.website?.chain?.name
                    )
                  ) : orderedData?.website?.currencyCode ? (
                    <>&nbsp;{orderedData?.website?.currencyCode}</>
                  ) : (
                    <>&nbsp;usd</>
                  )}
                </div>
              </div>
              <Collapse in={open === orderedProduct?.id} timeout="auto" unmountOnExit>
                <Link href={`/admin/Website/Website/Product?view=${orderedProduct?.product?.id}`}>
                  <Button>{t('order.browse')}</Button>
                </Link>
                {orderedProduct?.orderedAudios.length ? (
                  <div className="my-2" style={{ borderLeft: '2px solid #B8B8B8', paddingLeft: '1rem' }}>
                    <div>
                      <img
                        className="inline"
                        style={{ verticalAlign: 'baseline' }}
                        width={12}
                        src={`/icons/tag_audio.svg`}
                      />
                      <span className="ml-2">{t('order.product.audio')}</span>
                    </div>
                    {orderedProduct?.orderedAudios.map((item) => {
                      return <div key={item.id}>{item.name}</div>;
                    })}
                  </div>
                ) : (
                  []
                )}
                {orderedProduct?.orderedLinks.length ? (
                  <div className="my-2" style={{ borderLeft: '2px solid #B8B8B8', paddingLeft: '1rem' }}>
                    <div>
                      <img
                        className="inline"
                        style={{ verticalAlign: 'baseline' }}
                        width={12}
                        src={`/icons/tag_link.svg`}
                      />
                      <span className="ml-2">{t('order.product.link')}</span>
                    </div>
                    {orderedProduct?.orderedLinks.map((item) => {
                      return <div key={item.id}>{item.name}</div>;
                    })}
                  </div>
                ) : (
                  []
                )}
                {orderedProduct?.orderedVideos.length ? (
                  <div className="my-2" style={{ borderLeft: '2px solid #B8B8B8', paddingLeft: '1rem' }}>
                    <div>
                      <img
                        className="inline"
                        style={{ verticalAlign: 'baseline' }}
                        width={12}
                        src={`/icons/tag_video.svg`}
                      />
                      <span className="ml-2">{t('order.product.video')}</span>
                    </div>
                    {orderedProduct?.orderedVideos.map((item) => {
                      return <div key={item.id}>{item.name}</div>;
                    })}
                  </div>
                ) : (
                  []
                )}
              </Collapse>
            </div>
          );
        })}
      </div>
      <div className="p-2">
        <Label>{t('others')}</Label>
        {orderedData?.coupon ? (
          <div className="flex justify-between items-center py-[6px] px-3 bg-gray-100 rounded-lg mb-3">
            <span className="overflow-hidden flex-shrink-0">{`Coupon (${orderedData.coupon?.name}${
              orderedData.coupon?.couponType === 'percent_off' ? `: ${orderedData.coupon?.percent_off} %` : ''
            })`}</span>
            <span className="ms-1">
              - ${' '}
              {orderedData.coupon?.couponType === 'amount_off'
                ? orderedData.coupon?.amount_off
                : (orderedData?.amount * orderedData.coupon?.percent_off) / 100}
            </span>
          </div>
        ) : (
          []
        )}
        {orderedData?.applicationFee ? (
          <div className="flex justify-between items-center py-[6px] px-3 bg-gray-100 rounded-lg mb-3">
            <span className="overflow-hidden flex-shrink-0">{t('order.applicationFee')}</span>
            <div className="ms-1 flex">
              {`- ${orderedData?.applicationFee}`}
              {orderedData?.website?.paymentMethod === 'crypto' ? (
                orderedData?.website?.chain?.iconUrl ? (
                  <img
                    className="ml-1"
                    src={orderedData?.website?.chain?.iconUrl}
                    alt={orderedData?.website?.chain?.name}
                  />
                ) : (
                  orderedData?.website?.chain?.name
                )
              ) : orderedData?.website?.currencyCode ? (
                ` ${orderedData?.website?.currencyCode}`
              ) : (
                ' usd'
              )}
            </div>
          </div>
        ) : (
          []
        )}
        {orderedData?.stripeFee ? (
          <div className="flex justify-between items-center py-[6px] px-3 bg-gray-100 rounded-lg mb-3">
            <span className="overflow-hidden flex-shrink-0">{t('order.stripeFee')}</span>
            <div className="ms-1 flex">
              {`- ${orderedData?.stripeFee}`}
              {orderedData?.website?.currencyCode ? ` ${orderedData?.website?.currencyCode}` : ' usd'}
            </div>
          </div>
        ) : (
          []
        )}
        {orderedData?.storageFee ? (
          <div className="flex justify-between items-center py-[6px] px-3 bg-gray-100 rounded-lg mb-3">
            <span className="overflow-hidden flex-shrink-0">{t('order.storageFee')}</span>
            <div className="ms-1 flex">
              {`- ${orderedData?.storageFee}`}
              {orderedData?.website?.paymentMethod === 'crypto' ? (
                orderedData?.website?.chain?.iconUrl ? (
                  <img
                    className="ml-1"
                    src={orderedData?.website?.chain?.iconUrl}
                    alt={orderedData?.website?.chain?.name}
                  />
                ) : (
                  orderedData?.website?.chain?.name
                )
              ) : orderedData?.website?.currencyCode ? (
                ` ${orderedData?.website?.currencyCode}`
              ) : (
                ' usd'
              )}
            </div>
          </div>
        ) : (
          []
        )}
      </div>
      <div className="p-2">
        <div className="flex justify-between items-center py-[6px] px-3 bg-amber-50 rounded-lg">
          <span className="overflow-hidden flex-shrink-0">{t('order.total')}</span>
          <div className="ms-1 flex">
            {`${orderedData?.total}`}
            {orderedData?.website?.paymentMethod === 'crypto' ? (
              orderedData?.website?.chain?.iconUrl ? (
                <img
                  className="ml-1"
                  src={orderedData?.website?.chain?.iconUrl}
                  alt={orderedData?.website?.chain?.name}
                />
              ) : (
                orderedData?.website?.chain?.name
              )
            ) : orderedData?.website?.currencyCode ? (
              ` ${orderedData?.website?.currencyCode}`
            ) : (
              ' usd'
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default {
  custom: true,
  hideOn: null,
  disableOn: null,
  component: WebsiteOrderPricing,
  intl: {
    titleId: '_Admin.Website._PageGroup.Order._Page.Order._Form.WebsiteOrderPricing._Title',
    title: 'WebsiteOrderPricing',
    descriptionId: '_Admin.Website._PageGroup.Order._Page.Order._Form.WebsiteOrderPricing._Description',
    description: 'WebsiteOrderPricing Description',
  },
  order: 3,
};
