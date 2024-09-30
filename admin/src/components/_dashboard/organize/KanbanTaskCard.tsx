import { useState, ChangeEvent } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Icon } from '@iconify/react';
import checkmarkCircle2Outline from '@iconify/icons-eva/checkmark-circle-2-outline';
import radioButtonOffOutline from '@iconify/icons-eva/radio-button-off-outline';
// material
import { Paper, Typography, Box, Checkbox, Button, Chip } from '@mui/material';
// @types
import { KanbanCard } from '../../../@types/kanban';
//
import KanbanTaskDetails from './KanbanTaskDetails';
import { useRouter } from 'next/router';
import Link from 'next/link';
// ----------------------------------------------------------------------

type KanbanTaskCardProps = {
  card: KanbanCard;
  onDeleteTask: (id: string) => void;
  index: number;
};

export default function KanbanTaskCard({ card, onDeleteTask, index }: KanbanTaskCardProps) {
  const { name, link, itemType } = card;
  const [openDetails, setOpenDetails] = useState(false);
  const [completed, setCompleted] = useState(card.completed);
  const router = useRouter();
  const handleOpenDetails = () => {
    setOpenDetails(true);
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
  };

  const handleChangeComplete = (event: ChangeEvent<HTMLInputElement>) => {
    setCompleted(event.target.checked);
  };

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <Paper
            sx={{
              px: 2,
              width: 1,
              position: 'relative',
              boxShadow: (theme) => theme.customShadows.z1,
              '&:hover': {
                boxShadow: (theme) => theme.customShadows.z16,
              },
              // ...(imageObj && {
              //   pt: 2,
              // }),
            }}
          >
            <Box sx={{ cursor: 'pointer' }}>
              {/*imageObj && (
                <Box
                  sx={{
                    pt: '60%',
                    borderRadius: 1,
                    overflow: 'hidden',
                    position: 'relative',
                    transition: (theme) =>
                      theme.transitions.create('opacity', {
                        duration: theme.transitions.duration.shortest,
                      }),
                    ...(completed && {
                      opacity: 0.48,
                    }),
                  }}
                >
                  <Box component="img" src={imageObj?.url} sx={{ position: 'absolute', top: 0, width: 1, height: 1 }} />
                </Box>
                )*/}
              <Chip sx={{ mt: '5px' }} label={itemType} />

              <Typography
                noWrap
                variant="subtitle2"
                sx={{
                  py: 3,
                  pl: 5,
                  transition: (theme) =>
                    theme.transitions.create('opacity', {
                      duration: theme.transitions.duration.shortest,
                    }),
                  ...(completed && { opacity: 0.48 }),
                }}
              >
                {name}
              </Typography>
            </Box>
            <Link href={link}>
              <Button>Edit</Button>
            </Link>
            <Button onClick={() => onDeleteTask(card.id)}>remove</Button>
            {/* <Checkbox
              disableRipple
              checked={completed}
              icon={<Icon icon={radioButtonOffOutline} />}
              checkedIcon={<Icon icon={checkmarkCircle2Outline} />}
              onChange={handleChangeComplete}
              sx={{ position: 'absolute', bottom: 15 }}
            /> */}
          </Paper>

          {/* <KanbanTaskDetails
            card={card}
            isOpen={openDetails}
            onClose={handleCloseDetails}
            onDeleteTask={() => onDeleteTask(card.id)}
          /> */}
        </div>
      )}
    </Draggable>
  );
}
