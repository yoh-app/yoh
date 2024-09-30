import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';
// _mock_
import { _homePlans } from '../../_mock';
import { url } from 'inspector';
// components
import { varFade, MotionViewport } from '../../components/animate';
// i18n
import { useTranslation } from "next-i18next";

// ----------------------------------------------------------------------

const RootStyle = styled(m.div)(({ theme }) => ({
  position: 'relative',
}));

const BGStyle = styled(m.div)(({ theme }) => ({
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
  position: 'absolute',
  top: 0,
  bottom: 0,
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    transform: 'scale(1.1)',
  },
}));

const BGLeftStyle = styled(BGStyle)(({ theme }) => ({
  backgroundImage: "url('/images/section-bg-left.svg')",
  backgroundPosition: 'left',
  [theme.breakpoints.down('sm')]: {
    right: '-1.25rem',
  },
}));

const BGRightStyle = styled(BGStyle)(({ theme }) => ({
  backgroundImage: "url('/images/section-bg-right.svg')",
  backgroundPosition: 'right',
  [theme.breakpoints.down('sm')]: {
    left: '-1.25rem',
  },
}));

const EmphasisStyle = styled(m.span)(({ theme }) => ({
  backgroundImage: 'linear-gradient(338deg, #3512B2 39%, #D18873 85%)',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
}));

// ----------------------------------------------------------------------

export default function HomeHero() {
  const { t } = useTranslation("landing");

  return (
    <div id="features" className="min-h-screen">
      <RootStyle />
      <MotionViewport className="relative md:h-[600px]">
        <BGRightStyle />
        <Grid container className="relative h-full flex items-center pb-[140px] sm:pb-0">
          <Grid item xs={12} sm={6} className="md:px-[50px] h-full">
            <m.img variants={varFade().in} src="/images/builder.png" />
          </Grid>
          <Grid item xs={12} sm={6} className="px-[20px] md:px-[100px]">
            <m.h1 variants={varFade().inLeft} className="md:text-[36px] text-[28px] leading-[68px]">{t('WebsiteAdmin.LandingPage.Features.Builder.Title')} <EmphasisStyle>{t('WebsiteAdmin.LandingPage.Features.Builder.Title.Emphasis')}</EmphasisStyle></m.h1>
            <m.p variants={varFade().inUp} className="mt-2 font-semibold md:text-[20px] text-[18px] leading-[30px]">
              {t('WebsiteAdmin.LandingPage.Features.Builder.Context')}
            </m.p>
          </Grid>
        </Grid>
      </MotionViewport>
      <MotionViewport className="relative md:h-[600px]">
        <BGLeftStyle />
        <Grid
          sx={{ flexDirection: { xs: 'column-reverse', md: 'row' } }}
          container
          className="relative h-full flex items-center pb-[140px] sm:pb-0"
        >
          <Grid item xs={12} sm={6} className="px-[20px] md:px-[100px]">
            <m.h1 variants={varFade().inRight} className="md:text-[36px] text-[28px] leading-[68px]">{t('WebsiteAdmin.LandingPage.Features.Commerce.Title')} <EmphasisStyle>{t('WebsiteAdmin.LandingPage.Features.Commerce.Title.Emphasis')}</EmphasisStyle></m.h1>
            <m.p variants={varFade().inUp} className="mt-2 font-semibold md:text-[20px] text-[18px] leading-[30px]">
              {t('WebsiteAdmin.LandingPage.Features.Commerce.Context')}
            </m.p>
          </Grid>
          <Grid item xs={12} sm={6} className="md:px-[50px] h-full">
            <m.img className="h-full" variants={varFade().in} src="/images/commerce.png" />
          </Grid>
        </Grid>
      </MotionViewport>
      <MotionViewport className="relative md:h-[600px]">
        <BGRightStyle />
        <Grid container className="relative h-full flex items-center pb-[140px] sm:pb-0">
          <Grid item xs={12} sm={6} className="md:px-[50px] h-full">
            <m.img className="h-full" variants={varFade().in} src="/images/collaboration.png" />
          </Grid>
          <Grid item xs={12} sm={6} className="px-[20px] md:px-[100px]">
            <m.h1 variants={varFade().inLeft} className="md:text-[36px] text-[28px] leading-[68px]">
              <EmphasisStyle>{t('WebsiteAdmin.LandingPage.Features.Request.Title.Emphasis')}</EmphasisStyle>
              {' ' + t('WebsiteAdmin.LandingPage.Features.Request.Title')}
            </m.h1>
            <m.p variants={varFade().inUp} className="mt-2 font-semibold md:text-[20px] text-[18px] leading-[30px]">
              {t('WebsiteAdmin.LandingPage.Features.Request.Context')}
            </m.p>
          </Grid>
        </Grid>
      </MotionViewport>
    </div>
  );
}
