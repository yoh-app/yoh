import { useEffect, useState } from 'react';
import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
// _mock_
import { _homePlans } from '../../_mock';
// components
// import { varFade, MotionViewport } from '../../components/animate';
// i18n
import { useTranslation } from "next-i18next";

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// ----------------------------------------------------------------------

const BGStyle = styled(m.div)(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: '#212B36',
  height: '90%',
  [theme.breakpoints.up('lg')]: {
    height: '80%',
  },
}));

// ----------------------------------------------------------------------

export default function HomeHero() {
  const { t } = useTranslation("landing");
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  const handleResize = (event: Event) => {
    setInnerWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div id="about" className="relative min-h-fit">
      <BGStyle />
      <Carousel
        autoPlay={true}
        className="w-full"
        indicators={true}
        swipe={true}
        navButtonsAlwaysVisible={true}
        height="800px"
        animation="fade"
        PrevIcon={<ArrowBackIosIcon sx={{ width: '30px', height: '30px' }} />}
        NextIcon={<ArrowForwardIosIcon sx={{ width: '30px', height: '30px' }} />}
        navButtonsProps={{
          style: {
            marginTop: innerWidth < 959 ? '-250px' : '50%',
            backgroundColor: 'transparent',
            color: 'rgba(255, 255, 255, 0.18)',
          },
        }}
        indicatorIconButtonProps={{
          style: {
            padding: '10px',
            marginTop: '2rem',
            marginBottom: '1rem'
          }
        }}
        activeIndicatorIconButtonProps={{
          style: {
            color: '#6851FF'
          }
        }}
      >
        {
          Array(3).fill('').map((_, index) => {
            const key = index + 1;
            return (
              <Grid key={key} container className="h-full flex relative"
                sx={{
                  flexDirection: {
                    'xs': 'column',
                    'md': 'row'
                  },
                  flexWrap: 'unset',
                  alignItems: 'center'
                }}>
                <Grid item xs={12} md={5} className="lg:h-full w-2/3">
                  <img className="ml-auto mr-[30px] h-full mt-[24px] md:mt-0 w-[100%] md:w-[70%]" src={`/images/about${key}.svg`} />
                </Grid>
                <Grid item xs={12} md={7} className="px-[20px] md:pl-[30px] md:pr-[80px]"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: {
                      'xs': 'flex-start',
                      'md': 'flex-end'
                    },
                    paddingTop: {
                      'xs': '24px',
                      'md': '0px'
                    }
                  }}>
                  <h1 className="text-[#D18873] font-semibold">{t(`WebsiteAdmin.LandingPage.About.${key}.Feature`)}</h1>
                  <p className="mt-6 text-[36px] text-white whitespace-pre">
                    {t(`WebsiteAdmin.LandingPage.About.${key}.Title`)}
                  </p>
                  <p className="text-xl font-semibold text-white mt-6 pb-4">
                    {t(`WebsiteAdmin.LandingPage.About.${key}.Context`)}
                  </p>
                </Grid>
              </Grid>
            )
          })
        }
      </Carousel>
    </div>
  );
}
