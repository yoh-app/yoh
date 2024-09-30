import { useEffect, useState, useRef } from 'react';
import type { AppProps /*, AppContext */ } from 'next/app';
import '@fontsource/open-sans';
import '@fontsource/open-sans/600.css';
import '@fontsource/open-sans/700.css';
import '@assets/main.css';
import 'react-toastify/dist/ReactToastify.css';
// chawkbazar style css
// import '@styles/scrollbar.css';
// import 'mapbox-gl/dist/mapbox-gl.css';
import '@styles/swiper-carousel.css';
// import '@styles/custom-plugins.css';
// import '@styles/tailwind.css';
import { ApolloProvider, gql, useApolloClient, useQuery } from '@apollo/client';
import { useApollo } from '@utils/apollo';
import { UIProvider, useUI } from '@contexts/ui.context';
import { SearchProvider } from '@contexts/search.context';
import SidebarContainer from '@components/common/sidebar/sidebar-container';
import ErrorMessage from '@components/ui/error-message';
import { SettingsProvider } from '@contexts/settings.context';
import PageLoader from '@components/ui/page-loader/page-loader';
// import { useSettingsQuery } from '@graphql/settings.graphql';
import { ToastContainer } from 'react-toastify';
import { appWithTranslation } from 'next-i18next';
import { CartProvider } from '@contexts/quick-cart/cart.context';
// import DefaultSeo from '@components/ui/default-seo';
import ProgressBar from '@components/common/progressBar';
import { useSocialLoginMutation } from '@graphql/auth.graphql';
import { CUSTOMER } from '@utils/constants';
import Cookies from 'js-cookie';
import ManagedModal from '@components/ui/modal/managed-modal';
import { ModalProvider, useModalAction } from '@components/ui/modal/modal.context';
import { Provider as NextAuthProvider, useSession } from 'next-auth/client';
import processWebsite from '@process/website';
import { AuthProvider as MagicProvider } from '@server/magic/components/AuthProvider';
import { AuthProvider as SessionProvider } from '@contexts/session.context';
import { ModalContextProvider } from '@server/magic/components/Modal';
import complete from '@server/magic/api/complete';
// import '@server/magic/styles/globals.css';
import { applyTheme } from '@themes/utils';
import HomeLayout from '@components/layout/home-layout';
import FadeInOutLayout from '@components/animation/FadeInOutLayout';

import { useRouter } from 'next/router';

import { QueryClient, QueryClientProvider } from 'react-query';
import { CustomerProvider } from '@contexts/customer.context';

import BlockchainWrapper from '@components/BlockchainWrapper';
import { DefaultSeo } from 'next-seo';

const Noop: React.FC = ({ children }) => <>{children}</>;

