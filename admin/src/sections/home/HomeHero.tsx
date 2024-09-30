import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Container } from '@mui/material';
// routes
import { PATH_MAGIC } from '../../routes/paths';
// components
import { MotionContainer, varFade } from '../../components/animate';
// i18n
import { useTranslation } from "next-i18next";
// next
import Link from 'next/link';

// ----------------------------------------------------------------------

const RootStyle = styled(m.div)(({ theme }) => ({
  position: 'relative',
  marginBottom: '120px'
}));

const BGStyle = styled(m.div)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: '10%',
  backgroundImage: 'linear-gradient(159.02deg, #D7D0FF 16.43%, #F8EEE7 91.45%)',
  [theme.breakpoints.up('md')]: {
    bottom: '15%'
  }
}));

const PixiteStyle = styled(m.span)(({ theme }) => ({
  backgroundImage: 'linear-gradient(338deg, #3512B2 28%, #D18873 74%)',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
}))

// ----------------------------------------------------------------------

export default function HomeHero() {
  const { t } = useTranslation("landing");

  return (
    <MotionContainer>
      <RootStyle>
        <div className="relative z-1">
          <BGStyle />
          <m.h1 variants={varFade().in} className="relative text-center pt-[100px] m-[auto] md:w-[35vw] text-[36px] md:text-[48px] font-semibold">
            {t('WebsiteAdmin.LandingPage.Hero.Slogan')} <PixiteStyle>Pixite</PixiteStyle>
          </m.h1>
          <Container className="relative">
            <m.p variants={varFade().inUp} className="text-center px-[16px] mt-[36px] text-[18px] md:text-[20px]">
              {t('WebsiteAdmin.LandingPage.Hero.Introduction.1')} <br/>
              {t('WebsiteAdmin.LandingPage.Hero.Introduction.2')}
            </m.p>

            <m.div variants={varFade().inUp} className="text-center mt-[33px]">
              <Link href={PATH_MAGIC.login}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: '#6851FF'}}
                >
                  {t('WebsiteAdmin.LandingPage.Button.GetStarted')}
                </Button>
              </Link>
            </m.div>

            <m.div variants={varFade().inUp} className="mt-[28px] md:mt-0">
              <img className="mx-auto" src="/images/hero.svg" />
            </m.div>
          </Container>
        </div>
      </RootStyle>
    </MotionContainer>
  );
}
