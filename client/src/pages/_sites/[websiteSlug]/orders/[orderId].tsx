import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { Container, Card } from '@mui/material';
import prisma from 'admin/src/server/context/prisma';
import processPage from '@process/page';
import HomeLayout from '@components/layout/home-layout';
import OrderItems from '@components/order/order-items';
import { parseContextCookie } from '@utils/parse-cookie';
import Spinner from '@components/ui/loaders/spinner/spinner';
import Scrollbar from '@components/ui/scrollbar';
import { useSearch } from '@contexts/search.context';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useCart } from '@contexts/quick-cart/cart.context';
import { useAtom } from 'jotai';
import { clearCheckoutAtom } from '@jotai/checkout';
import { useQuery, gql } from '@apollo/client';
import Link from 'next/link';
import processWebsite from '@process/website';




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

export default function OrderPage() {
  const { t } = useTranslation('common');
  const { t: tOrder } = useTranslation('order');
  const { query } = useRouter();
  const { resetCart } = useCart();
  const [, resetCheckout] = useAtom(clearCheckoutAtom);
  const { updateSearchTerm } = useSearch();

  useEffect(() => {
    resetCart();
    resetCheckout();
    updateSearchTerm('');
  }, []);

  const { data, loading } = useQuery(
    gql`
      query findUniqueOrder($where: OrderWhereUniqueInput!) {
        findUniqueOrder(where: $where) {
          id
          createdAt
          delivery_time
          delivery_fee
          orderStatus
          amount
          total
          discount
          sales_tax
          shipping_address
          billing_address
          tracking_number
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
          id: query.orderId as string,
        },
      },
    },
  );

  if (loading) {
    return <Spinner showText={false} />;
  }

  return (
    <div className="bg-gray-50">
      <Scrollbar className="w-full" style={{ height: 'calc(100% - 64px)' }}>
        <Container>
          <div className="mt-10 text-center">
            <img className="m-auto mb-8" src="/cheers.svg" />
            <h5 className="text-xl">{tOrder('order-complete-congratulation')}</h5>
            <p className="text-sm">
              {tOrder('order-complete-number')} #{query.orderId}
            </p>
          </div>
          <div>
            <Card
              className="mb-5 p-4"
              style={{
                border: '1px solid #EAE6D9',
                borderRadius: '14px',
                boxShadow: '0px 0px 10px rgba(152, 121, 29, 0.1)',
              }}
            >
              {data.findUniqueOrder.orderedProducts?.length ? (
                <>
                  <div className="mt-4 mb-3 font-bold">{t('text-product')}</div>
                  {data.findUniqueOrder.orderedProducts.map((item, index) => {
                    return (
                      <Link href={`/products/${item.product.slug}`}>
                        <a>
                          <div key={index} className="bg-gray-100 px-3 rounded-lg mb-3">
                            <div className="flex justify-between">
                              <span>{item.name}</span>
                              <span>{`$${item.itemTotal}`}</span>
                            </div>
                            <OrderItems list={item.orderedAudios} type="audio" />
                            <OrderItems list={item.orderedLinks} type="link" />
                            <OrderItems list={item.orderedVideos} type="video" />
                          </div>
                        </a>
                      </Link>
                    );
                  })}
                </>
              ) : (
                []
              )}
              <div className="mt-4 mb-3 font-bold">{t('text-others')}</div>
              <div className="flex justify-between items-center px-3 bg-gray-100 rounded-lg mb-3">
                <span className="overflow-hidden flex-shrink-0">{t('text-sub-total')}</span>
                <span className="ms-1">${data.findUniqueOrder.amount}</span>
              </div>
              {data.findUniqueOrder.coupon?.name ? (
                <div className="flex justify-between items-center px-3 bg-gray-100 rounded-lg mb-3">
                  <span className="overflow-hidden flex-shrink-0">{`${t('text-coupon')} - (${data.findUniqueOrder.coupon?.name
                    }${data.findUniqueOrder.coupon?.couponType === 'percent_off'
                      ? `: ${data.findUniqueOrder.coupon?.percent_off} %`
                      : ''
                    })`}</span>
                  <span className="ms-1">
                    - $
                    {data.findUniqueOrder.coupon?.couponType === 'amount_off'
                      ? data.findUniqueOrder.coupon?.amount_off
                      : (data.findUniqueOrder.amount * data.findUniqueOrder.coupon?.percent_off) / 100}
                  </span>
                </div>
              ) : (
                []
              )}
              <div className="flex justify-between items-center px-3 bg-amber-50 rounded-lg">
                <span className="overflow-hidden flex-shrink-0">{t('text-total')}</span>
                <span className="ms-1">${data.findUniqueOrder.total}</span>
              </div>
            </Card>
          </div>
        </Container>
      </Scrollbar>
    </div>
  );
}
