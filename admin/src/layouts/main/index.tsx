import { ReactNode } from 'react';
// next
import { useRouter } from 'next/router';
import Link from 'next/link'
// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Typography, Stack } from '@mui/material';
// components
import Logo from '../../components/Logo';
//
import MainFooter from './MainFooter';
import MainHeader from './MainHeader';

import SvgIcon from '../../components/SvgIcon';

import { useTranslation } from "next-i18next";

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
};

const TextStyle = styled('span')(({ theme }) => ({
  color: '#637381',
  cursor: 'pointer',
  margin: '2px 14px',
  alignSelf: 'center',
  fontSize: '16px',
  lineHeight: 1.5,
  '&:hover': {
    color: '#6851FF'
  },
}));

const IconLinkStyle = styled('a')(({ theme }) => ({
  color: '#B8B8B8',
  cursor: 'pointer',
  '&:hover': {
    color: '#6851FF'
  },
}));

export default function MainLayout({ children }: Props) {
  const { t } = useTranslation("landing");
  const { pathname } = useRouter();
  const isHome = pathname === '/';

  return (
    <Stack sx={{ minHeight: 1 }}>
      <MainHeader />

      {children}

      <Box sx={{ flexGrow: 1 }} />

      {!isHome ? (
        <MainFooter />
      ) : (
        <div className="md:pb-[170px] pb-[126px] bg-white">
          <Box
            sx={{
              textAlign: 'center',
              position: 'relative',
              bgcolor: 'background.default',
            }}
          >
            <Typography variant="caption" component="div" className="bg-[#F9F9F9] md:py-3">
              <div className="flex md:flex-row flex-col justify-between align-center md:pt-10 pt-[32px] md:pb-[54px] pb-[28px] px-[70px]">
                <div className="flex md:flex-row flex-col justify-center">
                  <Link href="#">
                    <TextStyle>
                      {t('WebsiteAdmin.LandingPage.Menu.FAQs')}
                    </TextStyle>
                  </Link>
                  <Link href="#">
                    <TextStyle>
                      {t('WebsiteAdmin.LandingPage.Menu.PrivacyNotice')}
                    </TextStyle>
                  </Link>
                  <Link href="#">
                    <TextStyle>
                      {t('WebsiteAdmin.LandingPage.Menu.TermsNConditions')}
                    </TextStyle>
                  </Link>
                  <Link href="#">
                    <TextStyle>
                      {t('WebsiteAdmin.LandingPage.Menu.Contact')}
                    </TextStyle>
                  </Link>
                </div>
                <div className="grid grid-cols-4 gap-5 mt-[32px] md:mt-0">
                  <IconLinkStyle href="#">
                    <SvgIcon src="/icons/facebook.svg" />
                  </IconLinkStyle>
                  <IconLinkStyle href="#">
                    <SvgIcon src="/icons/twitter.svg" />
                  </IconLinkStyle>
                  <IconLinkStyle href="#">
                    <SvgIcon src="/icons/discord.svg" />
                  </IconLinkStyle>
                  <IconLinkStyle href="#">
                    <SvgIcon src="/icons/instagram.svg" />
                  </IconLinkStyle>
                </div>
              </div>
              <span className="text-[18px] leading-[44px] text-[#B8B8B8]">© 2022 yoh.app.</span>
            </Typography>
          </Box>
        </div>
      )}
    </Stack>
  );
}
