import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useFindUniqueOrderQuery } from 'generated';
import Label from 'components/ui/label';
import { Collapse, Button } from '@mui/material';
import { ArrowRight, ArrowDropDown } from '@mui/icons-material';
import Link from 'next/link';

const UserOrderPricing = ({ action, register, errors, handleSubmit, setValue, getValues, watch, data }) => {
  const { data: orderData } = useQuery(
    gql`
      query findUniqueOrder($where: OrderWhereUniqueInput!) {
        findUniqueOrder(where: $where) {
          id
          delivery_fee
          orderStatus
          amount
          total
          discount
          sales_tax
          website {
            id
            name
            slug
            chain
            paymentMethod
            currencyCode
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

  const [open, setOpen] = useState(false);

  return (
    <div style={{ height: '400px', overflow: 'scroll' }}>
      <div className="p-2">
        <Label>Products</Label>
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
                <div className="ml-auto">{orderedProduct?.price}
                  {orderedData?.website?.paymentMethod === 'crypto' ? orderedData?.website?.chain?.iconUrl ? <img src={orderedData?.website?.chain?.iconUrl} alt={orderedData?.website?.chain?.name} /> : orderedData?.website?.chain?.name : orderedData?.website?.currencyCode ? orderedData?.website?.currencyCode : 'usd'}
                </div>
              </div>
              <Collapse in={open === orderedProduct?.id} timeout="auto" unmountOnExit>
                {/* <a href={`/admin/User/Order/OrderedProduct?view=${orderedProduct.id}`}>
                  <Button>Browse</Button>
                </a> */}
                <a
                  href={
                    process.env.NODE_ENV === 'production'
                      ? `https://${orderedData?.website?.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/products/${orderedProduct?.product?.slug}`
                      : `http://www.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}:3003/products/${orderedProduct?.product?.slug}`
                  }
                >
                  <Button>Browse</Button>
                </a>
                {orderedProduct?.orderedAudios.length ? (
                  <div className="my-2" style={{ borderLeft: '2px solid #B8B8B8', paddingLeft: '1rem' }}>
                    <div>
                      <img
                        className="inline"
                        style={{ verticalAlign: 'baseline' }}
                        width={12}
                        src={`/icons/tag_audio.svg`}
                      />
                      <span className="ml-2">Audio</span>
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
                      <span className="ml-2">Link</span>
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
                      <span className="ml-2">Audio</span>
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
        <Label>Others</Label>
        {orderedData?.coupon ? (
          <div className="flex justify-between items-center py-[6px] px-3 bg-gray-100 rounded-lg mb-3">
            <span className="overflow-hidden flex-shrink-0">{`Coupon - (${orderedData.coupon?.name}${orderedData.coupon?.couponType === 'percent_off' ? `: ${orderedData.coupon?.percent_off} %` : ''
              })`}</span>
            <span className="ms-1">
              -{' '}
              {orderedData.coupon?.couponType === 'amount_off'
                ? orderedData.coupon?.amount_off
                : (orderedData?.amount * orderedData.coupon?.percent_off) / 100}
              {orderedData?.website?.paymentMethod === 'crypto' ? orderedData?.website?.chain?.iconUrl ? <img src={orderedData?.website?.chain?.iconUrl} alt={orderedData?.website?.chain?.name} /> : orderedData?.website?.chain?.name : orderedData?.website?.currencyCode ? orderedData?.website?.currencyCode : 'usd'
              }

            </span>
          </div>
        ) : (
          []
        )}
      </div>
      <div className="p-2">
        <div className="flex justify-between items-center py-[6px] px-3 bg-amber-50 rounded-lg">
          <span className="overflow-hidden flex-shrink-0">Total</span>
          <span className="ms-1">{orderedData?.amount}
            {orderedData?.website?.paymentMethod === 'crypto' ? orderedData?.website?.chain?.iconUrl ? <img src={orderedData?.website?.chain?.iconUrl} alt={orderedData?.website?.chain?.name} /> : orderedData?.website?.chain?.name : orderedData?.website?.currencyCode ? orderedData?.website?.currencyCode : 'usd'
            }
          </span>
        </div>
      </div>
    </div>
  );
};

export default {
  custom: true,
  hideOn: null,
  component: UserOrderPricing,
  intl: {
    titleId: '_Admin.User._PageGroup.Order._Page.Order._Form.UserOrderPricing._Title',
    title: 'UserOrderPricing',
    descriptionId: '_Admin.User._PageGroup.Order._Page.Order._Form.UserOrderPricing._Description',
    description: 'UserOrderPricing Description',
  },
  order: 3,
};
