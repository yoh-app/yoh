import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import Image from 'next/image';
import { useRouter } from 'next/router'
// @mui
import { Paper, Typography, Box, Grid, MenuItem, IconButton, Chip } from '@mui/material';
// @types
import { KanbanCard } from '../../../@types/kanban';
// components
import Iconify from '../../../components/Iconify';
import MenuPopover from '../../../components/MenuPopover';
import { useTranslation } from 'next-i18next';

import Link from 'next/link';
// ----------------------------------------------------------------------

type KanbanTaskCardProps = {
  card: KanbanCard;
  onSetIndex: (id: string) => void;
  onDeleteTask: (id: string) => void;
  index: number;
};

export default function KanbanTaskCard({ card, onSetIndex, onDeleteTask, index, setNextPage, setDesignView }: KanbanTaskCardProps) {
  const router = useRouter()
  const [open, setOpen] = useState(null);
  const { t } = useTranslation('menu');

  const handleClose = () => {
    setOpen(null);
  };

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleEditTask = (card) => {
    router.push(`/admin/Website/Website/DesignPage?id=${card.id}`)
  }
  return (
    <Draggable draggableId={card?.id} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <Paper
            sx={{
              p: 1,
              width: 1,
              position: 'relative',
              backgroundColor: '#F8F8F8',
              boxShadow: (theme) => theme.customShadows.z1,
              // '&:hover': {
              //   boxShadow: (theme) => theme.customShadows.z16,
              // },
            }}
          >
            <Grid container>
              <Grid xs={3} item>
                <Box sx={{ display: 'flex', borderRadius: '10px', overflow: 'hidden', marginRight: '12px', width: '60px' }}>
                  <Image
                    src={card?.imageObj?.url! ?? '/images/image-empty.svg'}
                    alt={card?.name}
                    layout="fixed"
                    width={60}
                    height={60}
                    style={{ display: 'flex' }}
                    className="product-image"
                  />
                </Box>
              </Grid>
              <Grid xs={7} item>
                <Grid container direction="column" sx={{ height: '100%' }}>
                  <Grid item>
                    <Box sx={{ cursor: 'pointer' }}>
                      <Typography
                        noWrap
                        variant="subtitle2"
                        sx={{
                          fontSize: '16px',
                          lineHeigth: 1.5,
                          transition: (theme) =>
                            theme.transitions.create('opacity', {
                              duration: theme.transitions.duration.shortest,
                            }),
                          ...(card?.completed && { opacity: 0.48 }),
                        }}
                      >
                        {card?.name}
                      </Typography>
                      <Chip color={card?.requests?.length > 0 ? 'warning' : 'default'} style={{ marginLeft: '5px', marginBottom: '5px' }} label={`${t('WebsiteAdmin.Menu.ads')}: ${card?.requests?.length || 0}`} />
                      <Chip color={card?.products?.length > 0 ? 'info' : 'default'} style={{ marginLeft: '5px', marginBottom: '5px' }} label={`${t('WebsiteAdmin.Menu.tokenGate')}: ${card?.products?.length || 0}`} />
                      <Chip color={card?.password?.length > 0 ? 'error' : 'default'} style={{ marginLeft: '5px', marginBottom: '5px' }} label={card?.password?.length > 0 ? t('WebsiteAdmin.Menu.passwordProtected') : t('WebsiteAdmin.Menu.publicPage')} />
                    </Box>
                  </Grid>

                </Grid>
              </Grid>
              <Grid xs={2}>
                <IconButton size="small" onClick={() => { onSetIndex(card) }} sx={{ color: card?.isIndex ? '#000000' : '#B8B8B8' }}>
                  <Iconify icon={'bx:home-alt'} width={20} height={20} />
                </IconButton>
                {/* <Link href={`/admin/Website/Website/DesignPage?id=${card.id}`}> */}
                <IconButton onClick={() => {
                  setDesignView('exit_design')
                  setNextPage(`/admin/Website/Website/DesignPage?id=${card.id}`)
                }} size="small" sx={{ color: '#B8B8B8' }}>
                  <Iconify icon={'lucide:edit-2'} width={20} height={20} />
                </IconButton>
                {/* </Link> */}
                <IconButton size="small" onClick={handleOpen} sx={{ color: '#B8B8B8' }}>
                  <Iconify icon={'eva:more-horizontal-fill'} width={20} height={20} />
                </IconButton>
                <MenuPopover
                  open={Boolean(open)}
                  anchorEl={open}
                  onClose={handleClose}
                  sx={{ py: 1, px: 0, width: 'auto', mt: 1 }}
                >
                  {/* <Link href={`/admin/Website/Website/Page/?update=${card.id}`}> */}
                  <MenuItem onClick={() => {
                    setDesignView('exit_design')
                    setNextPage(`/admin/Website/Website/Page/?update=${card.id}`)
                  }} sx={{ py: 0.75, px: 1.5, '&:hover': { backgroundColor: 'rgba(118, 53, 220, 0.08)' } }}>
                    <Iconify icon={'lucide:info'} sx={{ width: 20, height: 20, flexShrink: 0, mr: 1 }} />
                    {t("WebsiteAdmin.Menu.editBasicInfo")}
                  </MenuItem>
                  <MenuItem onClick={() => onDeleteTask(card)} sx={{ py: 0.75, px: 1.5, '&:hover': { backgroundColor: 'rgba(118, 53, 220, 0.08)' } }}>
                    <Iconify icon={'la:times'} sx={{ width: 20, height: 20, flexShrink: 0, mr: 1 }} />
                    {t("WebsiteAdmin.Menu.remove")}
                  </MenuItem>
                </MenuPopover>
              </Grid>
            </Grid>
          </Paper>
        </div>
      )}
    </Draggable>
  );
}
