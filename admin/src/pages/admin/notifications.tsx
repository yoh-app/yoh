import { noCase } from 'change-case';
import { useContext, useState, useEffect } from 'react';
// @mui
import {
  Box,
  List,
  Card,
  Chip,
  TablePagination,
  Avatar,
  Typography,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
// utils
// import { fDateTimeSuffix } from 'utils/formatTime';

import {
  useFindManyNotificationCountQuery,
  useFindManyNotificationQuery,
  useUpdateManyNotificationMutation,
  usePermissionQuery,
} from 'generated';
import _ from 'lodash';
import HeaderDashboard from '../../components/HeaderDashboard';
import DashboardLayout from 'layouts/admin';
import Page from 'components/Page';
import { Container } from '@mui/material';
import AdminGuard from 'guards/AdminGuard';
import { WebsiteMenu, UserMenu } from 'layouts/admin/menuItem';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { format } from 'date-fns';

import { TableContext } from 'admin/PrismaTable/Context';

// ----------------------------------------------------------------------

export default function Notifications() {
  const { data: permissionData } = usePermissionQuery();
  const { t } = useTranslation('notification');
  const context = useContext(TableContext);
  const { pageSize } = context;

  const [page, setPage] = useState({
    size: pageSize,
    index: 0,
  });

  const permission = permissionData?.permission;

  const { data: pageCount } = useFindManyNotificationCountQuery({
    variables: {
      where: {
        [_.lowerFirst(permission?.admin)]: {
          id: {
            equals: permission && permission[permission?.admin],
          },
        },
      },
    },
    skip: !permission || permission?.admin === 'Public',
  });

  const [updateManyNotification] = useUpdateManyNotificationMutation();
  const { data } = useFindManyNotificationQuery({
    variables: {
      where: {
        [_.lowerFirst(permission?.admin)]: {
          id: {
            equals: permission && permission[permission?.admin],
          },
        },
      },
      skip: page.index * page.size,
      take: page.size,
      orderBy: {
        createdAt: 'desc'
      }
    },
    skip: !permission || permission?.admin === 'Public',
  });

  // console.log('pageCount',pageCount.findManyNotificationCount());

  const [notifications, setNotifications] = useState([]);
  const totalUnRead = notifications.filter((item) => item.isUnRead === true).length;

  const handleMarkAllAsRead = async () => {
    await updateManyNotification({
      variables: {
        where: {
          isUnRead: {
            equals: true,
          },
        },
        data: {
          isUnRead: {
            set: false,
          },
        },
      },
    });
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        isUnRead: false,
      }))
    );
  };

  useEffect(() => {
    if (data?.findManyNotification.find((notification) => notification.isUnRead)) {
      updateManyNotification({
        variables: {
          where: {
            isUnRead: {
              equals: true,
            },
          },
          data: {
            isUnRead: {
              set: false,
            },
          },
        },
      });
    }
  }, [data])

  const handlePageChange = (event, newIndex) => {
    setPage({
      index: newIndex,
      size: page.size,
    });
  };
  const handleRowPerPageChange = (event) => {
    setPage({
      index: 0,
      size: event?.target.value,
    });
  };

  useEffect(() => {
    if (data?.findManyNotification) {
      setNotifications(data.findManyNotification);
    }
  }, [data]);

  return (
    <AdminGuard>
      <DashboardLayout menu={permission?.admin === 'Website' ? WebsiteMenu : UserMenu}>
        <Page>
          <Container>
            <Box>
              <HeaderDashboard
                heading="Notifications"
                heading={t('WebsiteAdmin.NotificationPage.pageTitle')}
                description={t('WebsiteAdmin.NotificationPage.pageDescription')}
                links={[
                  {
                    name: 'Website admin',
                    href: '/admin/notifications',
                  },
                  { name: 'Notification' },
                ]}
                buttons={[]}
              />

              <Card className="py-6 px-10">
                <List
                  disablePadding
                  subheader={
                    <ListSubheader
                      disableSticky
                      sx={{ px: 0, mb: '12px', typography: 'overline', fontSize: '18px' }}
                    >
                      {t('WebsiteAdmin.NotificationPage.list.titleNew')}
                    </ListSubheader>
                  }
                >
                  {notifications
                    .filter((notification) => notification?.isUnRead).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .map((notification) => (
                      <NotificationItem key={notification.id} notification={notification} />
                    ))}
                </List>
                <List
                  disablePadding
                  subheader={
                    <ListSubheader
                      disableSticky
                      sx={{ px: 0, mt: 3, mb: '12px', typography: 'overline', fontSize: '18px' }}
                    >
                      {t('WebsiteAdmin.NotificationPage.list.titleBefore')}
                    </ListSubheader>
                  }
                >
                  {notifications
                    .filter((notification) => !notification?.isUnRead).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .map((notification) => (
                      <NotificationItem key={notification.id} notification={notification} />
                    ))}
                </List>
                <div className="flex justify-end">
                  <TablePagination
                    component="div"
                    sx={{
                      border: 'none',
                      '.MuiToolbar-root': {
                        minHeight: 'unset',
                        height: 'fit-content',
                      },
                    }}
                    count={pageCount?.findManyNotificationCount || 0}
                    page={page.index}
                    onPageChange={handlePageChange}
                    rowsPerPage={page.size}
                    onRowsPerPageChange={handleRowPerPageChange}
                  />
                </div>
              </Card>
            </Box>
          </Container>
        </Page>
      </DashboardLayout>
    </AdminGuard>
  );
}

