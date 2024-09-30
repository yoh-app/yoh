import { createContext, ReactNode, useEffect, useReducer, useState } from 'react';

const CraftContext = createContext(null);

function CraftProvider({
  modalView,
  setModalView,
  children,
  pageData,
  refetchPage,
  refetchWebsite,
  websiteData,
  permissionData,
  inEdit
}) {
  const [editingCollection, setEditingCollection] = useState(null)
  const [editMode, setEditMode] = useState(false);
  const [editPart, setEditPart] = useState('');
  const [view, setView] = useState(null);
  const [addItemIndex, setAddItemIndex] = useState(0);
  const [collectionUpdated, setCollectionUpdated] = useState(null);
  const [embedUpdated, setEmbedUpdated] = useState(null);
  const [loading, setLoading] = useState(false)
  const [nextPage, setNextPage] = useState(null)
  return (
    <CraftContext.Provider
      value={{
        modalView,
        setModalView,
        inEdit,
        setEditMode,
        editMode,
        setEditPart,
        editPart,
        collectionUpdated,
        setCollectionUpdated,
        embedUpdated,
        setEmbedUpdated,
        view,
        setView,
        addItemIndex,
        setAddItemIndex,
        refetchPage,
        pageData,
        permissionData,
        websiteData,
        refetchWebsite,
        loading,
        setLoading,
        nextPage,
        setNextPage,
        editingCollection,
        setEditingCollection
      }}
    >
      {children}
    </CraftContext.Provider>
  );
}

export { CraftContext, CraftProvider };
