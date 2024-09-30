import { useState } from 'react';
import cn from 'classnames';
import { styled } from '@mui/material/styles';
import { OutlinedInput, Box, Grid, Tabs, Tab, Chip } from '@mui/material';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { gql, useLazyQuery } from '@apollo/client'
import { useFindManyProductLazyQuery, useFindManyLinkLazyQuery, useFindManyPageLazyQuery } from '@generated';
import prisma from 'admin/src/server/context/prisma';
import processWebsite from '@process/website';
import HomeLayout from '@components/layout/home-layout';
import { parseContextCookie } from '@utils/parse-cookie';
import { useRouter } from 'next/router'

import Spinner from '@components/ui/loaders/spinner/spinner';

const SearchTitleStyle = styled('h1')(({ theme }) => ({
  fontSize: '36px',
  lineHeight: '68px',
  textAlign: 'center',
  transition: 'margin 0.3s ease 0s',
  marginTop: '128px',
  // [theme.breakpoints.up('md')]: {
  //   marginTop: '48px',
  // },
  '&.isSearched': {
    marginTop: '12px',
    // [theme.breakpoints.up('md')]: {
    //   marginTop: '0px',
    // },
  },
}));

const SearchInputStyle = styled(OutlinedInput)(({ theme }) => ({
  background: '#ffffff',
  padding: '8px',
  width: '100%',
  transition: 'all 0.3s ease 0s',
  borderRadius: '24px',
  marginTop: '80px',
  border: '1px solid #637381',
  [theme.breakpoints.up('md')]: {
    width: '33vw',
    marginTop: '24px',
  },
  '&.isSearched': {
    marginTop: '20px',
    [theme.breakpoints.up('md')]: {
      marginTop: '0px',
    },
  },
  '& fieldset.MuiOutlinedInput-notchedOutline': {
    borderWidth: '0px',
  },
  '& input': {
    padding: '0 8px',
    fontSize: '16px',
    lineHeight: '24px',
    height: 'unset',
    textAlign: 'center',
  },
  '&.Mui-focused': {
    border: '1px solid #637381',
    boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.25)',
    '& fieldset.MuiOutlinedInput-notchedOutline': {
      borderWidth: '0px',
    },
    '& img': {
      background: '#212B36',
    },
  },
}));

const SearchIconStyle = styled('img')(({ theme }) => ({
  transition: 'background 0.3s ease 0s',
  width: '32px',
  height: '32px',
  padding: '8px',
  background: '#B8B8B8',
  borderRadius: '50%',
  '&.isSearched': {
    background: '#212B36',
  },
}));

const SearchResultStyle = styled('div')(({ theme }) => ({
  transition: 'opacity 0.6s ease 0s',
  '&.isSearched': {
    opacity: 1,
  },
  '&:not(.isSearched)': {
    'pointer-events': 'none',
  },
}));

const SearchCardStyle = styled('div')(({ theme }) => ({
  background: '#ffffff',
  border: '1px solid #E9E9E9',
  transition: 'box-shadow 0.3s eas 0s',
  '&:hover': {
    boxShadow: '0px 0px 8px rgba(113, 113, 113, 0.28)',
  },
  color: '#212B36',
  fontSize: '20px',
  lineHeight: '24px',
  fontWeight: '700',
}));

const SearchTabsStyle = styled(Tabs)(({ theme }) => ({
  '& .MuiTab-root': {
    borderBottom: '3px solid #EBEBEB',
    '&.Mui-selected': {
      color: 'var(--accent)',
    },
  },
  '& .MuiTabs-indicator': {
    height: '3px',
    backgroundColor: 'var(--accent)',
  },
}));

const SearchChipStyle = styled(Chip)(({ theme }) => ({
  '&.chip-products': {
    color: '#0C53B7',
    background: 'rgba(12, 83, 183, 0.16)',
  },
  '&.chip-links': {
    color: '#39AB97',
    background: 'rgba(57, 171, 151, 0.16)',
  },
  '&.chip-pages': {
    color: '#AB5BBF',
    background: 'rgba(195, 119, 220, 0.16)',
  },
}));

// export const getServerSideProps = async (context: any) => {
//   const websiteSlug = context.req.headers.host.split('.')[0];

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
//       ...(await serverSideTranslations(context.locale, ['common', 'search'])),
//     },
//   };
// };


export const getStaticPaths = async ({ locales }) => {
  const websites = await prisma.website.findMany({
    where: {},
  });
  const paths = websites
    .map((website) =>
      locales.map((locale) => ({
        params: { websiteSlug: website.slug },
        locale, // Pass locale here
      })),
    )
    .flat();
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

  if (!website)
    return {
      notFound: true,
      // revalidate: 10,
      props: {
        ...(await serverSideTranslations(locale!, ['common', 'search'])),
      },
    };

  return {
    props: {
      website: processWebsite(website),
      ...(await serverSideTranslations(locale!, ['common', 'search'])),
    },
    // revalidate: 20,
  };
};

