// i18n
import '../locales/i18n';

// highlight
import '../utils/highlight';

// scroll bar
import 'simplebar/src/simplebar.css';

// lightbox
import 'react-image-lightbox/style.css';

// map
import 'mapbox-gl/dist/mapbox-gl.css';

// editor
import 'react-quill/dist/quill.snow.css';

// slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';

// fullcalendar
import '@fullcalendar/common/main.min.css';
import '@fullcalendar/daygrid/main.min.css';

import cookie from 'cookie';
import { ReactElement, ReactNode, useRef } from 'react';
// next
import { NextPage } from 'next';
import Head from 'next/head';
import App, { AppProps, AppContext } from 'next/app';
//
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
// @mui
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
// redux
import { store, persistor } from '../redux/store';
// utils
import { getSettings } from '../utils/settings';
import { SettingsValueProps } from '../components/settings/type';
// contexts
import { SettingsProvider } from '../contexts/SettingsContext';
import { CollapseDrawerProvider } from '../contexts/CollapseDrawerContext';
// theme
import ThemeProvider from '../theme';
// components
import Settings from '../components/settings';
import { ChartStyle } from '../components/chart';
import RtlLayout from '../components/RtlLayout';
import ProgressBar from '../components/ProgressBar';
import ThemeColorPresets from '../components/ThemeColorPresets';
import NotistackProvider from '../components/NotistackProvider';
import ThemeLocalization from '../components/ThemeLocalization';
import MotionLazyContainer from '../components/animate/MotionLazyContainer';

// Check our docs
// https://docs-minimals.vercel.app/authentication/ts-version

// import { AuthProvider } from '../contexts/JWTContext';
// import { AuthProvider } from '../contexts/AwsCognitoContext';
// import { AuthProvider } from '../contexts/Auth0Context';
// import { AuthProvider } from '../contexts/FirebaseContext';
import { useApollo } from 'utils/apollo';
import { ApolloProvider } from '@apollo/client';
import { AuthProvider as MagicProvider } from 'server/magic/components/AuthProvider';
// import { AuthProvider as SessionProvider } from 'contexts/SessionContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ModalContextProvider } from 'server/magic/components/Modal';
import { appWithTranslation } from 'next-i18next';
import BlockchainWrapper from 'components/BlockchainWrapper';
// import { EditionProvider } from 'contexts/EditionContext';
import { EditionProvider } from 'contexts/EditionContext';

// import 'magic/styles/globals.css';
import 'assets/main.css';
import { AnimatePresence, motion } from 'framer-motion'

// ----------------------------------------------------------------------

const pageVariants = {
  pageInitial: {
    backgroundColor: 'black',
    filter: `invert()`,
    opacity: 0
  },
  pageAnimate: {
    backgroundColor: 'transparent',
    filter: ``,
    opacity: 1
  },
  pageExit: {
    backgroundColor: 'black',
    filter: `invert()`,
    opacity: 0
  }
}

const pageMotionProps = {
  initial: 'pageInitial',
  animate: 'pageAnimate',
  exit: 'pageExit',
  variants: pageVariants
}

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface MyAppProps extends AppProps {
  settings: SettingsValueProps;
  Component: NextPageWithLayout;
}

function MyApp(props: MyAppProps) {
  const { Component, pageProps } = props;
  const settings = getSettings({});

  const apolloClient = useApollo(pageProps.initialApolloState);
  const queryClientRef = useRef<any>();


  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  const getLayout = Component.getLayout ?? ((page) => page);

  return (


    <AnimatePresence exitBeforeEnter>
      <motion.div  {...pageMotionProps}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <PersistGate loading={null} persistor={persistor}>
          <ReduxProvider store={store}>
            <QueryClientProvider client={queryClientRef.current}>
              <ApolloProvider client={apolloClient}>
                <BlockchainWrapper>
                  <EditionProvider>
                    <ModalContextProvider>
                      <MagicProvider>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <CollapseDrawerProvider>
                            <SettingsProvider defaultSettings={settings}>
                              <ThemeProvider>
                                <NotistackProvider>
                                  <MotionLazyContainer>
                                    <ThemeColorPresets>
                                      <ThemeLocalization>
                                        <RtlLayout>
                                          <ChartStyle />
                                          {/* <Settings /> */}
                                          <ProgressBar />
                                          {getLayout(<Component {...pageProps} />)}
                                        </RtlLayout>
                                      </ThemeLocalization>
                                    </ThemeColorPresets>
                                  </MotionLazyContainer>
                                </NotistackProvider>
                              </ThemeProvider>
                            </SettingsProvider>
                          </CollapseDrawerProvider>
                        </LocalizationProvider>
                      </MagicProvider>
                    </ModalContextProvider>
                  </EditionProvider>
                </BlockchainWrapper>
              </ApolloProvider>
            </QueryClientProvider>
          </ReduxProvider>
        </PersistGate>
      </motion.div>
    </AnimatePresence>

  );
}

export default appWithTranslation(MyApp);

// ----------------------------------------------------------------------

// MyApp.getInitialProps = async (context: AppContext) => {
//   const appProps = await App.getInitialProps(context);

//   const cookies = cookie.parse(
//     context.ctx.req ? context.ctx.req.headers.cookie || '' : document.cookie
//   );

//   const settings = getSettings(cookies);

//   return {
//     ...appProps,
//     settings,
//   };
// };
