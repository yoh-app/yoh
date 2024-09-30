import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import HomeLayout from '@components/layout/home-layout';
import OrderCard from '@components/order/order-card';
import ErrorMessage from '@components/ui/error-message';
import OrderDetails from '@components/order/order-details';
import 'rc-collapse/assets/index.css';
import { GetServerSideProps } from 'next';
import { parseContextCookie } from '@utils/parse-cookie';
import Spinner from '@components/ui/loaders/spinner/spinner';
import Scrollbar from '@components/ui/scrollbar';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { NetworkStatus, useQuery, gql } from '@apollo/client';
import Button from '@components/ui/button';
import NoData from '@components/common/no-data';
import { useCustomer } from '@contexts/customer.context';
import { useFindManyOrderCountQuery } from '../../../../../../admin/src/generated';
import processWebsite from '@process/website';
import prisma from 'admin/src/server/context/prisma';
import { useRouter } from 'next/router';

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
        ...(await serverSideTranslations(locale, ['common', 'order'])),
      },
    };

  return {
    props: {
      website: processWebsite(website),
      // page: processPage({
      //   ...page,
      //   website,
      // }),
      ...(await serverSideTranslations(locale, ['common', 'order'])),
    },
    // revalidate: 20,
  };
};


// export const getServerSideProps: GetServerSideProps = async (context: any) => {
//   const cookies = parseContextCookie(context?.req?.headers?.cookie);
//   const websiteSlug = context.req.headers.host.split('.')[0];

//   if (!cookies?.magic_token) {
//     return { redirect: { destination: '/', permanent: false } };
//   }

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
//       ...(await serverSideTranslations(context.locale, ['common', 'order'])),
//     },
//   };
// };

export default function OrdersPage() {
  const { t } = useTranslation('common');
  const { t: tOrder } = useTranslation('order');

  const [order, setOrder] = useState<any>({});
  const { customer } = useCustomer();
  const [take, setTake] = useState(10);

  const variables = (_customer, _take) => {
    return {
      where: {
        paid: {
          equals: true,
        },
        customer: {
          id: {
            equals: _customer?.id,
          },
        },
      },
      // orderBy: [{
      //   createdAt: 'desc'
      // }],
      take: _take,
    };
  };

  const { data: orderCountData } = useFindManyOrderCountQuery({
    variables: variables(customer),
    skip: !customer?.id,
  });
  const { data, loading, error, networkStatus, fetchMore } = useQuery(
    gql`
      query findManyOrder($where: OrderWhereInput, $orderBy: [OrderOrderByWithRelationInput!]) {
        findManyOrder(where: $where, orderBy: $orderBy) {
          id
          createdAt
          # delivery_time
          # delivery_fee
          # orderStatus
          amount
          total
          # discount
          # sales_tax
          # shipping_address
          # billing_address
          # tracking_number
          transactionHash
          walletAddress
          website {
            id
            name
            # chain
            # currencyCode
            # paymentMethod
          }
          orderedProducts {
            id
            quantity
            name
            imageObj
            description
            price
            # itemTotal
            product {
              id
              name
              slug
            }
            # orderedAudios {
            #   id
            #   name
            #   description
            #   imageObj
            #   audioObj
            # }
            # orderedLinks {
            #   id
            #   name
            #   description
            #   imageObj
            #   url
            # }
            # orderedVideos {
            #   id
            #   name
            #   description
            #   imageObj
            #   videoObj
            # }
          }
          # coupon {
          #   name
          #   couponType
          #   amount_off
          #   percent_off
          # }
        }
      }
    `,
    {
      variables: variables(customer, take),
      skip: !customer?.id,
    },
  );

  useEffect(() => {
    if (data?.findManyOrder?.length) {
      setOrder(data.findManyOrder[0]);
    }
  }, [data?.findManyOrder?.length]);
  if (error) return <ErrorMessage message={error.message} />;
  const loadingMore = networkStatus === NetworkStatus.fetchMore;
  function handleLoadMore() {
    if (orderCountData?.findManyOrderCount > take) {
      fetchMore({
        variables: variables(customer, take + 10),
      });
      setTake(take + 10);
    }
  }

  const { isFallback } = useRouter()
  if (isFallback) {
    return <div className="flex justify-center items-center bg-light relative">
      <Spinner text='Loading' />
    </div>
  }
  return (
    <div style={{ marginTop: '65px', height: '100%' }}>
      <div className="w-full">
        {data?.findManyOrder?.length ? (
          <Grid container className="px-4">
            <Grid item xs={12} md={4} className="py-5 md:px-4">
              <div className="text-xl font-bold mb-2">{tOrder('order-list-title')}</div>
              <div className="text-sm text-gray-800 mb-2">{tOrder('order-list-description')}</div>
              {loading && !data?.findManyOrder?.length ? (
                <p>
                  <Spinner showText={false} />
                </p>
              ) : (
                <>
                  {data?.findManyOrder.map((_order, index) => (
                    <OrderCard
                      key={index}
                      order={_order}
                      onClick={() => setOrder(_order)}
                      isActive={order?.id === _order?.id}
                    />
                  ))}
                  {orderCountData?.findManyOrderCount > take && (
                    <div className="flex justify-center mt-8 lg:mt-12">
                      <Button
                        loading={loadingMore}
                        onClick={handleLoadMore}
                        className="text-sm md:text-base font-semibold h-11"
                      >
                        {t('text-load-more')}
                      </Button>
                    </div>
                  )}
                </>
              )}
              {!loading && !data?.findManyOrder?.length && (
                <div className="w-full h-full flex items-center justify-center my-auto">
                  <h4 className="text-sm font-semibold text-body text-center">{t('error-no-orders')}</h4>
                </div>
              )}
            </Grid>
            <Grid item xs={12} md={8} className="py-5 px-4 hidden lg:block">
              <div className="text-xl font-bold mb-2">{tOrder('order-detail-title')}</div>
              <div className="text-sm text-gray-800 mb-2">{tOrder('order-detail-description')}</div>
              {order ? (
                <OrderDetails order={order} />
              ) : (
                <div className="flex justify-center items-center">
                  <NoData text={tOrder('order-list-unselected')} type="data" />
                </div>
              )}
            </Grid>
          </Grid>
        ) : (
          <div className="flex justify-center items-center">
            <NoData text={tOrder('order-list-title')} type="order" />
          </div>
        )}
      </div>
    </div>
  );
}
