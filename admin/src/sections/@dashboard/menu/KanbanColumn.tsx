import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';
// @mui
import { Paper, Stack, Button } from '@mui/material';
// redux
import { RootState, useDispatch } from '../../../redux/store';
import { deleteColumn, updateColumn, deleteTask } from '../../../redux/slices/menu';
// @types
import { KanbanColumn as Column } from '../../../@types/kanban';
//
import KanbanTaskCard from './KanbanTaskCard';
import KanbanColumnToolBar from './KanbanColumnToolBar';
// import KanbanAddTask from './KanbanTaskAdd';
import { useTranslation } from 'next-i18next';

// ----------------------------------------------------------------------

type KanbanColumProps = {
  column: Column;
  index: number;
};

export default function KanbanColumn({ column, index, setView, setColumn, setIndexCard, setNextPage, setDesignView }: KanbanColumProps) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { board } = useSelector((state: RootState) => state.menu);
  const { t } = useTranslation('menu');

  const { name, cardIds, id } = column;

  const handleOpenAddTask = () => {
    setColumn(column);
    setView('page');
  };

  const handleSetIndexTask = (card) => {
    setIndexCard(card);
    setView('set_index');
  }
  const handleDeleteTask = (card) => {
    const page = board?.cards[card.id]
    console.log(page, 'this is page')
    if (board.cards.length === 1) {
      alert(t('WebsiteAdmin.Menu.cantDeleteAllPages'))
    } else if (page.isIndex) {
      alert(t('WebsiteAdmin.Menu.cantDeleteIndexPage'))
    } else if (page?.requests?.length > 0) {
      alert(t('WebsiteAdmin.Menu.cantDeletePageWithActiveRequest'))
    } else {
      dispatch(deleteTask({ board, cardId: card.id, columnId: id }));
    }
  };

  const handleUpdateColumn = async (newName) => {
    try {
      if (newName !== name) {
        dispatch(updateColumn({ board, columnId: id, updateColumn: { ...column, name: newName } }));
        enqueueSnackbar('Update success!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteColumn = async () => {
    try {
      const columnPages = column.cardIds.map((cardId) => board?.cards?.[cardId])
      const indexPage = columnPages.find((columnPage) => columnPage.isIndex)
      if (board.columnOrder.length === 1) {
        alert(t('WebsiteAdmin.Menu.cantDeleteAllPages'))
      } else if (indexPage) {
        alert(t('WebsiteAdmin.Menu.cantDeleteIndexPage'))
      } else if (columnPages.find((columnPage) => columnPage?.requests?.length > 0)) {
        alert(t('WebsiteAdmin.Menu.cantDeletePageWithActiveRequest'))
      } else {
        dispatch(deleteColumn({ columnId: id, board }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <Paper
          {...provided.draggableProps}
          ref={provided.innerRef}
          variant="outlined"
          sx={{ px: 2, borderRadius: '14px', width: '100%', boxShadow: '0 0 2px 0 rgb(145 158 171 / 20%), 0 12px 24px -4px rgb(145 158 171 / 12%)' }}
        >
          <Stack spacing={3} {...provided.dragHandleProps}>
            <KanbanColumnToolBar
              columnName={name}
              onDelete={handleDeleteColumn}
              onUpdate={handleUpdateColumn}
            />

            <Droppable droppableId={id} type="task">
              {(provided) => (
                <Stack ref={provided.innerRef} {...provided.droppableProps} spacing={2}>
                  {cardIds.map((cardId, index) => (
                    <KanbanTaskCard
                      key={cardId}
                      onSetIndex={() => handleSetIndexTask(board?.cards[cardId])}
                      onDeleteTask={handleDeleteTask}
                      card={board?.cards[cardId]}
                      index={index}
                      setDesignView={setDesignView}
                      setNextPage={setNextPage}
                    />
                  ))}
                  {provided.placeholder}
                </Stack>
              )}
            </Droppable>

            <Stack spacing={2} sx={{ pb: 1.5 }}>
              <Button
                fullWidth
                size="large"
                color="inherit"
                onClick={handleOpenAddTask}
                sx={{ fontSize: 14 }}
              >
                <img className="inline align-baseline pr-[6px]" src="/icons/add.svg" />
                {t('WebsiteAdmin.Menu.addPage')}
              </Button>
            </Stack>
          </Stack>
        </Paper>
      )}
    </Draggable>
  );
}
