import React, { useEffect, useState, useContext } from 'react';
import { useEditor } from '@craftjs/core';
import styled from 'styled-components';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import PaletteIcon from '@mui/icons-material/Palette';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import SaveIcon from '@mui/icons-material/Save';
import MenuIcon from '@mui/icons-material/Menu';
import EditIcon from '@mui/icons-material/Edit';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import {
  // useFindManyPageGroupQuery,
  useFindManyProductCollectionQuery,
} from 'generated';
import { CraftContext } from '../CraftContext';

import Menu from 'views/dashboard/Menu';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    backgroundColor: 'black',
    display: 'flex',
    paddingRight: 24, // keep right padding when drawer closed
  },
}));



export const Header = ({ onSave, homeLink }) => {
  const { t } = useTranslation('design');
  const router = useRouter()
  const { view, setView, pageData, setLoading, setNextPage, editMode } = useContext(CraftContext);

  // const {
  //   query: { id },
  //   push,
  // } = useRouter();

  const {
    enabled,
    actions: { setOptions, history, deserialize },
    connectors: { create },
    canUndo,
    canRedo,
    selected,
    query,
  } = useEditor((state, query) => ({
    enabled: state.options.enabled,
    canUndo: query.history.canUndo(),
    canRedo: query.history.canRedo(),
    selected: state.events.selected,
  }));


  const classes = useStyles();

  return (
    <>
      <Toolbar style={{ padding: 0 }} className={classes.toolbar}>
        <div style={{ flexGrow: 1, display: 'flex' }}>
          <Button size='small' onClick={() => { setNextPage(homeLink); setView('exit_design') }}>
            <IconButton size='small'>
              <KeyboardBackspaceIcon sx={{ color: 'white' }} />
              {/* <img src="/icons/back_to_admin.svg" /> */}
            </IconButton>
            <div className="text-white hidden md:block">
              {t('WebsiteAdmin.DesignPage.topBar.back')}
            </div>
          </Button>

          <Button
            size='small'
            onClick={async () => {
              setView('theme');
              // push(`/admin/Organization/Organization/Page/?update=${id}`);
            }}
          >
            <IconButton size='small'>
              <PaletteIcon sx={{ color: 'white' }} />
              {/* <img src="/icons/theme.svg" /> */}
            </IconButton>
            <div className="text-white hidden md:block">{t('WebsiteAdmin.DesignPage.topBar.theme')}</div>
          </Button>
        </div>
        <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          {enabled && (
            <IconButton size='small' disabled={!canUndo} onClick={() => history.undo()}>
              <UndoIcon sx={{ color: canUndo ? 'white' : 'grey' }} />
              {/* <img src="/icons/previous.svg" /> */}
            </IconButton>
          )}
          {enabled && (
            <IconButton size='small' disabled={!canRedo} onClick={() => history.redo()}>
              <RedoIcon sx={{ color: canRedo ? 'white' : 'grey' }} />
              {/* <img src="/icons/next.svg" /> */}
            </IconButton>
          )}
        </div>
        <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            size='small'
            onClick={async () => {
              window.location.assign(`/${router?.locale}/admin/Website/Website/Page?update=${pageData?.id}`)
              // setView('menu');
            }}
          >
            <IconButton size='small'>
              {/* <img src="/icons/menu.svg" /> */}
              <InfoIcon sx={{ color: 'white' }} />

            </IconButton>
            <div className="text-white hidden md:block">{t('WebsiteAdmin.DesignPage.topBar.info')}</div>
          </Button>
          <Button
            size='small'
            onClick={async () => {
              setView('menu');
            }}
          >
            <IconButton size='small'>
              {/* <img src="/icons/menu.svg" /> */}
              <MenuIcon sx={{ color: 'white' }} />

            </IconButton>
            <div className="text-white hidden md:block">{t('WebsiteAdmin.DesignPage.topBar.menu')}</div>
          </Button>
          <Button
            size='small'
            sx={{ minWidth: { xs: 'unset', md: '64px', marginRight: '10px' } }}
            onClick={async () => {
              setLoading(true)
              if (enabled) {
                const updateString = query.serialize();
                const updateJson = JSON.parse(updateString);
                await onSave(updateString);
              }
              setOptions((options) => (options.enabled = !enabled));
              setLoading(false)
            }}
          >
            {enabled ? (
              <>
                <IconButton size='small'>
                  <SaveIcon sx={{ color: 'white' }} />
                  {/* <img src="/icons/save.svg" /> */}
                </IconButton>
                <div className="text-white hidden md:block">
                  {t('WebsiteAdmin.DesignPage.topBar.save')}
                </div>
              </>
            ) : (
              <>
                <IconButton size='small'>
                  <EditIcon sx={{ color: 'white' }} />
                </IconButton>
                <div className="text-white hidden md:block">
                  {t('WebsiteAdmin.DesignPage.topBar.edit')}
                </div>
              </>
            )}
          </Button>
        </div>
      </Toolbar>
    </>
  );
};

