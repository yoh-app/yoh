import { useContext, useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'redux/store';
import {
  createColumn,
  setIndexTask,
  getBoard,
  persistColumn,
  persistCard,
} from 'redux/slices/menu';
// routes
import { PATH_DASHBOARD } from 'routes/paths';
// layouts
import Layout from 'layouts';
// components
import Page from 'components/Page';
import HeaderDashboard from 'components/HeaderDashboard';
import { SkeletonKanbanColumn } from 'components/skeleton';
// sections
import { KanbanColumn } from 'sections/@dashboard/menu';
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

import Iconify from 'components/Iconify';

import { bannerPage } from 'templates/examples';
import { v4 as uuidv4 } from 'uuid';
import { gql, useQuery, useMutation } from '@apollo/client';
import ThemeProvider from 'theme'
import ThemeColorPresets from 'components/ThemeColorPresets';
import { CraftContext } from '../../CraftContext';
const NewPage = ({ onClose, setView }) => {
  const { collection, setCollectionUpdated, setLoading } = useContext(CraftContext)
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
    <ThemeProvider>
      <ThemeColorPresets>

        <div>
          <div className="flex align-center">
            <Iconify icon={'akar-icons:file'} sx={{ width: 20, height: 20 }} />
            <Typography sx={{ flexGrow: 1, marginLeft: 1.5, marginRight: 1.5, color: '#4B5971' }}>
              {t('WebsiteAdmin.Menu.addPage')}
            </Typography>
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
          <div className="flex" style={{ marginTop: '32px', textAlign: 'center' }}>
            <Button
              variant="contained"
              disabled={name?.length === 0}
              onClick={async () => {
                setLoading(true)
                const { data } = await createPage({
                  variables: {
                    data: {
                      name,
                      description,
                      pageCollections: {
                        connect: {
                          id: collection?.id
                        }
                      }
                      // website: {
                      //   connect: {
                      //     id: board?.id,
                      //   },
                      // },
                    },
                  },
                });
                setLoading(false)
                setCollectionUpdated(collection?.id)
                onClose();
              }}
            >
              <Iconify icon={'eva:checkmark-fill'} width={20} height={20} />
              {t('WebsiteAdmin.Menu.create')}
            </Button>
          </div>
        </div></ThemeColorPresets></ThemeProvider>
  );
};

export default NewPage