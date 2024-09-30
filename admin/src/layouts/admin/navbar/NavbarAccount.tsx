// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Link, Typography, Avatar, Button } from '@mui/material';
// hooks
import useAuth from '../../../hooks/useAuth';
// routes
import { PATH_DASHBOARD, PATH_ADMIN } from '../../../routes/paths';
// components
import MyAvatar from '../../../components/MyAvatar';
import { usePermissionQuery, useLogoutAdminMutation, useFindUniqueWebsiteQuery } from 'generated';
import { setSession } from '../../../utils/jwt';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next'
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

const AccountStyle = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.grey[500_12],
}));

// ----------------------------------------------------------------------

type Props = {
  isCollapse: boolean | undefined;
};

export default function NavbarAccount({ isCollapse }: Props) {
  const { user } = useAuth();
  const { data } = usePermissionQuery();
  const permission = data?.permission;
  const [logoutAdmin] = useLogoutAdminMutation();
  const router = useRouter();
  const { t } = useTranslation('generated')
  const { t: tAdmin } = useTranslation('admin')
  const { data: websiteData } = useFindUniqueWebsiteQuery({
    variables: {
      where: {
        id: permission?.Website
      }
    },
    skip: !permission?.Website
  })
  return (
    <>
      <NextLink href={`${PATH_ADMIN.root}/${permission?.admin}`}>
        <a>
          <AccountStyle>
            <Avatar
              alt="My Avatar"
              src={
                permission?.imageObj?.url
                  ? permission?.imageObj?.url
                  : '/images/avatar-placeholder.svg'
              }
            />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {permission?.admin === 'User' ? permission?.email : permission?.name ? permission?.name : 'New'}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {t(`_Admin.${permission?.admin}._PageGroup.${permission?.admin}._Title`)}
              </Typography>
            </Box>
          </AccountStyle>
        </a>
      </NextLink>
      {data?.permission?.adminParent && (
        <div style={{ textAlign: 'center', marginBottom: '-30px' }}>
          <Button
            variant='contained'
            onClick={async () => {
              const { data } = await logoutAdmin();
              const token = data?.logoutAdmin?.token;
              setSession(token);
              window.location.assign(`/${router.locale}/admin`);
            }}
          >
            {tAdmin('backTo')} {t(`_Admin.${data?.permission?.adminParent}._PageGroup.${data?.permission?.adminParent}._Title`)}
          </Button>
        </div>
      )}
      {data?.permission?.admin === 'Website' && websiteData?.findUniqueWebsite?.slug && (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <a target="_blank" href={`https://${websiteData?.findUniqueWebsite?.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}`}>
            <Button
              variant='contained'
              onClick={async () => {
                // const { data } = await logoutAdmin();
                // const token = data?.logoutAdmin?.token;
                // setSession(token);
                // window.location.assign(`/${router.locale}/admin`);
              }}
            >
              {tAdmin('previewWebsite')}
            </Button>
          </a>
        </div>
      )}
    </>
  );
}
