import { useEffect, useState } from 'react';
// @mui
import {
  Container,
  Stack,
  Grid,
  Box,
  Button,
  Modal,
  Fade,
  Backdrop,
  TextField,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import {
  createColumn,
  setIndexTask,
  getBoard,
  persistColumn,
  persistCard,
} from '../../redux/slices/menu';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
import HeaderDashboard from '../../components/HeaderDashboard';
import { SkeletonKanbanColumn } from '../../components/skeleton';
// sections
import { KanbanColumn } from '../../sections/@dashboard/menu';
import {
  usePermissionQuery,
  useCreateOnePageMutation,
  useUpdateOneWebsiteMutation,
} from 'generated';
// ----------------------------------------------------------------------
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { addTask } from 'redux/slices/menu';
import { alpha, styled } from '@mui/material/styles';

import Iconify from '../../components/Iconify';

import { bannerPage } from './templates';
import { v4 as uuidv4 } from 'uuid';
import { gql, useQuery, useMutation } from '@apollo/client';
import ThemeProvider from 'theme'

Menu.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------
const TitleStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  height: 44,
  color: 'inherit',
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const CoverImgStyle = styled('img')(({ theme }) => ({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
}));

const CardMediaStyle = styled('div')(({ theme }) => ({
  position: 'relative',
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  '&:disabled': {
    color: 'white',
    background: '#B8B8B8',
  },
}));

const templates = [
  {
    id: '1',
    title: 'Simple',
    cover:
      'https://picsum.photos/200/300',
    pages: [],
    menu: {}
  },
];

const Template = ({ board, closeModal }) => {
  const [selected, setSelected] = useState(null);
  const dispatch = useDispatch();
  const [createPage] = useMutation(gql`mutation createOnePage($data: PageCreateInput!) {
    createOnePage(data: $data) {
      id
      name
      slug
      description
      imageObj
    }
  }`)
  // const [createPage] = useCreateOnePageMutation();
  const [updateWebsite] = useUpdateOneWebsiteMutation();
  const { t } = useTranslation('menu');

  return (
    <div className="flex flex-col max-h-[80vh]">
      <div className="flex align-center mb-4">
        <Iconify icon={'lucide:layout'} width={20} height={20} />
        <Typography sx={{ flexGrow: 1, marginLeft: 1.5, marginRight: 1.5, color: '#4B5971' }}>
          {t('WebsiteAdmin.Menu.importTemplate')}
        </Typography>
        <Button sx={{ minWidth: 'unset' }} onClick={closeModal}>
          <Iconify icon={'la:times'} sx={{ width: 20, height: 20 }} />
        </Button>
      </div>
      <Box sx={{ overflow: 'auto' }}>
        <Grid
          container
          rowSpacing={3}
          columnSpacing={3}
          sx={{
            overflow: 'auto',
          }}
        >
          {templates.map((template, index) => (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <Card
                className={selected === template.id ? 'card-select' : ''}
                sx={{
                  '&.card-select': {
                    border: '4px solid #212B36',
                    '& .pictute': {
                      filter: 'unset',
                    },
                    '& .card-selectedTag': {
                      opacity: 1,
                    },
                  },
                  border: '4px solid transparent',
                  position: 'relative',
                  ':hover .pictute:after': {
                    bgcolor: (theme) => alpha(theme.palette.grey[900], 0),
                  },
                }}
                onClick={() => setSelected(template.id)}
              >
                <CardMediaStyle
                  className="pictute"
                  sx={{
                    pt: 'calc(100% * 5 / 4)',
                    filter: 'grayscale(1)',
                    transition: 'all 0.3s ease-in-out 0s',
                    '&:after': {
                      top: 0,
                      content: "''",
                      width: '100%',
                      height: '100%',
                      position: 'absolute',
                      // bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
                      // filter: 'grayscale(1)',
                      transition: 'background-color 0.3s ease',
                    },
                  }}
                >
                  <CoverImgStyle
                    alt={template?.title}
                    src={template?.cover ? template.cover : '/static/placeholder.svg'}
                  />
                </CardMediaStyle>

                <CardContent
                  sx={{
                    py: 1,
                    px: 2,
                    bottom: 0,
                    width: '100%',
                    position: 'absolute',
                    cursor: 'pointer',
                    bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
                    '&:last-child': {},
                  }}
                >
                  <TitleStyle
                    sx={{
                      color: 'common.white',
                    }}
                  >
                    {template?.title}
                  </TitleStyle>
                </CardContent>

                <Box
                  className="card-selectedTag"
                  sx={{
                    opacity: 0,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -100%)',
                    transition: 'opacity 0.3s ease 0s',
                    margin: 'auto',
                    display: 'flex',
                    background: '#212B36',
                    color: '#ffffff',
                    borderRadius: '10px',
                    padding: '2px 16px',
                    alignItems: 'center',
                  }}
                >
                  <Iconify icon={'eva:checkmark-circle-outline'} width={20} height={20} />
                  <Typography sx={{ flexGrow: 1, marginLeft: 1 }}>
                    {t('WebsiteAdmin.Menu.selected')}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <div className="text-center mt-8">
        <SubmitButton
          variant="contained"
          disabled={!selected}
          onClick={async () => {
            const { data: pageData } = await createPage({
              variables: {
                data: {
                  name: 'testPage',
                  description: 'testDescription',
                  content: bannerPage,
                },
              },
            });

            // create column
            const newColumnId = uuidv4();
            const newColumnWithId = {
              name: 'banner',
              id: newColumnId,
              cardIds: [pageData.createOnePage.id],
            };
            const menu = {
              ...board,
              cards: [...Object.values(board.cards), pageData.createOnePage],
              columnOrder: [...board.columnOrder, newColumnId],
              columns: [...Object.values(board.columns), newColumnWithId],
            };
            const { data: websiteData } = await updateWebsite({
              variables: {
                where: {
                  id: board.id,
                },
                data: {
                  menu,
                },
              },
            });
            dispatch(getBoard(board.id));

            closeModal();
          }}
        >
          <Iconify icon={'eva:checkmark-fill'} width={20} height={20} />
          {t('WebsiteAdmin.Menu.import')}
        </SubmitButton>
      </div>
    </div>
  );
};

const PageSelectView = ({ closeModal, pages, addNew, column }) => {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('');
  const dispatch = useDispatch();
  const { t } = useTranslation('menu');
  const { board } = useSelector((state) => state.menu);

  return (
    <div>
      <div className="flex align-center">
        <Typography sx={{ flexGrow: 1, marginLeft: 1.5, marginRight: 1.5, color: '#4B5971' }}>
          {t('WebsiteAdmin.Menu.selectPage')}
        </Typography>
        <Button sx={{ minWidth: 'unset' }} onClick={closeModal}>
          <Iconify icon={'la:times'} sx={{ width: 20, height: 20 }} />
        </Button>
      </div>

      <div className="my-[10px]">
        <TextField
          label={t('WebsiteAdmin.Menu.filter')}
          style={{ width: '100%' }}
          size="small"
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        />
      </div>
      <List
        className="border-[1px] border-solid border-lightgrey mb-[10px]"
        sx={{ maxHeight: '40vh', overflow: 'auto' }}
      >
        {pages?.length === 0 && (
          <div style={{ margin: '10px' }}>
            <div>{t('WebsiteAdmin.Menu.page.empty.1')}</div>
            <Button
              component="a"
              sx={{
                textDecoration: 'underline',
                padding: 0,
                fontSize: '16px',
                '&:hover': { background: 'transparent', textDecoration: 'underline' },
              }}
              onClick={addNew}
            >
              {t('WebsiteAdmin.Menu.page.empty.2')}
            </Button>
          </div>
        )}
        {pages?.length > 0 && pages?.filter((item) => item.name.includes(filter))?.length === 0 && (
          <div style={{ margin: '10px' }}>
            {t('WebsiteAdmin.Menu.empty')} {filter}
          </div>
        )}
        {pages
          ?.filter((item) => item.name.includes(filter))
          .map((item, index) => {
            return (
              <ListItemButton
                onClick={() => {
                  setSelected(item);
                }}
                key={index}
                selected={selected?.id === item.id}
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            );
          })}
      </List>
      <div className="mt-2">
        <Button onClick={addNew}>{t('WebsiteAdmin.Menu.createPage')}</Button>
      </div>
      <div className="text-center mt-8">
        <SubmitButton
          variant="contained"
          disabled={!selected}
          onClick={async () => {
            if (!Object.keys(board.cards).find((cardId) => cardId === selected.id)) {
              dispatch(addTask({ board, card: selected, columnId: column.id }));
            } else {
              alert(t('WebsiteAdmin.Menu.pageExistInNav'));
            }
            closeModal();
          }}
        >
          <Iconify icon={'eva:checkmark-fill'} width={20} height={20} />
          {t('WebsiteAdmin.Menu.add')}
        </SubmitButton>
      </div>
    </div>
  );
};

const NewPage = ({ closeModal, column, goBack }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const { board } = useSelector((state) => state.menu);
  const [createPage] = useMutation(gql`mutation createOnePage($data: PageCreateInput!) {
    createOnePage(data: $data) {
      id
      name
      slug
      description
      imageObj
    }
  }`)
  // const [createPage] = useCreateOnePageMutation();
  const dispatch = useDispatch();
  const { t } = useTranslation('menu');

  return (
    <div>
      <div className="flex align-center">
        <Iconify icon={'akar-icons:file'} sx={{ width: 20, height: 20 }} />
        <Typography sx={{ flexGrow: 1, marginLeft: 1.5, marginRight: 1.5, color: '#4B5971' }}>
          {t('WebsiteAdmin.Menu.addPage')}
        </Typography>
        <Button sx={{ minWidth: 'unset' }} onClick={closeModal}>
          <Iconify icon={'la:times'} sx={{ width: 20, height: 20 }} />
        </Button>
      </div>

      <div className="my-4">
        <TextField
          label={t('WebsiteAdmin.Menu.page.placehold.name')}
          fullWidth
          size="small"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div className="my-4">
        <TextField
          label={t('WebsiteAdmin.Menu.page.placehold.description')}
          fullWidth
          size="small"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </div>
      <div className="flex justify-between" style={{ marginTop: '32px', textAlign: 'center' }}>
        <Button onClick={goBack}>{t('WebsiteAdmin.Menu.goBack')}</Button>
        <SubmitButton
          variant="contained"
          disabled={name?.length === 0}
          onClick={async () => {
            const { data } = await createPage({
              variables: {
                data: {
                  name,
                  description,
                  website: {
                    connect: {
                      id: board?.id,
                    },
                  },
                },
              },
            });
            dispatch(addTask({ card: data?.createOnePage, board, columnId: column.id }));

            closeModal();
          }}
        >
          <Iconify icon={'eva:checkmark-fill'} width={20} height={20} />
          {t('WebsiteAdmin.Menu.create')}
        </SubmitButton>
        <div className="w-[64px]"></div>
      </div>
    </div>
  );
};

const NewMenu = ({ closeModal }) => {
  const [name, setName] = useState('');
  const { board } = useSelector((state) => state.menu);
  const dispatch = useDispatch();
  const { t } = useTranslation('menu');
  return (
    <div>
      <div className="flex align-center">
        <Iconify icon={'prime:bars'} width={20} height={20} />
        <Typography sx={{ flexGrow: 1, marginLeft: 1.5, marginRight: 1.5, color: '#4B5971' }}>
          {t('WebsiteAdmin.Menu.addMenu')}
        </Typography>
        <Button sx={{ minWidth: 'unset' }} onClick={closeModal}>
          <Iconify icon={'la:times'} sx={{ width: 20, height: 20 }} />
        </Button>
      </div>
      <div className="my-4">
        <TextField
          label={t('WebsiteAdmin.Menu.menu.placehold.name')}
          fullWidth
          size="small"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div className="mt-2 text-center">
        <SubmitButton
          variant="contained"
          onClick={async () => {
            dispatch(createColumn({ newColumn: { name }, board }));
            closeModal();
          }}
        >
          <Iconify icon={'eva:checkmark-fill'} width={20} height={20} />
          {t('WebsiteAdmin.Menu.create')}
        </SubmitButton>
      </div>
    </div>
  );
};

const ConfirmSetIndex = ({ closeModal, selectedCard }) => {
  const { t } = useTranslation('menu');
  const { board } = useSelector((state) => state.menu);
  const dispatch = useDispatch();

  const setIndex = () => {
    const cards = { ...board.cards };
    Object.keys(board.cards).forEach((key) => {
      const card = { ...cards[key] };
      card.isIndex = key === selectedCard.id ? true : null;
      cards[key] = card;
    });

    dispatch(
      setIndexTask({
        board,
        cards,
      })
    );

    closeModal();
  };

  return (
    <div className="flex" style={{ margin: '-24px', width: 'calc(100% + 48px)' }}>
      <Box sx={{ flexShrink: 0, padding: '12px' }}>
        <Box
          sx={{
            padding: '10px',
            borderRadius: '12px',
          }}
        >
          <Iconify icon={'bx:home-alt'} width={20} height={20} />
        </Box>
      </Box>
      <Box sx={{ flexGrow: 1, alignSelf: 'center' }}>
        {t('WebsiteAdmin.Menu.message.setIndex').replace('%page', selectedCard.name)}
      </Box>
      <Box
        sx={{
          flexShrink: 0,
          width: '64px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderLeft: '1px solid rgba(145, 158, 171, 0.24)',
        }}
      >
        <Box
          sx={{
            width: '100%',
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          onClick={closeModal}
        >
          {t('WebsiteAdmin.Menu.no')}
        </Box>
        <Box
          sx={{
            width: '100%',
            // color: '#6851FF',
            borderTop: '1px solid rgba(145, 158, 171, 0.24)',
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          onClick={setIndex}
        >
          {t('WebsiteAdmin.Menu.yes')}
        </Box>
      </Box>
    </div>
  );
};

export default function Menu({ refetchWebsite, setNextPage, setDesignView }) {
  const dispatch = useDispatch();

  const { board, isLoading } = useSelector((state) => state.menu);

  const { data: permissionData } = usePermissionQuery();
  const { data: pagesData, refetch: refetchPage } = useQuery(gql`
    query findManyPage($where: PageWhereInput) {
      findManyPage(where: $where) {
        id
        name
        description
        slug
      }
    }
  `);
  const [view, setView] = useState(null);
  const [indexCard, setIndexCard] = useState(null);
  const [column, setColumn] = useState(null);
  const { t } = useTranslation('menu');

  useEffect(() => {
    console.log('refetch', board, refetchWebsite, isLoading)

    if (refetchWebsite && board && !isLoading) {
      refetchWebsite()
    }
  }, [board])

  useEffect(() => {
    if (permissionData?.permission?.Website) {
      dispatch(getBoard(permissionData?.permission?.Website));
    }
  }, [dispatch, permissionData]);

  const onDragEnd = (result) => {
    // Reorder card
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    if (type === 'column') {
      const newColumnOrder = Array.from(board.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      dispatch(persistColumn({ newColumnOrder, board }));
      return;
    }

    const start = board.columns[source.droppableId];
    const finish = board.columns[destination.droppableId];

    if (start.id === finish.id) {
      const updatedCardIds = [...start.cardIds];
      updatedCardIds.splice(source.index, 1);
      updatedCardIds.splice(destination.index, 0, draggableId);

      const updatedColumn = {
        ...start,
        cardIds: updatedCardIds,
      };

      dispatch(
        persistCard({
          columns: {
            ...board.columns,
            [updatedColumn.id]: updatedColumn,
          },
          board,
        })
      );
      return;
    }

    const startCardIds = [...start.cardIds];
    startCardIds.splice(source.index, 1);
    const updatedStart = {
      ...start,
      cardIds: startCardIds,
    };

    const finishCardIds = [...finish.cardIds];
    finishCardIds.splice(destination.index, 0, draggableId);
    const updatedFinish = {
      ...finish,
      cardIds: finishCardIds,
    };

    dispatch(
      persistCard({
        columns: {
          ...board.columns,
          [updatedStart.id]: updatedStart,
          [updatedFinish.id]: updatedFinish,
        },
        board,
      })
    );
  };

  const getViewWidth = () => {
    if (view) {
      switch (view) {
        case 'template':
          return 720;
        case 'page':
        case 'new_page':
        case 'new_menu':
        case 'set_index':
          return 500;
        default:
          break;
      }
    }
    return 400;
  };

  const renderView = () => {
    switch (view) {
      case 'template':
        return <Template board={board} closeModal={() => setView(null)} />;
      case 'page':
        return (
          <PageSelectView
            column={column}
            pages={pagesData?.findManyPage.filter((page) => {
              if (!board?.cards?.[page.id]) {
                return true;
              }
              return false;
            })}
            addNew={() => setView('new_page')}
            closeModal={() => setView(null)}
          />
        );
      case 'new_page':
        return (
          <NewPage
            column={column}
            closeModal={() => setView(null)}
            goBack={() => setView('page')}
          />
        );
      case 'new_menu':
        return <NewMenu column={column} closeModal={() => setView(null)} />;
      case 'set_index':
        return <ConfirmSetIndex selectedCard={indexCard} closeModal={() => setView(null)} />;
      default:
        return <></>;
    }
  };

  return (
    <ThemeProvider>

      <Page title={t('WebsiteAdmin.Menu.title')} sx={{ height: 1 }}>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={!!view}
          onClose={() => setView(null)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={!!view}>
            <Box
              className="w-[90vw] sm:w-full"
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                maxWidth: getViewWidth(),
                bgcolor: 'background.paper',
                borderRadius: '10px',
                boxShadow: 24,
                p: 3,
                outline: 'none',
              }}
            >
              {renderView()}
            </Box>
          </Fade>
        </Modal>
        <Container maxWidth={false} sx={{ height: 1 }}>
          <HeaderDashboard
            heading={t('WebsiteAdmin.Menu.title')}
            description={t('WebsiteAdmin.Menu.description')}
            links={[
              {
                name: 'Website',
                href: '/admin/Website/Website/Menu',
              },
              { name: 'Menu' },
            ]}
            buttons={[]}
          />
          <Box sx={{ display: 'flex', columnGap: '12px', marginBottom: '40px' }}>
            {/* <Button
            variant="contained"
            style={{ backgroundColor: '#6851FF' }}
            onClick={async () => {
              setView('template');
            }}
          >
            {t('WebsiteAdmin.Menu.template')}
          </Button> */}
            <Button
              variant="contained"
              onClick={async () => {
                if (board.columnOrder.length === 5) {
                  alert(t('WebsiteAdmin.Menu.5MenuMax'))
                } else {
                  setView('new_menu');
                }
              }}
            >
              {t('WebsiteAdmin.Menu.addMenu')}
            </Button>
          </Box>
          <Box sx={{ overflow: 'auto' }}>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="all-columns" direction="horizontal" type="column">
                {(provided) => (
                  <Stack
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    direction="row"
                    alignItems="flex-start"
                    spacing={3}
                  >
                    {isLoading ? (
                      <SkeletonKanbanColumn />
                    ) : (
                      board?.columnOrder?.map((columnId, index) => (
                        <KanbanColumn
                          setDesignView={setDesignView}
                          setNextPage={setNextPage}
                          setView={setView}
                          setIndexCard={setIndexCard}
                          setColumn={setColumn}
                          index={index}
                          key={columnId}
                          column={board.columns[columnId]}
                        />
                      ))
                    )}

                    {provided.placeholder}
                  </Stack>
                )}
              </Droppable>
            </DragDropContext>
          </Box>
        </Container>
      </Page>
    </ThemeProvider>

  );
}
