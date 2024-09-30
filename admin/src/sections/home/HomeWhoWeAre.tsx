import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
// _mock_
import { _homePlans } from '../../_mock';
// components
import { varFade, MotionViewport } from '../../components/animate';
// i18n
import { useTranslation } from "next-i18next";

const WhoWeAreStyle = styled(m.h1)(({ theme }) => ({
  background: 'linear-gradient(93.15deg, #3512B2 -1.42%, #D18873 47.18%), #6851FF;',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  fontSize: '64px',
  width: 'fit-content',
  [theme.breakpoints.down('sm')]: {
    fontSize: '36px',
  },
}))

export default function HomeWhoWeAre() {
  const { t } = useTranslation("landing");

  return (
    <div className="py-[64px] md:min-h-screen flex items-center">
      <Container component={MotionViewport}>
        <m.div className="max-w-[900px] mx-auto" variants={varFade().inRight}>
          <WhoWeAreStyle>{t('WebsiteAdmin.LandingPage.WhoWeAre.Title')}</WhoWeAreStyle>
          <p className="text-[24px] md:text-[36px]">
            {t('WebsiteAdmin.LandingPage.WhoWeAre.Introduction.1')}<br/>
            {t('WebsiteAdmin.LandingPage.WhoWeAre.Introduction.2')}
          </p>
        </m.div>
      </Container>
    </div>
  )
}