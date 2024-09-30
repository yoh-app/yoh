import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useEffect, useState } from 'react';
import prisma from 'admin/src/server/context/prisma';
import processWebsite from '@process/website';
import { useRouter } from 'next/router'
import { useAccount, useConnect } from 'wagmi';
import Typography from '@mui/material/Typography';
import { Grid, Button as MuiButton, Card, CardHeader, CardContent, Tabs, Tab } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { Network, Alchemy } from "alchemy-sdk";
import styled from 'styled-components';
import Link from 'next/link'
import Iconify from 'admin/src/components/Iconify';
import Spinner from '@components/ui/loaders/spinner/spinner';
import { useQuery, gql } from '@apollo/client'

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
const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_API_KEY, // Replace with your Alchemy API Key.
  network: Network.MATIC_MAINNET, // Replace with your network.
};

const alchemy = new Alchemy(settings);


export default function Home({ website }) {
  const { t } = useTranslation('common');
  const { query, push, isFallback } = useRouter()
  const { address } = useAccount()
  const [tab, setTab] = useState(0)
  const { data } = useQuery(gql`
  query findManyProduct($where: ProductWhereInput, $orderBy: [ProductOrderByWithRelationInput!], $cursor: ProductWhereUniqueInput, $skip: Int, $take: Int) {
    findManyProduct(where: $where, orderBy: $orderBy, cursor: $cursor, skip: $skip, take: $take) {
      id
      name
      slug
      description
      imageObj
      editionAddress
      videos {
        id
        name
        description
      }
      audios {
        id
        name
        description
      }
      documents {
        id
        name
        description
      }
      pages {
        id
        name
        description
      }
      pictures {
        id
        name
        description
      }
      links {
        id
        name
        description
      }
    }
  }
  `, {
    variables: {
      where: {
        active: {
          equals: true
        },
        website: {
          id: {
            equals: website?.id
          }
        }
      }
    },
    skip: !website?.id
  })
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const placeholderImage = `/assets/placeholder/products/product-list.svg`;

  useEffect(() => {
    async function fetchNft() {
      if (address && data) {
        setLoading(true)
        const nftsForOwner = await alchemy.nft.getNftsForOwner(address);
        console.log("number of NFTs found:", nftsForOwner.totalCount);
        const websiteProducts = []
        // Print contract address and tokenId for each NFT:
        for (const nft of nftsForOwner.ownedNfts) {
          console.log("===");
          console.log("contract address:", nft.contract.address);
          console.log("token ID:", nft.tokenId);

          data?.findManyProduct?.forEach(product => {
            if (product?.editionAddress?.toLowerCase() === nft?.contract?.address?.toLowerCase()) {
              websiteProducts.push(product)
            }
          });
        }
        setProducts(websiteProducts)
        setLoading(false)
      }
    }
    fetchNft()
  }, [address, data])
  console.log(products)
  if (isFallback) {
    return <div className="flex justify-center items-center bg-light relative">
      <Spinner text='Loading' />
    </div>
  }
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <Tabs style={{ marginBottom: '30px' }} centered value={tab} onChange={(e, value) => { setTab(value) }}>
        <Tab label={t('websiteNFTs')} />
        <Tab label={t('myNFTs')} />
      </Tabs>
      {tab === 0 && <>

        {loading ? <div className="flex justify-center items-center bg-light relative">
          <Spinner text='Loading' />
        </div> : <Grid style={{ padding: '20px' }} spacing={2} container justifyContent="center">
          {data?.findManyProduct?.map((product) => {
            return <Link href={`/products/${product.slug}`}><Grid item xs={12} md={3}>
              <Card
                sx={{
                  cursor: 'pointer',
                  position: 'relative',
                  backgroundImage: `url('${product?.imageObj?.url}')`,
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
                <>
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
                    {product?.videos.length ? (
                      <TagStyle>
                        <Iconify icon={'icon-park-outline:film'} width={14} height={14} />
                      </TagStyle>
                    ) : (
                      []
                    )}
                    {product?.documents.length ? (
                      <TagStyle>
                        <Iconify icon={'lucide:file-text'} width={14} height={14} />
                      </TagStyle>
                    ) : (
                      []
                    )}
                    {product?.pictures.length ? (
                      <TagStyle>
                        <Iconify icon={'lucide:image'} width={14} height={14} />
                      </TagStyle>
                    ) : (
                      []
                    )}
                    {product?.pages.length ? (
                      <TagStyle>
                        <Iconify icon={'ic:round-art-track'} width={14} height={14} />
                      </TagStyle>
                    ) : (
                      []
                    )}
                    {product?.links.length ? (
                      <TagStyle>
                        <Iconify icon={'ph:link-simple-bold'} width={14} height={14} />
                      </TagStyle>
                    ) : (
                      []
                    )}
                    {product?.audios.length ? (
                      <TagStyle>
                        <Iconify icon={'lucide:headphones'} width={14} height={14} />
                      </TagStyle>
                    ) : (
                      []
                    )}
                  </div>
                  <CardContent
                    sx={{ flexGrow: 1, color: '#ffffff' }}
                    style={{ padding: '8px 12px' }}
                  >
                    <Typography variant="h6" sx={{ fontSize: '22px' }}>
                      {product.name}
                    </Typography>
                  </CardContent>
                </>
              </Card>
            </Grid>
            </Link>
          })}
        </Grid>}</>}



      {tab === 1 && <>

        {loading ? <div className="flex justify-center items-center bg-light relative">
          <Spinner text='Loading' />
        </div> : <Grid style={{ padding: '20px' }} spacing={2} container justifyContent="center">
          {products.map((product) => {
            return <Link href={`/products/${product.slug}`}><Grid item xs={12} md={3}>
              <Card
                sx={{
                  cursor: 'pointer',
                  position: 'relative',
                  backgroundImage: `url('${product?.imageObj?.url}')`,
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
                <>
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
                    {product?.videos.length ? (
                      <TagStyle>
                        <Iconify icon={'icon-park-outline:film'} width={14} height={14} />
                      </TagStyle>
                    ) : (
                      []
                    )}
                    {product?.documents.length ? (
                      <TagStyle>
                        <Iconify icon={'lucide:file-text'} width={14} height={14} />
                      </TagStyle>
                    ) : (
                      []
                    )}
                    {product?.pictures.length ? (
                      <TagStyle>
                        <Iconify icon={'lucide:image'} width={14} height={14} />
                      </TagStyle>
                    ) : (
                      []
                    )}
                    {product?.pages.length ? (
                      <TagStyle>
                        <Iconify icon={'ic:round-art-track'} width={14} height={14} />
                      </TagStyle>
                    ) : (
                      []
                    )}
                    {product?.links.length ? (
                      <TagStyle>
                        <Iconify icon={'ph:link-simple-bold'} width={14} height={14} />
                      </TagStyle>
                    ) : (
                      []
                    )}
                    {product?.audios.length ? (
                      <TagStyle>
                        <Iconify icon={'lucide:headphones'} width={14} height={14} />
                      </TagStyle>
                    ) : (
                      []
                    )}
                  </div>
                  <CardContent
                    sx={{ flexGrow: 1, color: '#ffffff' }}
                    style={{ padding: '8px 12px' }}
                  >
                    <Typography variant="h6" sx={{ fontSize: '22px' }}>
                      {product.name}
                    </Typography>
                  </CardContent>
                </>
              </Card>
            </Grid>
            </Link>
          })}
        </Grid>}</>}


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
      // products: {
      //   include: {
      //     videos: true,
      //     audios: true,
      //     links: true
      //   }
      // },
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
        ...(await serverSideTranslations(locale!, ['common'])),
      },
    };

  return {
    props: {
      website: processWebsite(website),
      // page: processPage({
      //   ...page,
      //   website,
      // }),
      ...(await serverSideTranslations(locale!, ['common'])),
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
//       products: {
//         include: {
//           videos: true,
//           audios: true,
//           links: true
//         }
//       },
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
