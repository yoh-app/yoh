import { motion, AnimatePresence } from 'framer-motion';
// import { Icon } from '@iconify/react';
// import fileFill from '@iconify/icons-eva/file-fill';
// import closeFill from '@iconify/icons-eva/close-fill';
import React from 'react';
import {
  Box,
  List,
  Stack,
  Paper,
  Button,
  ListItem,
  Typography,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import { alpha, Theme, styled } from '@mui/material/styles';
// import { MIconButton } from '../@material-extend';
// import { varFadeInRight } from '../animate';

const Preview = ({ files, showPreview, onChange, isMultiple }) => {
  const hasFile = files.length > 0;
  const onRemove = (removeFile) => {
    if (isMultiple) {
      onChange(files.filter((file) => file !== removeFile));
    } else {
      onChange(null);
    }
  };

  const onRemoveAll = () => {
    onChange([]);
  };

  return (
    <>
      <List disablePadding sx={{ ...(hasFile && { my: 3 }) }}>
        {/* <AnimatePresence> */}
        {files.map((file) => {
          if (showPreview) {
            return (
              <ListItem
                key={file}
                sx={{
                  p: 0,
                  m: 0.5,
                  width: 80,
                  height: 80,
                  borderRadius: 1.5,
                  overflow: 'hidden',
                  position: 'relative',
                  display: 'inline-flex',
                }}
              >
                <Paper
                  variant="outlined"
                  component="img"
                  src={file?.url}
                  sx={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute' }}
                />
                <Box sx={{ top: 6, right: 6, position: 'absolute' }}>
                  close
                  {/* <MIconButton
                      size="small"
                      onClick={() => onRemove(file)}
                      sx={{
                        p: '2px',
                        color: 'common.white',
                        bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
                        '&:hover': {
                          bgcolor: (theme) => alpha(theme.palette.grey[900], 0.48),
                        },
                      }}
                    >
                      <Icon icon={closeFill} />
                    </MIconButton> */}
                </Box>
              </ListItem>
            );
          }

          return (
            <ListItem
              key={file}
              sx={{
                my: 1,
                py: 0.75,
                px: 2,
                borderRadius: 1,
                border: (theme) => `solid 1px ${theme.palette.divider}`,
                bgcolor: 'background.paper',
              }}
            >
              <ListItemIcon>
                <Icon icon={fileFill} width={28} height={28} />
              </ListItemIcon>
              <ListItemText
                primary={file}
                primaryTypographyProps={{ variant: 'subtitle2' }}
                secondaryTypographyProps={{ variant: 'caption' }}
              />
              <ListItemSecondaryAction>
                <MIconButton edge="end" size="small" onClick={() => onRemove(file)}>
                  <Icon icon={closeFill} />
                </MIconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
        {/* </AnimatePresence> */}
      </List>

      {hasFile && isMultiple && (
        <Stack direction="row" justifyContent="flex-end">
          <Button onClick={onRemoveAll} sx={{ mr: 1.5 }}>
            Remove all
          </Button>
        </Stack>
      )}
    </>
  );
};

export default Preview;
