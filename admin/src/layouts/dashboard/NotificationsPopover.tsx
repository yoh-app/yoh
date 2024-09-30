import faker from 'faker';
import { noCase } from 'change-case';
import { useRef, useState, useEffect } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
import NextLink from 'next/link';
import { set, sub, formatDistanceToNow } from 'date-fns';
import { Icon } from '@iconify/react';
import bellFill from '@iconify/icons-eva/bell-fill';
import clockFill from '@iconify/icons-eva/clock-fill';
import doneAllFill from '@iconify/icons-eva/done-all-fill';
// material
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  ListItemButton,
  Typography,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
} from '@mui/material';
// utils
import { mockImgAvatar } from '../../utils/mockImages';
// components
import Scrollbar from '../../components/Scrollbar';
import MenuPopover from '../../components/MenuPopover';
import { MIconButton } from '../../components/@material-extend';
import {
  useFindManyNotificationQuery,
  useUpdateManyNotificationMutation,
  usePermissionQuery,
} from 'generated';
// import Cookies from 'js-cookie';
import _ from 'lodash';
// ----------------------------------------------------------------------

// const NOTIFICATIONS = [
//   {
//     id: faker.datatype.uuid(),
//     title: 'Your order is placed',
//     description: 'waiting for shipping',
//     avatar: null,
//     type: 'order_placed',
//     createdAt: set(new Date(), { hours: 10, minutes: 30 }),
//     isUnRead: true,
//   },
//   {
//     id: faker.datatype.uuid(),
//     title: faker.name.findName(),
//     description: 'answered to your comment on the Minimal',
//     avatar: mockImgAvatar(2),
//     type: 'friend_interactive',
//     createdAt: sub(new Date(), { hours: 3, minutes: 30 }),
//     isUnRead: true,
//   },
//   {
//     id: faker.datatype.uuid(),
//     title: 'You have new message',
//     description: '5 unread messages',
//     avatar: null,
//     type: 'chat_message',
//     createdAt: sub(new Date(), { days: 1, hours: 3, minutes: 30 }),
//     isUnRead: false,
//   },
//   {
//     id: faker.datatype.uuid(),
//     title: 'You have new mail',
//     description: 'sent from Guido Padberg',
//     avatar: null,
//     type: 'mail',
//     createdAt: sub(new Date(), { days: 2, hours: 3, minutes: 30 }),
//     isUnRead: false,
//   },
//   {
//     id: faker.datatype.uuid(),
//     title: 'Delivery processing',
//     description: 'Your order is being shipped',
//     avatar: null,
//     type: 'order_shipped',
//     createdAt: sub(new Date(), { days: 3, hours: 3, minutes: 30 }),
//     isUnRead: false,
//   },
// ];

type TNotificationPopover = {
  id: string;
  title: string;
  description: string;
  avatar: string | null;
  type: string;
  createdAt: Date;
  isUnRead: boolean;
};

function renderContent(notification: TNotificationPopover) {
  const title = (
    <Typography variant="subtitle2">
      {notification.title}
      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; {noCase(notification.description)}
      </Typography>
    </Typography>
  );

  if (notification.type === 'order_placed') {
    return {
      avatar: <img alt={notification.title} src="/static/icons/ic_notification_package.svg" />,
      title,
    };
  }
  if (notification.type === 'order_shipped') {
    return {
      avatar: <img alt={notification.title} src="/static/icons/ic_notification_shipping.svg" />,
      title,
    };
  }
  if (notification.type === 'mail') {
    return {
      avatar: <img alt={notification.title} src="/static/icons/ic_notification_mail.svg" />,
      title,
    };
  }
  if (notification.type === 'chat_message') {
    return {
      avatar: <img alt={notification.title} src="/static/icons/ic_notification_chat.svg" />,
      title,
    };
  }
  return {
    avatar: notification.avatar ? <img alt={notification.title} src={notification.avatar} /> : null,
    title,
  };
}

function NotificationItem({ notification }: { notification: TNotificationPopover }) {
  const { avatar, title } = renderContent(notification);

  return (
    <NextLink href={notification.url}>
      <ListItemButton
        disableGutters
        key={notification.id}
        sx={{
          py: 1.5,
          px: 2.5,
          '&:not(:last-of-type)': { mb: '1px' },
          ...(notification.isUnRead && {
            bgcolor: 'action.selected',
          }),
        }}
      >
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={title}
          secondary={
            <Typography
              variant="caption"
              sx={{
                mt: 0.5,
                display: 'flex',
                alignItems: 'center',
                color: 'text.disabled',
              }}
            >
              <Box component={Icon} icon={clockFill} sx={{ mr: 0.5, width: 16, height: 16 }} />
              {formatDistanceToNow(new Date(notification.createdAt))}
            </Typography>
          }
        />
      </ListItemButton>
    </NextLink>
  );
}

export default function NotificationsPopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const { data: permissionData } = usePermissionQuery();
  const permission = permissionData?.permission;
  // const permission = JSON.parse(Cookies.get('auth_permission'));
  const [updateManyNotification] = useUpdateManyNotificationMutation();
  const { data } = useFindManyNotificationQuery({
    variables: {
      where: {
        [_.lowerFirst(permission?.admin)]: {
          id: {
            equals: permission && permission[permission?.admin],
          },
        },
        isUnRead: {
          equals: true,
        },
      },
    },
    skip: !permission || permission?.admin === 'Public',
  });

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
    if (data?.findManyNotification) {
      setNotifications(data.findManyNotification);
    }
  }, [data]);

  return (
    <>
      <MIconButton
        ref={anchorRef}
        onClick={() => setOpen(true)}
        color={open ? 'primary' : 'default'}
      >
        <Badge badgeContent={totalUnRead} color="error">
          <Icon icon={bellFill} width={20} height={20} />
        </Badge>
      </MIconButton>

      <MenuPopover
        open={open}
        onClose={() => setOpen(false)}
        anchorEl={anchorRef.current}
        sx={{ width: 360 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {totalUnRead} unread messages
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title=" Mark all as read">
              <MIconButton color="primary" onClick={handleMarkAllAsRead}>
                <Icon icon={doneAllFill} width={20} height={20} />
              </MIconButton>
            </Tooltip>
          )}
        </Box>

        <Divider />

        {notifications.length > 0 && (
          <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
            <List
              disablePadding
              subheader={
                <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                  New
                </ListSubheader>
              }
            >
              {notifications.slice(0, 2).map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
            </List>

            <List
              disablePadding
              subheader={
                <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                  Before that
                </ListSubheader>
              }
            >
              {notifications.slice(2, 5).map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
            </List>
          </Scrollbar>
        )}

        {/* <Divider /> */}

        {/* <Box sx={{ p: 1 }}>
          <NextLink href={`/admin/${permission?.admin}/notification`}>
            <Button fullWidth disableRipple>
              View All
            </Button>
          </NextLink>
        </Box> */}
      </MenuPopover>
    </>
  );
}
