import type { GetStaticPathsContext, GetServerSidePropsContext } from 'next'

// import ProductNftDetails from '@components/product/product-details-nft';
// import ProductDetails from '@components/product/product-details';
import Product from '@components/ui/product/product';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import prisma from 'admin/src/server/context/prisma';
import processItem from '@process/item';
import Image from 'next/image';

import processWebsite from '@process/website';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import Spinner from '@components/ui/loaders/spinner/spinner';
import { useTranslation } from 'next-i18next';
import { Network, Alchemy } from "alchemy-sdk";
import { useAccount } from 'wagmi';
import { useCustomer } from '@contexts/customer.context';
// import { useQuery, gql } from '@apollo/client';
import { Modal, Grid, Backdrop, Fade, Box } from '@mui/material';
import Iconify from 'admin/src/components/Iconify';

export default function ProductSinglePage({ product, website }: any) {
  const { t } = useTranslation('common')
  const router = useRouter()
  const [nftBought, setNftBought] = useState<any>(null)
  const [view, setView] = useState<Record<string, any>>({});
  const [loadingNFT, setLoadingNFT] = useState(false)
  const { address } = useAccount();
  const { customer } = useCustomer();

  useEffect(() => {
    async function fetchNft() {
      if (product?.contractAddress && address) {
        setLoadingNFT(true)
        let settings = {
          apiKey: process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_API_KEY, // Replace with your Alchemy API Key.
          network: Network.MATIC_MAINNET, // Replace with your network.
        };

        let alchemy = new Alchemy(settings);

        if (product?.isExternalNft) {
          if (product?.chain === 'Ethereum') {
            settings = {
              apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ETHEREUM_API_KEY, // Replace with your Alchemy API Key.
              network: Network.ETH_MAINNET, // Replace with your network.
            };
            alchemy = new Alchemy(settings);
          }
        }

        const nftsForOwner = await alchemy.nft.getNftsForOwner(address);
        console.log("number of NFTs found:", nftsForOwner.totalCount);

        // Print contract address and tokenId for each NFT:
        for (const nft of nftsForOwner.ownedNfts) {
          console.log("===");
          console.log("contract address:", nft.contract.address);
          console.log("token ID:", nft.tokenId);
          if (nft.contract.address.toLowerCase() === product?.editionAddress.toLowerCase()) {
            setNftBought(nft)
          }
        }
        setLoadingNFT(false)
      }
    }
    fetchNft()
  }, [address, product])

  if (router.isFallback) {
    return <div className="flex justify-center items-center bg-light relative">
      <Spinner text='Loading' />
    </div>
  }
  return (
    <>
      <NextSeo
        openGraph={{
          url: `https://${website?.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/pages/${product?.slug}`,
          title: product?.name,
          description: product?.description,
          images: [
            { url: website?.imageObj?.url },
            { url: product?.imageObj?.url },
          ],
          site_name: website?.name,
        }}
        title={product?.name}
        description={product?.description}
        canonical={`https://${website?.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/products/${product?.slug}`}
      />
      <div className="bg-light min-h-screen pt-20 pb-12">
        <Product loading={loadingNFT} view={view} setView={setView} nftBought={nftBought} product={product} />
      </div>
      <Modal
        open={!!view['type']}
        onClose={() => setView({})}
        closeAfterTransition
        aria-labelledby="product-modal-title"
        aria-describedby="product-modal-description"
        // BackdropComponent={Backdrop}
        // BackdropProps={{
        //   timeout: 500,
        // }}
      >
        <Fade in={!!view['type']}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              maxWidth: 1200,
              maxHeight: '90vh',
              width: 'calc(100% - 32px)',
              bgcolor: 'background.paper',
              borderRadius: '10px',
              boxShadow: 24,
              p: { xs: 3, sm: 6 },
              outline: 'none',
              overflow: 'auto',
            }}
          >
            <Grid
              container
              rowSpacing={3}
              columnSpacing={3}
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent={{ sm: 'center' }}
              alignItems={{ xs: 'center', sm: 'flex-start' }}
            >
              <Grid item width={'240px'} justifyContent="center">
                <Image
                  className="rounded-full"
                  src={view?.imageObj?.url ?? '/product-placeholder.svg'}
                  width="100%"
                  height="100%"
                  layout="responsive"
                  objectFit="cover"
                  alt={view?.name}
                  loader={({ src }) => { return src }}
                />
              </Grid>
              <Grid item xs>
                <h4 className="flex items-center gap-x-2">
                  <span>{view.name}</span>
                  {view.status === 'purchased' && view.type === 'link' ? (
                    <a href={view.url}>
                      <Iconify icon={'lucide:external-link'} />
                    </a>
                  ) : (
                    []
                  )}
                </h4>
                <p>{view.description}</p>
              </Grid>
              {view.status === 'purchased' ? (
                <>
                  {view.hiddenMessage ? (
                    <Grid item xs={12}>
                      <div className=" p-5">
                        <div className="flex items-center font-bold gap-x-1">
                          <Iconify icon={'lucide:unlock'} />
                          <span>{t('text-hidden-message')}</span>
                        </div>
                        <div>{view.hiddenMessage}</div>
                      </div>
                    </Grid>
                  ) : (
                    []
                  )}
                  {view.videoObj?.url ? (
                    <Grid item xs={12}>
                      <video style={{ width: '100%' }} controls>
                        <source src={view.videoObj.url} />
                        Your browser does not support the video tag.
                      </video>
                    </Grid>
                  ) : (
                    []
                  )}
                  {view.audioObj?.url ? (
                    <Grid item xs={12}>
                      <audio style={{ width: '100%' }} controls>
                        <source src={view.audioObj.url} />
                        Your browser does not support the audio tag.
                      </audio>
                    </Grid>
                  ) : (
                    []
                  )}
                </>
              ) : (
                <>
                  {view.videoPreviewObj?.url ? (
                    <Grid item xs={12}>
                      <video style={{ width: '100%' }} controls>
                        <source src={view.videoPreviewObj.url} />
                        Your browser does not support the video tag.
                      </video>
                    </Grid>
                  ) : (
                    []
                  )}
                  {view.audioPreviewObj?.url ? (
                    <Grid item xs={12}>
                      <audio style={{ width: '100%' }} controls>
                        <source src={view.audioPreviewObj.url} />
                        Your browser does not support the audio tag.
                      </audio>
                    </Grid>
                  ) : (
                    []
                  )}
                </>
              )}
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export const getStaticPaths = async ({ locales }: GetStaticPathsContext) => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps = async ({ params, locale }: GetServerSidePropsContext) => {
  if (!params) throw new Error('No path parameters found');

  const { productSlug, websiteSlug } = params;
  const product = await prisma.product.findUnique({
    where: {
      slug: productSlug as string,
    },
    include: {
      website: true,
      pages: true,
      productCollections: true,
      attachments: true
    },
  });

  const website = await prisma.website.findUnique({
    where: {
      slug: websiteSlug as string,
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

  if (!product || !website)
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
      product: processItem(product),
      ...(await serverSideTranslations(locale!, ['common'])),
    },
    // revalidate: 20,
  };
};
