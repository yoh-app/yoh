import React, { useEffect, useState, useContext } from 'react';
import { useEditor } from '@craftjs/core';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import {
  useFindManyPageCollectionQuery,
  useFindManyProductCollectionQuery,
} from 'generated';
import { CraftContext } from '../../CraftContext';
import Spinner from 'admin/components/Spinner'
import Menu from './Menu';
import CollectionPicker from './CollectionPicker';
import DesignPicker from './DesignPicker';
import ExitDesign from './ExitDesign';
import AddItem from './AddItem';
import NewCollection from './NewCollection';
import WebsiteTheme from './WebsiteTheme';
import CollectionInfo from './CollectionInfo';
import Collection from './Collection';
import CollectionInfoNew from './CollectionInfoNew';
import NewPage from './NewPage';
import NewPageCollectionPrismaTable from './NewPageCollectionPrismaTable'
import NewProductCollectionPrismaTable from './NewProductCollectionPrismaTable'
import { addCollection } from './utils';

const Wrapper = styled.div`
  margin: auto;
  padding: 30px;
  width: 90%;
  max-width: 900px;
  // height: 90%;
  max-height: 90%;
  background: #F8F8F8;
  border-radius: 5px;
  overflow: scroll;
  outline: none;
  position: relative;
  top: 5%;
`;

const ModalController = ({ pageItemIds, onSave }) => {
  const { t } = useTranslation('design');
  const router = useRouter()
  const { view, setView, refetchWebsite, setNextPage, loading, addItemIndex, websiteData, setCollectionUpdated, editingCollection, nextPage } = useContext(CraftContext);

  const onClose = () => {
    let currentJson = query?.serialize()
    currentJson = JSON.parse(currentJson)
    if (editingCollection) {
      setCollectionUpdated(editingCollection);
    }
    if (currentJson?.ROOT?.nodes?.length > 0) {
      setView(null)
    } else {
      alert('please select an item to add to the page')
    }
  }

  const { enabled, query, canUndo, canRedo } = useEditor((state, query) => ({
    enabled: state.options.enabled,
    canUndo: query.history.canUndo(),
    canRedo: query.history.canRedo(),
  }))

  const renderView = () => {
    switch (view) {
      case 'collection_info':
        // open={isCollectionType({ selected, query }) && editPart === 'collection_info'}
        // return <CollectionInfo onClose={onClose} />
        return <CollectionInfoNew onClose={onClose} />
        break;
      case 'collection':
        // open={editPart === 'collection_basic'}
        return <Collection />
        break;
      case 'menu':
        return <Menu setDesignView={setView} setNextPage={setNextPage} refetchWebsite={refetchWebsite} />;
        break;
      case 'exit_design':
        if (enabled && !canUndo && !canRedo) {
          window.location.assign(`/${router?.locale}${nextPage}`)
        } else {
          return <ExitDesign onSave={onSave} onClose={onClose} />;
        }
        break;
      case 'theme':
        return <WebsiteTheme />;
        break;
      case 'add_item':
        return <AddItem onClose={onClose} />;
        break;
      case 'block':
        return <DesignPicker onClose={onClose} />;
        break;
      case 'video_collection':
        return (
          <CollectionPicker
            onClose={onClose}
            type="video"
          />
        );
        break;
      case 'product_collection':
        return (
          <CollectionPicker
            onClose={onClose}
            type="product"
          />
        );
        break;
      case 'page_collection':
        return (
          <CollectionPicker
            onClose={onClose}
            type="page"
          />
        );
        break;
      // case 'new_product_collection':
      //   return <NewCollection onClose={onClose} type="product" refetch={refetchProductCollection} />;
      //   break;
      // case 'new_product_collection':
      //   return <NewProductCollectionPrismaTable onClose={onClose} setView={setView} data={{}} onSave={(data) => {
      //   }} />
      //   break;

      // case 'new_page_collection':
      //   return <NewPageCollectionPrismaTable onClose={onClose} setView={setView} data={{}} onSave={(data) => {
      //   }} />
      //   break;

      case 'new_page':
        return <NewPage data={{
          pageCollections: {
            id: collection?.id
          }
        }} onClose={onClose} refetch={refetchPageCollection} />;
        break;
      default:
        break;
    }
    return null;
  };

  if (view === 'exit_design' && enabled && !canUndo && !canRedo) {
    return renderView()
  }

  return (
    <Modal
      onClose={onClose}
      open={view}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={view}>
        <Wrapper>
          {loading && <Spinner />}
          <IconButton
            onClick={onClose}
            style={{ color: '#B8B8B8', float: 'right', padding: 0 }}
            aria-label="delete"
          >
            <CloseIcon />
          </IconButton>
          {renderView()}
          {/* <DesignPicker setOpen={setOpen} /> */}
        </Wrapper>
      </Fade>
    </Modal>
  );
};
export default ModalController