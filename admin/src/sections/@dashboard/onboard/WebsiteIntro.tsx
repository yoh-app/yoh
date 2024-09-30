import { paramCase } from 'change-case';
// next
import NextLink from 'next/link';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Card, Avatar, Typography, CardContent, Link, Stack, Button } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// utils
import { fDate } from '../../../utils/formatTime';
import { fShortenNumber } from '../../../utils/formatNumber';
// @types
import { Post } from '../../../@types/blog';
// components
import Image from '../../../components/Image';
import Iconify from '../../../components/Iconify';
import TextMaxLine from '../../../components/TextMaxLine';
import SvgIconStyle from '../../../components/SvgIconStyle';
import TextIconLabel from '../../../components/TextIconLabel';
import { useTranslation } from 'next-i18next'
// ----------------------------------------------------------------------

const OverlayStyle = styled('div')(({ theme }) => ({
  top: 0,
  zIndex: 1,
  width: '100%',
  height: '100%',
  position: 'absolute',
  background: 'linear-gradient(to bottom, transparent 0%, black 100%)'
  // backgroundColor: alpha(theme.palette.grey[900], 0.8),
}));

// ----------------------------------------------------------------------

type Props = {
  post: Post;
  index?: number;
};

export default function BlogPostCard() {
  const isDesktop = useResponsive('up', 'md');
  const { t } = useTranslation('admin')

  const post = {
    id: '1',
    cover: '/images/nftIntro.png',
    title: 'websiteIntro.title',
    description: 'websiteIntro.description',
    // title: 'Package Multimedia into NFTs',
    //     description: 'Embed videos, audios, documents, links, pictures, and many other utilites into NFTs. Create from yoh.app or import from other platforms',
    createdAt: new Date(),
    view: 1343232,
    comment: 234324,
    share: 234234,
    favorite: 23423,
    author: {
      name: 'string',
      avatarUrl: 'string',
    },
  }
  const { cover, title, view, comment, share, author, createdAt, description } = post;

  return (
    <NextLink href='/admin/Website/Website/Editor'>
      <a>
        <Card sx={{
          ":hover": {
            boxShadow: '0 0 25px rgb(0 0 0 / 60%)',
          },
        }}>
          {/* <Avatar
          alt={author.name}
          src={author.avatarUrl}
          sx={{
            zIndex: 9,
            top: 24,
            left: 24,
            width: 40,
            height: 40,
            position: 'absolute',
          }}
        /> */}
          <PostContent
            title={t('websiteIntro.title')}
            view={view}
            comment={comment}
            share={share}
            createdAt={createdAt}
            description={t('websiteIntro.description')}
          />
          <OverlayStyle />
          <Image alt="cover" src={cover} sx={{ height: 350 }} />
        </Card>
      </a>
    </NextLink>
  );

}

// ----------------------------------------------------------------------

type PostContentProps = {
  title: string;
  view: number;
  comment: number;
  share: number;
  createdAt: Date | string | number;
  index?: number;
};

export function PostContent({ title, view, comment, share, createdAt, description }: PostContentProps) {
  const isDesktop = useResponsive('up', 'md');
  const linkTo = `${PATH_DASHBOARD.blog.root}/post/${paramCase(title)}`;

  const { t } = useTranslation('admin')

  const POST_INFO = [
    { number: comment, icon: 'eva:message-circle-fill' },
    { number: view, icon: 'eva:eye-fill' },
    { number: share, icon: 'eva:share-fill' },
  ];

  return (
    <CardContent
      sx={{
        // pt: 3,
        width: 1,
        // ...((latestPostLarge || latestPostSmall) && {
        zIndex: 9,
        bottom: 0,
        position: 'absolute',
        color: 'common.white',
        // }),
      }}
    >

      {/* <NextLink href={linkTo} passHref> */}
      {/* <Link color="inherit"> */}
      <TextMaxLine
        variant={'h3'}
        sx={{
          color: 'common.white',
          mb: 3
        }}
      >
        {title}
      </TextMaxLine>
      {/* </Link> */}
      {/* </NextLink> */}
      <Typography
        gutterBottom
        variant="body1"
        component="div"
        sx={{
          // color: 'text.disabled',
          // opacity: 0.64,
          color: 'common.white',
          mb: 3
        }}
      >
        {description}
      </Typography>
      <NextLink href='/admin/Website/Website/Editor'>
        <Button size='large' style={{ padding: '25px', fontSize: '16px', marginTop: '10px', background: 'white', color: 'black' }}>{t('onboard.button.editWebsite')}</Button>

      </NextLink>

      {/* <Stack
        flexWrap="wrap"
        direction="row"
        justifyContent="flex-end"
        sx={{
          mt: 3,
          color: 'text.disabled',
          // ...((latestPostLarge || latestPostSmall) && {
          opacity: 0.64,
          color: 'common.white',
          // }),
        }}
      >
        {POST_INFO.map((info, index) => (
          <TextIconLabel
            key={index}
            icon={<Iconify icon={info.icon} sx={{ width: 16, height: 16, mr: 0.5 }} />}
            value={fShortenNumber(info.number)}
            sx={{ typography: 'caption', ml: index === 0 ? 0 : 1.5 }}
          />
        ))}
      </Stack> */}
    </CardContent>
  );
}
