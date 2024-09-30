import Slider from 'react-slick';
// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Card, Button, CardContent, Typography } from '@mui/material';
// _mock_
import { _ecommerceNewProducts } from '_mock';
// components
import Image from 'components/Image';
import { CarouselDots } from 'components/carousel';
import NextLink from 'next/link';
import { useTranslation } from 'next-i18next'
// ----------------------------------------------------------------------

const OverlayStyle = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 8,
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.64),
}));

// ----------------------------------------------------------------------
const nftIdeas = [{
  name: 'nftIdeas.music.name',
  description: 'nftIdeas.music.description',
  image: 'https://cdn.pixabay.com/photo/2018/06/17/10/38/artist-3480274_1280.jpg',
}, {
  name: 'nftIdeas.vlog.name',
  description: 'nftIdeas.vlog.description',
  image: 'https://cdn.pixabay.com/photo/2022/05/27/09/15/gimbal-stabilizer-7224727_1280.jpg'
}, {
  name: 'nftIdeas.animation.name',
  description: 'nftIdeas.animation.description',
  image: 'https://cdn.pixabay.com/photo/2015/01/11/07/08/moe-595961_1280.jpg'
}, {
  name: 'nftIdeas.tutorial.name',
  description: 'nftIdeas.tutorial.description',
  image: 'https://cdn.pixabay.com/photo/2018/10/22/18/02/teacher-3765909_1280.jpg'
}, {
  name: "nftIdeas.coupon.name",
  description: "nftIdeas.coupon.description",
  image: 'https://cdn.pixabay.com/photo/2016/11/22/19/08/hangers-1850082_1280.jpg'
}, {
  name: "nftIdeas.drive.name",
  description: "nftIdeas.drive.description",
  image: 'https://cdn.pixabay.com/photo/2018/03/19/02/57/technology-3238905_1280.jpg'
}]
export default function EcommerceNewProducts() {
  const theme = useTheme();
  const settings = {
    speed: 1000,
    dots: true,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    ...CarouselDots({ position: 'absolute', right: 24, bottom: 24, color: 'white' }),
  };

  return (
    <Card sx={{
      ":hover": {
        boxShadow: '0 0 25px rgb(0 0 0 / 60%)',
      },
    }}>
      <Slider {...settings}>
        {nftIdeas.map((item) => (
          <CarouselItem key={item.name} item={item} />
        ))}
      </Slider>
    </Card>
  );
}

// ----------------------------------------------------------------------

type CarouselItemProps = {
  item: {
    image: string;
    name: string;
  };
};

function CarouselItem({ item }: CarouselItemProps) {
  const { image, name, description } = item;
  const { t } = useTranslation('admin')

  return (
    <NextLink href='/admin/Website/Website/Product'>
      <a>
        <Box sx={{ position: 'relative' }}>
          <CardContent
            sx={{
              left: 0,
              bottom: 0,
              zIndex: 9,
              maxWidth: '80%',
              position: 'absolute',
              color: 'common.white',
            }}
          >
            <Typography variant="h3" sx={{ mt: 1, mb: 3 }}>
              {t(name)}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1, mb: 3 }}>
              {t(description)}
            </Typography>
            {/* <NextLink href='/admin/Website/Website/Product'>
              <Button size='large' style={{ padding: '25px', fontSize: '16px', marginTop: '10px', background: 'white', color: 'black' }}>{t('onboard.button.viewMyNFts')}</Button>
            </NextLink> */}
            {/* <Button style={{ backgroundColor: 'white', color: 'black' }} size='large' variant="contained">View my NFTs</Button> */}
          </CardContent>
          <OverlayStyle />
          <Image alt={t(name)} src={image} sx={{ height: '350px' }} />
        </Box>
      </a>
    </NextLink>
  );
}
