import { paramCase } from 'change-case';
// next
import NextLink from 'next/link';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Card, Avatar, Typography, CardContent, Link, Stack } from '@mui/material';
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
import FolderIcon from '@mui/icons-material/Folder';
import { useTranslation } from 'next-i18next'
// ----------------------------------------------------------------------

const OverlayStyle = styled('div')(({ theme }) => ({
  top: 0,
  zIndex: 1,
  width: '100%',
  height: '100%',
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.1),
}));

// ----------------------------------------------------------------------

type Props = {
  post: Post;
  index?: number;
};

export default function BlogPostCard({ utility, index }: Props) {
  const isDesktop = useResponsive('up', 'md');
  const { cover, title, view, comment, share, author, createdAt, description, linkTo, Icon, fileTypes, borderColor } = utility;
  return (
    <NextLink href={linkTo}>
      <a>
        <Card sx={{
          height: 360,
          border: `1px solid ${borderColor}`,
          ":hover": {
            boxShadow: '0 0 25px rgb(0 0 0 / 30%)',
          },
        }}>
          <Avatar sx={{
            zIndex: 9,
            top: 24,
            left: 24,
            width: 40,
            height: 40,
            position: 'absolute',
          }}>
            <Icon />
          </Avatar>
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
            title={title}
            view={view}
            comment={comment}
            share={share}
            createdAt={createdAt}
            index={index}
            description={description}
            fileTypes={fileTypes}
          />

          <Stack
            flexWrap="wrap"
            direction="row"
            justifyContent="flex-end"
            sx={{
              mt: 3,
              position: 'absolute',
              bottom: '30px',
              right: '30px'
              // color: 'text.disabled',
              // ...((latestPostLarge || latestPostSmall) && {
              //   opacity: 0.64,
              //   color: 'common.white',
              // }),
            }}
          >
            {fileTypes.map((fileType, index) => (
              <Typography
                key={index}
                variant={'caption'}
                sx={{ ml: index === 0 ? 0 : 1.5 }}
              >{fileType}</Typography>
            ))}
          </Stack>
          {/* <OverlayStyle /> */}
          {/*<Image alt="cover" src={cover} sx={{ height: 360 }} /> */}
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

export function PostContent({ title, description, view, comment, share, createdAt, index, fileTypes }: PostContentProps) {
  const isDesktop = useResponsive('up', 'md');
  const { t } = useTranslation('admin')
  // const linkTo = `${PATH_DASHBOARD.blog.root}/post/${paramCase(title)}`;

  // const latestPostLarge = index === 0;
  // const latestPostSmall = index === 1 || index === 2;

  const POST_INFO = [
    { number: comment, icon: 'eva:message-circle-fill' },
    { number: view, icon: 'eva:eye-fill' },
    { number: share, icon: 'eva:share-fill' },
  ];

  return (
    <CardContent
      sx={{
        width: 1,
        pt: 0,
        zIndex: 9,
        // bottom: 0,
        top: 80,
        position: 'absolute',
        // ...((latestPostLarge || latestPostSmall) && {
        //   pt: 0,
        //   zIndex: 9,
        //   bottom: 0,
        //   position: 'absolute',
        //   // color: 'common.white',
        // }),
      }}
    >
      {/* <NextLink href={linkTo} passHref> */}
      <Link color="inherit">
        <TextMaxLine
          variant={'h5'}
          line={2}
          persistent
        >
          {t(title)}
        </TextMaxLine>
      </Link>
      {/* </NextLink> */}
      <Typography
        gutterBottom
        variant="body1"
        component="div"
        sx={{
          color: 'text.disabled',
          // ...((latestPostLarge || latestPostSmall) && {
          //   opacity: 0.64,
          //   // color: 'common.white',
          // }),
        }}
      >
        {t(description)}
      </Typography>

    </CardContent>
  );
}
