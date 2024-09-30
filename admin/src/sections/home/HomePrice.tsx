import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Grid } from '@mui/material';
// _mock_
import { _homePlans } from '../../_mock';
// components
import { varFade, MotionViewport } from '../../components/animate';
// i18n
import { useTranslation } from "next-i18next";

const EmphasisStyle = styled(m.span)(({ theme }) => ({
  background: 'linear-gradient(93.15deg, #3512B2 -1.42%, #D18873 47.18%), #6851FF;',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
}));

const ItemTitleStyle = styled(m.div)(({ theme }) => ({
  textAlign: 'center',
  marginTop: '24px',
  fontWeight: 600,
  fontSize: '18px',
  lineHeight: '36px',
  whiteSpace: 'pre',
  [theme.breakpoints.up('md')]: {
    marginTop: '40px',
    fontSize: '20px',
    lineHeight: '46px',
  }
}));

const FeeCardStyle = styled(MotionViewport)(({ theme }) => ({
  height: '100%',
  background: '#ffffff',
  borderRadius: '28px',
  boxShadow: '0px 0px 11px 5px rgba(188, 182, 223, 0.2)',
  overflow: 'hidden',
  fontWeight: 600
}));

const FeeCardHeaderStyle = styled(m.div)(({ theme }) => ({
  padding: '38px 0 60px',
  textAlign: 'center',
  fontSize: '24px',
  lineHeight: '46px',
  color: '#ffffff',
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  '&:after': {
    content: '\"\"',
    position: 'absolute',
    background: '#6851FF',
    width: '110%',
    height: '90%',
    left: '-5%',
    top: '0',
    borderBottomLeftRadius: '50%',
    borderBottomRightRadius: '50%',
    zIndex: 0,
  },
  '&:before': {
    content: '\"\"',
    position: 'absolute',
    bottom: 0,
    borderWidth: '30px 25px 0 25px',
    borderColor: '#6851FF transparent',
    borderStyle: 'solid',
    zIndex: 0,
  }
}));
const FeeCardBodyStyle = styled(m.div)(({ theme }) => ({
  padding: '28px 18px 48px',
  [theme.breakpoints.up('md')]: {
    padding: '28px 44px 90px',
  }
}));
const FeeCardContextStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontSize: '18px',
  lineHeight: '30px',
  marginBottom: '16px',
  color: "#202020",
  [theme.breakpoints.up('md')]: {
    fontSize: '20px',
    fontWeight: 600
  }
}));
const FeeCardNoteStyle = styled('div')(({ theme }) => ({
  marginTop: '24px',
  fontSize: '16px',
  lineHeight: '30px',
  color: '#656565'
}));

export default function HomeWhoWeAre() {
  const { t } = useTranslation("landing");

  return (
    <div id="price" className="pt-[52px] pb-[70px] md:pt-[100px] md:pb-[150px] md:min-h-screen bg-[#F2F0FF] relative">
      <Container>
        <MotionViewport variants={varFade().inRight} className="md:text-[64px] text-[28px] font-medium md:mx-0 mx-[20px]">
          {t(`WebsiteAdmin.LandingPage.Price.Title.1`)}
          <EmphasisStyle>{t(`WebsiteAdmin.LandingPage.Price.Title.Emphasis`)}</EmphasisStyle>
          {t(`WebsiteAdmin.LandingPage.Price.Title.2`)}
        </MotionViewport>
        <div className="mt-[52px] md:my-[114px]">
          <Grid container spacing={6}>
            <Grid item component={MotionViewport} xs={12} md={4} sx={{ flexDirection: 'column' }}>
              <m.img variants={varFade().in} className="mx-auto md:w-auto w-[120px]" src="/images/websiteOrganize-white.svg" alt="website" />
              <ItemTitleStyle variants={varFade().inUp}>
                {t('WebsiteAdmin.LandingPage.Price.Item.1')}
              </ItemTitleStyle>
            </Grid>
            <Grid item component={MotionViewport} xs={12} md={4} sx={{ flexDirection: 'column' }}>
              <m.img variants={varFade().in} className="mx-auto md:w-auto w-[120px]" src="/images/userRequest-white.svg" alt="Request" />
              <ItemTitleStyle variants={varFade().inUp}>
                {t('WebsiteAdmin.LandingPage.Price.Item.2')}
              </ItemTitleStyle>
            </Grid>
            <Grid item component={MotionViewport} xs={12} md={4} sx={{ flexDirection: 'column' }}>
              <m.img variants={varFade().in} className="mx-auto md:w-auto w-[120px]" src="/images/websiteVault-white.svg" alt="Vault" />
              <ItemTitleStyle variants={varFade().inUp}>
                {t('WebsiteAdmin.LandingPage.Price.Item.3')}
              </ItemTitleStyle>
            </Grid>
          </Grid>
        </div>
        <div className="md:mt-[120px] mt-[60px]">
          <Grid container spacing={4}>
            <Grid item xs={12} md={5} sx={{ flexDirection: 'column' }}>
              <FeeCardStyle>
                <FeeCardHeaderStyle variants={varFade().in}>
                  <div className="relative z-10">{t('WebsiteAdmin.LandingPage.Price.Product.Title')}</div>
                </FeeCardHeaderStyle>
                <FeeCardBodyStyle variants={varFade().inUp}>
                  <FeeCardContextStyle>
                    <div>{t('WebsiteAdmin.LandingPage.Price.Transaction')}</div>
                    <div>3%</div>
                  </FeeCardContextStyle>
                  {/* <FeeCardContextStyle>
                    <div>{t('WebsiteAdmin.LandingPage.Price.Stripe')}</div>
                    <div>2.5%</div>
                  </FeeCardContextStyle> */}
                  <FeeCardContextStyle>
                    <div>{t('WebsiteAdmin.LandingPage.Price.Storage')}(each GB)</div>
                    <div>1 MATIC</div>
                  </FeeCardContextStyle>
                  <FeeCardNoteStyle>{t('WebsiteAdmin.LandingPage.Price.Product.Note')}</FeeCardNoteStyle>
                </FeeCardBodyStyle>
              </FeeCardStyle>
            </Grid>
            <Grid item xs={12} md={5} sx={{ flexDirection: 'column' }}>
              <FeeCardStyle>
                <FeeCardHeaderStyle variants={varFade().in}>
                  <div className="relative z-10">{t('WebsiteAdmin.LandingPage.Price.Request.Title')}</div>
                </FeeCardHeaderStyle>
                <FeeCardBodyStyle variants={varFade().inUp}>
                  <FeeCardContextStyle>
                    <div>{t('WebsiteAdmin.LandingPage.Price.Transaction')}</div>
                    <div>3%</div>
                  </FeeCardContextStyle>
                  <FeeCardNoteStyle>{t('WebsiteAdmin.LandingPage.Price.Request.Note')}</FeeCardNoteStyle>
                </FeeCardBodyStyle>
              </FeeCardStyle>
            </Grid>
          </Grid>
        </div>
        <MotionViewport className="md:absolute bottom-0 right-0 mt-[60px] md:mt-0 md:max-w-[40vw] hidden md:block">
          <m.img variants={varFade().in} className="mx-auto" src="/images/price.svg" alt="price image" />
        </MotionViewport>
      </Container>
    </div>
  )
}