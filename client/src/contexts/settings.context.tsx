import React, { useState, useEffect } from "react";
import { siteSettings } from "@settings/site.settings";
import { useFindManyRequestQuery, useFindManyWebsiteQuery } from "@generated";
import { useRouter } from 'next/router'
import processItem from "@process/item";
import { Network, Alchemy } from "alchemy-sdk";
import { useAccount } from 'wagmi';
import { gql, useQuery } from '@apollo/client'
import processWebsite from "@process/website";
type State = typeof initialState;

const initialState = {
  siteTitle: siteSettings.name,
  siteSubtitle: siteSettings.description,
  currency: siteSettings.currencyCode,
  logo: {
    id: 1,
    thumbnail: siteSettings.logo.url,
    original: siteSettings.logo.url,
  },
  seo: {
    metaTitle: "",
    metaDescription: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: {
      id: 1,
      thumbnail: "",
      original: "",
    },
    twitterHandle: "",
    twitterCardType: "",
    metaTags: "",
    canonicalUrl: "",
  },
  google: {
    isEnable: false,
    tagManagerId: "",
  },
  facebook: {
    isEnable: false,
    appId: "",
    pageId: "",
  },
};

export const SettingsContext = React.createContext<State | any>(initialState);

SettingsContext.displayName = "SettingsContext";

export const SettingsProvider = ({
  website,
  page,
  ...props
}) => {
  const [state, setState] = React.useState(website ?? initialState);
  const router = useRouter()
  const indexPage = state?.pages?.find((page) => page.isIndex);

  const host = typeof window !== 'undefined' && window.location.host
  const subdomain = host ? host.split('.')[0] : null

  const { data: websiteData } = useQuery(gql`query findManyWebsite($where: WebsiteWhereInput) {
    findManyWebsite(where: $where) {
      id
      active
      address
      chain
      createdAt
      currencyCode
      description
      gasless
      hasLocation
      languageCode
      locationAddress
      locationLat
      locationLng
      logoObj
      menu
      name
      slug
      stripeAccountId
      themeColor
      walletAddress
      pages {
        id
        slug
        name
        isIndex
        isExternalLink
      }
    }
  }
  `, {
    variables: {
      where: {
        slug: {
          equals: subdomain
        }
      }
    },
    skip: !subdomain
  })


  // const { data: websiteData } = useFindManyWebsiteQuery({
  //   variables: {
  //     where: {
  //       slug: {
  //         equals: subdomain
  //       }
  //     }
  //   },
  //   skip: !subdomain
  // })

  useEffect(() => {
    if (websiteData?.findManyWebsite?.[0]) {
      setState(processWebsite(websiteData?.findManyWebsite?.[0]))
    }
  }, [websiteData])

  const { data } = useFindManyRequestQuery({
    variables: {
      where: {
        active: {
          equals: true,
        },
        OR: [
          {
            page: {
              slug: {
                equals: router?.query?.pageSlug || indexPage?.slug,
              },
            },
          },
          {
            video: {
              slug: {
                equals: router?.query?.videoSlug || indexPage?.slug,
              },
            },
          }
        ],
        requestStatus: {
          in: 'active',
        },
      },
    },
    skip: !(router?.asPath === '/' || router?.asPath?.includes('/pages/') || router?.asPath?.includes('/videos/'))
  });

  const requests = data?.findManyRequest?.filter((request) => {
    const expiredAtTime = new Date(request.expiredAt).getTime()
    const currentTime = new Date().getTime()
    if (expiredAtTime > currentTime) {
      return true
    } else {
      return false
    }
  }).sort((a, b) => b?.price - a?.price).map((request) => processItem(request))

  useEffect(() => {
    console.log('requests', requests)
  }, [requests])

  const { address } = useAccount();
  const [loadingNFT, setLoadingNFT] = useState(false)
  const [locked, setLocked] = useState(page?.password?.length > 0 || page?.products?.length > 0)
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (page?.password?.length > 0 || page?.products?.length > 0) {
      setLocked(true)
    } else {
      setLocked(false)
    }
  }, [page])

  useEffect(() => {
    async function fetchNft() {
      if (page?.products?.length > 0 && address) {
        setLoadingNFT(true)

        page.products.some(async (product) => {

          let settings = {
            apiKey: process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_API_KEY, // Replace with your Alchemy API Key.
            network: Network.MATIC_MAINNET, // Replace with your network.
          };

          let alchemy = new Alchemy(settings);

          if (product?.isExternalNft) {
            if (product?.externalNftChain === 'Ethereum') {
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
              setLocked(false)
              return true
            }
          }
        })
        setLoadingNFT(false)
      }
    }
    fetchNft()
  }, [address, page])



  return <SettingsContext.Provider value={{
    ...state, hasRequests: requests?.length > 0, requests, setLocked, locked, loadingNFT, password,
    setPassword
  }} {...props} />;
};

export const useSettings = () => {
  const context = React.useContext(SettingsContext);
  if (context === undefined) {
    throw new Error(`useSettings must be used within a SettingsProvider`);
  }
  return context;
};