// ----------------------------------------------------------------------

type NotificationItemProps = {
  id: string;
  title: string;
  description: string;
  avatar: string | null;
  type: string;
  createdAt: Date;
  isUnRead: boolean;
};

function NotificationItem({ notification }: { notification: NotificationItemProps }) {
  const { avatar, description } = renderContent(notification);

  return (
    <Link href={notification.url}>
      <ListItemButton
        sx={{
          py: 1.5,
          px: 2.5,
          borderRadius: '8px',
        }}
      >
        <ListItemAvatar sx={{ mr: '32px' }}>
          <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
        </ListItemAvatar>
        <ListItemText primary={description} />
      </ListItemButton>
    </Link>
  );
}

// ----------------------------------------------------------------------

const useChipStyles = makeStyles((_) => ({
  label: {
    padding: '1px 8px',
  },
}));

function renderContent(notification: NotificationItemProps) {
  const chipClasses = useChipStyles({});

  let tagStyle = {};
  switch (notification.model) {
    case 'Request':
      tagStyle = {
        color: '#0C53B7',
        background: 'rgba(12, 83, 183, 0.16)',
      };
      break;
    case 'Order':
      tagStyle = {
        color: '#39AB97',
        background: 'rgba(57, 171, 151, 0.16)',
      };
      break;
    default:
      break;
  }
  const description = (
    <div className="flex justify-between">
      <Typography component="span" sx={{ color: 'text.secondary', flexGrow: 1 }}>
        {notification.description}
      </Typography>
      <Typography component="span" sx={{ minWidth: '70px', textAlign: 'center' }}>
        <Chip
          sx={{ height: 'fit-content', borderRadius: '6px', ...tagStyle }}
          label={notification.title}
          classes={chipClasses}
        />
      </Typography>
      <Typography component="span" sx={{ minWidth: '70px', pl: '80px' }}>
        {format(new Date(notification.createdAt), 'yyyy-MM-dd HH:mm')}
      </Typography>
    </div>
  );

  if (notification.type === 'order_placed') {
    return {
      avatar: (
        <img
          alt={notification.title}
          src="https://minimal-assets-api.vercel.app/assets/icons/ic_notification_package.svg"
        />
      ),
      description,
    };
  }
  if (notification.type === 'order_shipped') {
    return {
      avatar: (
        <img
          alt={notification.title}
          src="https://minimal-assets-api.vercel.app/assets/icons/ic_notification_shipping.svg"
        />
      ),
      description,
    };
  }
  if (notification.type === 'mail') {
    return {
      avatar: (
        <img
          alt={notification.title}
          src="https://minimal-assets-api.vercel.app/assets/icons/ic_notification_mail.svg"
        />
      ),
      description,
    };
  }
  if (notification.type === 'chat_message') {
    return {
      avatar: (
        <img
          alt={notification.title}
          src="https://minimal-assets-api.vercel.app/assets/icons/ic_notification_chat.svg"
        />
      ),
      description,
    };
  }
  return {
    avatar: notification.avatar ? <img alt={notification.title} src={notification.avatar} /> : null,
    description,
  };
}

export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['notification', 'generated', 'admin'])),
    },
  };
};