export default function SearchPage({ website }) {
  const { t } = useTranslation('search');
  const [isSearched, setIsSearched] = useState(false);
  const [formInput, setFormInput] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [tabIndex, setTabIndex] = useState(0);

  const [getProducts, { data: productsData }] = useFindManyProductLazyQuery({
    fetchPolicy: 'no-cache',
  });

  // const [getLinks, { data: linksData }] = useFindManyLinkLazyQuery({
  //   fetchPolicy: 'no-cache',
  // });

  const [getPages, { data: pagesData }] = useLazyQuery(gql` query findManyPage($where: PageWhereInput, $orderBy: [PageOrderByWithRelationInput!], $cursor: PageWhereUniqueInput, $skip: Int, $take: Int) {
    findManyPage(where: $where, orderBy: $orderBy, cursor: $cursor, skip: $skip, take: $take) {
      id
      name
      description
      slug
      imageObj
    }
  }`, {
    fetchPolicy: 'no-cache',
  })

  // const [getPages, { data: pagesData }] = useFindManyPageLazyQuery({
  //   fetchPolicy: 'no-cache',
  // });

  const queryProducts = () => {
    getProducts({
      variables: {
        where: {
          name: {
            contains: formInput,
          },
          website: {
            slug: {
              equals: website.slug,
            },
          },
          editionAddress: {
            not: {
              equals: null
            }
          },
          active: {
            equals: true,
          },
        },
      },
    });
  };
  // const queryLinks = () => {
  //   getLinks({
  //     variables: {
  //       where: {
  //         name: {
  //           contains: formInput,
  //         },
  //         collections: {
  //           some: {
  //             website: {
  //               slug: {
  //                 equals: websiteSlug,
  //               },
  //             },
  //           },
  //         },
  //         active: {
  //           equals: true,
  //         },
  //       },
  //     },
  //   });
  // };
  const queryPages = () => {
    getPages({
      variables: {
        where: {
          name: {
            contains: formInput,
          },
          website: {
            slug: {
              equals: website.slug,
            },
          },
          active: {
            equals: true,
          },
        },
      },
    });
  };

  const searchItems = () => {
    setIsSearched(true);
    setSearchInput(formInput);
    queryProducts();
    // queryLinks();
    queryPages();
  };

  const switchTab = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };


  const { isFallback } = useRouter()

  if (isFallback) {
    return <div className="flex justify-center items-center bg-light relative">
      <Spinner text='Loading' />
    </div>
  }
  return (
    <div style={{ marginTop: '100px' }}>
      <section className={`max-w-1920 w-full mx-auto ${isSearched ? 'onSearching' : ''}`}>
        <SearchTitleStyle className={cn([{ isSearched: isSearched }])}>{t('search-head')}</SearchTitleStyle>
        <div className="text-center">
          <SearchInputStyle
            className={cn([{ isSearched: isSearched }])}
            value={formInput}
            onChange={(e) => {
              setFormInput(e.target.value);
            }}
            endAdornment={
              <SearchIconStyle
                className={cn(['cursor-pointer', { isSearched: isSearched }])}
                width={18}
                src="/icons/search-white.svg"
                onClick={() => {
                  searchItems();
                }}
              />
            }
          />
        </div>
        <SearchResultStyle className={cn('opacity-0 px-4', { isSearched: isSearched })}>
          <p>{t('search-for').replace('%input', searchInput)}</p>
          <Box sx={{ marginTop: '32px' }}>
            <SearchTabsStyle value={tabIndex} onChange={switchTab}>
              <Tab label={t('search-tab-all')} />
              <Tab label={t('search-tab-products')} />
              {/* <Tab label={t('search-tab-links')} /> */}
              <Tab label={t('search-tab-pages')} />
            </SearchTabsStyle>
          </Box>
          <Grid container sx={{ marginTop: '24px', padding: '16px 0' }} spacing={{ xs: 2, md: 4 }}>
            {tabIndex === 0 || tabIndex === 1
              ? productsData?.findManyProduct.map((item) => {
                return (
                  <Grid component={'a'} href={`/products/${item?.slug}`} key={item.id} item xs={12} md={6} lg={4} xl={3}>
                    <SearchCardStyle sx={{ height: '115px', padding: '12px', borderRadius: '14px', display: 'flex' }}>
                      <div
                        className="shrink-0"
                        style={{
                          backgroundImage: `url(${item.imageObj.url})`,
                          backgroundPosition: 'center',
                          backgroundSize: 'cover',
                        }}
                      ></div>
                      <div className="grow self-center px-6">{item.name}</div>
                      <SearchChipStyle className="chip-products" size="small" label={t('search-chip-product')} />
                    </SearchCardStyle>
                  </Grid>
                );
              })
              : []}
            {tabIndex === 0 || tabIndex === 2
              ? pagesData?.findManyPage.map((item) => {
                return (
                  <Grid component={'a'} href={`/pages/${item?.slug}`} key={item.id} item xs={12} md={6} lg={4} xl={3}>
                    <SearchCardStyle
                      key={item.id}
                      sx={{ height: '115px', padding: '12px 16px', borderRadius: '14px', display: 'flex' }}
                    >
                      <div
                        className="shrink-0"
                        style={{
                          backgroundImage: `url(${item.imageObj ? item.imageObj.url : item.website?.imageObj.url})`,
                          backgroundPosition: 'center',
                          backgroundSize: 'cover',
                        }}
                      ></div>
                      <div className="grow self-center px-6">{item.name}</div>
                      <SearchChipStyle className="chip-pages" size="small" label={t('search-chip-page')} />
                    </SearchCardStyle>
                  </Grid>
                );
              })
              : []}
            {(productsData?.findManyProduct.length || 0) +
              // (linksData?.findManyLink.length || 0) +
              (pagesData?.findManyPage.length || 0) <=
              0 ? (
              <Grid item xs={12}>
                <div className="flex items-center justify-center">
                  {t('search-empty')}
                </div>
              </Grid>
            ) : (
              []
            )}
          </Grid>
        </SearchResultStyle>
      </section>
    </div>
  );
}
