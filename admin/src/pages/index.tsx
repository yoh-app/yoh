// @mui
import { styled } from '@mui/material/styles';
// layouts
import Layout from '../layouts';
// components
import Page from '../components/Page';
// sections
import { HomeHero, HomeFeatures, HomeAbout, HomePrice, HomeWhoWeAre, HomeRoadMap } from '../sections/home';
// i18n
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect } from 'react';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(() => ({
  height: '100%',
}));

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------

// HomePage.getLayout = function getLayout(page: React.ReactElement) {
//   return <Layout variant="main">{page}</Layout>;
// };

// ----------------------------------------------------------------------

export default function HomePage() {
  useEffect(() => {
    window.location.assign('/admin')
  }, [])
  return (
    <></>
  );
}

export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['landing'])),
    },
  };
};