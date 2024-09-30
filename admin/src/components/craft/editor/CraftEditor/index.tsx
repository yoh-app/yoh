import React, { useState, useEffect, useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useEditor } from '@craftjs/core';
import { Header } from './Header';
import { TemplateTester } from './TemplateTester';
import { Sidebar } from './Sidebar';
import { CraftContext } from '../CraftContext';
import ClientHeader from './ClientHeader';
import Spinner from 'admin/components/Spinner';
import ModalController from './Modals/ModalController';
import ThemeProvider from 'theme';
import ThemeColorPresets from 'components/ThemeColorPresets';

const useStyles = makeStyles((theme) => ({}));

export const CraftEditor = ({ children, onSave, homeLink }) => {
  const classes = useStyles();
  const { editMode, setEditMode, editPart, pageData, setView, view, loading } = useContext(CraftContext);
  const {
    connectors,
    selected,
    actions: { selectNode },
    query,
  } = useEditor((state) => ({
    enabled: state.options.enabled,
    selected: state.events.selected,
  }));
  const [loaded, setLoaded] = useState(false);
  const [mouseEnabled, setMouseEnabled] = useState(false);

  let unmounted = false;
  // animations with setTimeouts. I know, don't judge me! :p
  useEffect(() => {
    setTimeout(() => {
      if (!unmounted) setLoaded(true);
      setTimeout(() => {
        setTimeout(() => {
          if (!unmounted) setMouseEnabled(true);
        }, 200);
      }, 400);
    }, 1000);

    return () => {
      unmounted = true;
    };
  }, []);

  const onClose = () => {
    selectNode(null);
    setEditMode(false);
  };

  useEffect(() => {
    if (query) {
      const jsonString = query.serialize()
      const json = JSON.parse(jsonString)
      if (json?.ROOT?.nodes?.length === 0) {
        setView('add_item')
      }
    }
  }, [query])

  return (
    <ThemeProvider darkMode={true}>
      <ThemeColorPresets>
        {loading && <Spinner />}
        <div className={classes.root}>
          {/* {process.env.NODE_ENV === 'development' && <TemplateTester />} */}
          {/* <CssBaseline /> */}
          <AppBar position="fixed" className={clsx(classes.appBar)}>
            <Header pageData={pageData} homeLink={homeLink} onSave={onSave} />
          </AppBar>
          <Drawer
            open={selected.size > 0 && editMode}
            ModalProps={{ onBackdropClick: () => onClose() }}
            PaperProps={{
              sx: {
                background: 'black'
              }
            }}
          >
            <div style={{ background: 'black' }} className={classes.toolbarIcon}>
              <IconButton onClick={() => onClose()}>
                <ChevronLeftIcon />
              </IconButton>
            </div>

            <Sidebar />
          </Drawer>
          <ModalController
            onSave={onSave}
            pageItemIds={
              pageData?.content
                ? typeof pageData?.content === 'string'
                  ? JSON.parse(pageData?.content)?.ROOT?.nodes
                  : pageData?.content?.ROOT?.nodes
                : []
            }
          />
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <div
              className="craftjs-renderer h-full  w-full transition"
              ref={(ref) => connectors.select(connectors.hover(ref, null), null)}
            >
              <ClientHeader />
              <ThemeProvider>
                {children}
              </ThemeProvider >
            </div>
          </main>
        </div>
      </ThemeColorPresets>
    </ThemeProvider>
  );
};