function CustomApp({ Component, pageProps }: AppProps) {
  // if (typeof window === 'undefined' || !pageProps?.website) {
  //   return null;
  // }
  const router = useRouter()
  useEffect(() => {
    if (pageProps?.website?.themeColor) {
      applyTheme(pageProps?.website?.themeColor);
    } else {
      applyTheme('base');
    }
  }, [pageProps?.website?.themeColor]);

  useEffect(() => {
    if ((pageProps?.website?.languageCode && router?.locale) && pageProps?.website?.languageCode !== router?.locale) {
      router.push(router.asPath, router.asPath, {
        locale: pageProps?.website?.languageCode,
      });
    }
  }, [router, pageProps?.website])
  // const catchLanguage = typeof localStorage === 'undefined' ? null : localStorage?.getItem('language');
  // console.log(catchLanguage, pageProps?.website)
  // if (!catchLanguage) {
  //   if (typeof localStorage !== 'undefined') {
  //     localStorage.setItem('language', pageProps?.website?.languageCode);
  //   }
  //   router.push(router.asPath, router.asPath, {
  //     locale: pageProps?.website?.languageCode,
  //   });
  // } else if (catchLanguage !== router.locale) {
  //   router.push(router.asPath, router.asPath, {
  //     locale: catchLanguage,
  //   });
  // }

  const apolloClient = useApollo(pageProps);
  // const AuthProvider = process.env.NEXT_PUBLIC_AUTH === 'magic' ? MagicProvider : SessionProvider;

  const queryClientRef = useRef<any>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  const rootPath = '/_sites/[websiteSlug]'
  const productPath = '/_sites/[websiteSlug]/products/[productSlug]'
  const pagePath = '/_sites/[websiteSlug]/pages/[pageSlug]'
  return (
    <ApolloProvider client={apolloClient}>
      <ModalContextProvider>
        <MagicProvider>
          <SessionProvider>
            <BlockchainWrapper chainData={pageProps?.website?.chain}>
              <QueryClientProvider client={queryClientRef.current}>
                <SettingsProvider page={pageProps?.page} website={pageProps?.website}>
                  <CustomerProvider>
                    <ModalProvider>
                      <CartProvider>
                        <UIProvider>
                          {/* <NextAuthProvider> */}
                          <SearchProvider>
                            <DefaultSeo
                              openGraph={{
                                url: `https://${pageProps?.website?.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/`,
                                title: pageProps?.website?.name,
                                description: pageProps?.website?.description,
                                images: [
                                  { url: pageProps?.website?.imageObj?.url },
                                ],
                                site_name: pageProps?.website?.name,
                              }}
                              title={pageProps?.website?.name}
                              description={pageProps?.website?.description}
                              canonical={`https://${pageProps?.website?.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/`}
                            />
                            {/* {router?.pathname === rootPath && <NextSeo
                              openGraph={{
                                url: `https://${pageProps?.website?.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/`,
                                title: pageProps?.website?.name,
                                description: pageProps?.website?.description,
                                images: [
                                  { url: pageProps?.website?.imageObj?.url },
                                ],
                                site_name: pageProps?.website?.name,
                              }}
                              title={pageProps?.website?.name}
                              description={pageProps?.website?.description}
                              canonical={`https://${pageProps?.website?.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/`}
                            />}
                            {router?.pathname === productPath && <NextSeo
                              openGraph={{
                                url: `https://${pageProps?.website?.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/products/${pageProps?.product?.slug}`,
                                title: pageProps?.product?.name,
                                description: pageProps?.product?.description,
                                images: [
                                  { url: pageProps?.website?.imageObj?.url },
                                  { url: pageProps?.product?.imageObj?.url },
                                ],
                                site_name: pageProps?.website?.name,
                              }}
                              title={pageProps?.product?.name}
                              description={pageProps?.product?.description}
                              canonical={`https://${pageProps?.website?.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/products/${pageProps?.product?.slug}`}
                            />}
                            {router?.pathname === pagePath && <NextSeo
                              openGraph={{
                                url: `https://${pageProps?.website?.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/pages/${pageProps?.page?.slug}`,
                                title: pageProps?.page?.name,
                                description: pageProps?.page?.description,
                                images: [
                                  { url: pageProps?.website?.imageObj?.url },
                                  { url: pageProps?.page?.imageObj?.url },
                                ],
                                site_name: pageProps?.website?.name,
                              }}
                              title={pageProps?.page?.name}
                              description={pageProps?.page?.description}
                              canonical={`https://${pageProps?.website?.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/pages/${pageProps?.page?.slug}`}
                            />} */}
                            {/* {(router?.pathname === rootPath || router?.pathname === productPath || router?.pathname === pagePath) && <NextSeo
                              openGraph={{
                                url: router?.pathname === rootPath ? `https://${pageProps?.website?.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/` : productPath ? `https://${pageProps?.website?.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/products/${pageProps?.product?.slug}` : `https://${pageProps?.website?.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/pages/${pageProps?.page?.slug}`,
                                title: router?.pathname === rootPath ? pageProps?.website?.name : productPath ? pageProps?.product?.name : pageProps?.page?.name,
                                description: router?.pathname === rootPath ? pageProps?.website?.description : productPath ? pageProps?.product?.description : pageProps?.page?.description,
                                images: [
                                  { url: pageProps?.website?.imageObj?.url },
                                  { url: router?.pathname === rootPath ? pageProps?.website?.imageObj?.url : productPath ? pageProps?.product?.imageObj?.url : pageProps?.page?.imageObj?.url, },
                                ],
                                site_name: pageProps?.website?.name,
                              }}
                              title={router?.pathname === rootPath ? pageProps?.website?.name : productPath ? pageProps?.product?.name : pageProps?.page?.name}
                              description={router?.pathname === rootPath ? pageProps?.website?.description : productPath ? pageProps?.product?.description : pageProps?.page?.description}
                              canonical={router?.pathname === rootPath ? `https://${pageProps?.website?.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/` : productPath ? `https://${pageProps?.website?.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/products/${pageProps?.product?.slug}` : `https://${pageProps?.website?.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/pages/${pageProps?.page?.slug}`}
                            />} */}
                            <ProgressBar />
                            <FadeInOutLayout>
                              <HomeLayout page={pageProps?.page}>
                                <Component key={router.asPath} {...pageProps} />
                              </HomeLayout>
                            </FadeInOutLayout>
                            <ToastContainer autoClose={2000} />
                            <ManagedModal website={pageProps?.website} />
                            <SidebarContainer page={pageProps?.page} website={pageProps?.website} />
                          </SearchProvider>
                          {/* <SocialLoginProvider /> */}
                          {/* </NextAuthProvider> */}
                        </UIProvider>
                      </CartProvider>
                    </ModalProvider>
                  </CustomerProvider>
                </SettingsProvider>
              </QueryClientProvider>
            </BlockchainWrapper>
          </SessionProvider>
        </MagicProvider>
      </ModalContextProvider>
    </ApolloProvider>
  );
}

export default appWithTranslation(CustomApp);
