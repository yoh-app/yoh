import { ReactNode } from 'react';
import { isString } from 'lodash';
// material
import { Box, Typography, Link, Button, Grid, Avatar } from '@mui/material';
//
import NextLink from 'next/link';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { CardContent, Card } from '@mui/material';
import HeaderBreadcrumbs, { BreadcrumbsProps } from './HeaderBreadcrumbs';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import ArticleIcon from '@mui/icons-material/Article';
import CollectionsIcon from '@mui/icons-material/Collections';
import DatasetLinkedIcon from '@mui/icons-material/DatasetLinked';
import ArtTrackIcon from '@mui/icons-material/ArtTrack';
import AppsIcon from '@mui/icons-material/Apps';
import Shop2Icon from '@mui/icons-material/Shop2';
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
interface HeaderDashboardProps extends BreadcrumbsProps {
  action?: ReactNode;
  heading: string;
  moreLink?: string | string[];
}

const NftNav = ({ model }) => {
  const router = useRouter()
  const { t } = useTranslation('admin')
  let pages = []
  if (model?.name === 'Product') {
    pages = [
      // {
      //   name: 'Overview',
      //   Icon: AppsIcon,
      //   path: '/admin/Website/Website/Nft'
      // },
      // {
      //   name: t('nft'),
      //   Icon: Shop2Icon,
      //   path: '/admin/Website/Website/Product'
      // }, 
      {
        name: t('video'),
        Icon: VideoFileIcon,
        path: '/admin/Website/Website/Video'
      }, {
        name: t('audio'),
        Icon: AudioFileIcon,
        path: '/admin/Website/Website/Audio'
      },
      {
        name: t('link'),
        Icon: DatasetLinkedIcon,
        path: '/admin/Website/Website/Link'
      }, {
        name: t('document'),
        Icon: ArticleIcon,
        path: '/admin/Website/Website/Document'
      }, {
        name: t('picture'),
        Icon: CollectionsIcon,
        path: '/admin/Website/Website/Picture'
      }, {
        name: t('page'),
        Icon: ArtTrackIcon,
        path: '/admin/Website/Website/Page'
      }]
  } else {
    pages = [
      {
        name: t('nft'),
        Icon: Shop2Icon,
        path: '/admin/Website/Website/Product'
      },
    ]
  }

  return <div>
    <Typography variant="subtitle1">
      {t('product.embeddableContent')}
    </Typography>
    <div style={{ display: 'flex', overflowX: 'scroll' }}>
      {pages.map((page) => {
        const Icon = page.Icon
        return <NextLink href={page.path}><a><Box sx={{
          margin: '10px', background: 'white', borderRadius: '5px',
          // boxShadow: '0 0 25px rgb(0 0 0 / 8%)',
          ":hover": {
            boxShadow: '0 0 25px rgb(0 0 0 / 8%)',
          }
        }}>
          <div style={{ ...router?.pathname?.includes(page.path) ? { border: '1px solid black' } : undefined, borderRadius: '5px', paddingTop: '20px', height: '100px', width: '100px', textAlign: 'center', }}>
            <Avatar sx={{ marginLeft: 'auto', marginRight: 'auto' }}>
              <Icon />
            </Avatar>
            <div>{page.name}</div>
          </div>

        </Box></a></NextLink>
      })}

      {/* <div style={{ height: '100px', width: '100px', background: 'white' }}>NFT</div>
    <div style={{ height: '100px', width: '100px', background: 'white' }}>Video</div>
    <div style={{ height: '100px', width: '100px', background: 'white' }}>Audio</div>
    <div style={{ height: '100px', width: '100px', background: 'white' }}>Picture</div>
    <div style={{ height: '100px', width: '100px', background: 'white' }}>Link</div>
    <div style={{ height: '100px', width: '100px', background: 'white' }}>Document</div> */}

    </div></div>
}

export default function HeaderDashboard({
  model,
  links,
  action,
  heading,
  description,
  moreLink = '' || [],
  buttons,
  sx,
  enableBack,
  enableBreadcumbs,
  record,
  ...other
}: HeaderDashboardProps) {
  const router = useRouter()
  const { t } = useTranslation('admin')
  const isNftNav = (model?.name === 'Product')
  return (
    <Box sx={{
      ...sx,
    }}>
      {enableBack && (
        <Button size='small' style={{ marginBottom: '15px' }} onClick={() => {
          history.back()
        }}>
          <ArrowBackIosIcon /> {t('back')}
        </Button>
      )}

      <Grid container> <Grid item>
        {(action === 'update' || action === 'view') && model?.fields.find((field) => field?.name === 'imageObj') && <img style={{ borderRadius: '5px', marginRight: '15px', height: '200px', maxWidth: '200px', objectFit: 'cover' }} src={record?.imageObj?.url ? record.imageObj?.url : '/images/placeholder.svg'} />}</Grid>
        <Grid item>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ flexGrow: 1 }}>
              {/* <Grid container> */}
              {/* <Grid xs={6} item> */}
              <Typography sx={{ mt: 3, mb: 3 }} variant="h4" gutterBottom>
                {heading}
              </Typography>
              {enableBreadcumbs && (
                <HeaderBreadcrumbs links={links} {...other} style={{ marginTop: '15px' }} />
              )}
              {/* </Grid> */}

              {/* <Grid style={{ textAlign: 'right' }} xs={6} item> */}
              {/* </Grid> */}
              {/* </Grid> */}

              <Typography sx={{ mb: 3 }} variant="p">{description}</Typography>
              <Box sx={{ mb: 3 }}>
                {buttons?.map((button, index) => {
                  const Button = button;
                  return <Button key={index} />;
                })}
              </Box>
            </Box>

            {/* {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>} */}
          </Box>
        </Grid></Grid>

      {/* {isNftNav && <NftNav model={model} />} */}

      {/* <Box sx={{ mt: 2 }}>
            {isString(moreLink) ? (
              <NextLink href={moreLink}>
                <Link href={moreLink} target="_blank" variant="body2">
                  {moreLink}
                </Link>
              </NextLink>
            ) : (
              moreLink.map((href) => (
                <NextLink href={href}>
                  <Link noWrap key={href} href={href} variant="body2" target="_blank" sx={{ display: 'table' }}>
                    {href}
                  </Link>
                </NextLink>
              ))
            )}
          </Box> */}

    </Box>
  );
}
