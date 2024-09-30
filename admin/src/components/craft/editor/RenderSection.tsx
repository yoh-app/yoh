import React, { useEffect, useRef, useCallback, useState, useContext } from 'react';
import { useNode, useEditor } from '@craftjs/core';

// import ArrowUp from '../../../../public/static/icons/craft/arrow-up.svg';
// import Move from '../../../../public/static/icons/craft/move.svg';
// import Delete from '../../../../public/static/icons/craft/delete.svg';
import ReactDOM from 'react-dom';
import { ROOT_NODE } from '@craftjs/utils';
import IconButton from '@mui/material/IconButton';
import TitleIcon from '@mui/icons-material/Title';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import PaletteIcon from '@mui/icons-material/Palette';

import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { v4 as uuid } from 'uuid';
import { CraftContext } from './CraftContext';
import { arraymove } from '../utils/arraymove'
export const RenderSection = ({ }) => {
  const { actions, query, connectors, enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
    selected: state.events.selected,
  }));

  const { setEditMode, setEditPart, setView, setAddItemIndex, setEditingCollection } = useContext(CraftContext);
  const {
    id,
    isActive,
    isHover,
    dom,
    name,
    moveable,
    deletable,
    connectors: { drag },
    parent,
    node,
    props
  } = useNode((node) => ({
    node,
    isActive: node.events.selected,
    isHover: node.events.hovered,
    dom: node.dom,
    name: node.data.custom.displayName || node.data.displayName,
    moveable: query.node(node.id).isDraggable(),
    deletable: query.node(node.id).isDeletable(),
    parent: query.node(node.data.parent),
    props: node.data.props,
  }));
  const currentRef = useRef<HTMLDivElement>();
  const type =
    node?.node?.type === 'HtmlText'
      ? 'HtmlText'
      : node?.node?.type === 'HtmlImg'
        ? 'HtmlImg'
        : node?.node?.type === 'HtmlSection'
          ? 'HtmlSection'
          : node?.node?.type === 'Collection'
            ? 'Collection'
            : node?.node?.type === 'Embed'
              ? 'Embed'
              : parent?.node?.custom?.className?.includes('flex flex-wrap')
                ? 'CardItem'
                : node?.custom?.className?.includes('bg-') ||
                  node?.custom?.style?.includes('background-image')
                  ? 'BackgroundItem'
                  : null;
  // useEffect(() => {
  //   if (dom && !!type) {
  //     if (isActive || isHover) dom.classList.add('component-selected');
  //     else dom.classList.remove('component-selected');
  //   }
  // }, [dom, isActive, isHover]);

  const getPos = useCallback((dom: HTMLElement) => {
    const { top, left, bottom, width, height } = dom
      ? dom.getBoundingClientRect()
      : { top: 0, left: 0, bottom: 0 };
    return {
      top: `${top > 0 ? top : bottom}px`,
      left: `${left}px`,
      height: `${height}px`,
      width: `${width}px`,
    };
  }, []);

  const scroll = useCallback(() => {
    const { current: currentDOM } = currentRef;

    if (!currentDOM) return;
    const { top, left } = getPos(dom);
    currentDOM.style.top = top;
    currentDOM.style.left = left;
  }, [dom]);

  useEffect(() => {
    document?.querySelector('.craftjs-renderer')?.addEventListener('scroll', scroll);

    return () => {
      document?.querySelector('.craftjs-renderer')?.removeEventListener('scroll', scroll);
    };
  }, [scroll]);

  useEffect(() => {
    if (dom && !!type && enabled) {
      if (isActive || isHover) dom.classList.add('component-selected');
      else dom.classList.remove('component-selected');
    }
    if (dom?.classList && !enabled) {
      dom.classList.remove('component-selected');
    }
  }, [dom, isActive, isHover, enabled]);


  function processNode(rootNode, oldId, newId, parentId) {
    const ids = [];
    for (let index = 0; index < rootNode[oldId].nodes.length; index++) {
      ids.push({
        oldId: rootNode[oldId].nodes[index],
        newId: uuid(),
      });
    }
    rootNode[newId] = {
      ...rootNode[oldId],
      nodes: ids.map((id) => id.newId),
      id: newId,
      parent: parentId,
    };
    for (let j = 0; j < ids.length; j++) {
      processNode(rootNode, ids[j].oldId, ids[j].newId, newId);
    }
  }

  return (
    <>
      {enabled && <div style={{ position: 'relative' }}>
        <div style={{ width: type === 'HtmlSection' ? '180px' : '220px', marginLeft: 'auto', marginRight: 'auto', position: 'absolute', zIndex: 10, bottom: `-${props?.padding?.[2]}px`, display: 'inline-block', background: 'black', borderRadius: '30px' }}>
          <IconButton
            style={{ pointerEvents: 'initial', }}
            size="medium"
            variant="contained"
            className="cursor-pointer"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              const currentJsonString = query.serialize();
              const currentJson = JSON.parse(currentJsonString);
              const nodeIndex = currentJson?.ROOT?.nodes?.findIndex(
                (nodeId) => nodeId === node.id
              );
              if (nodeIndex > 0) {
                arraymove(currentJson?.ROOT?.nodes, nodeIndex, nodeIndex - 1);
                actions.deserialize(currentJson);
              }
            }}
          >
            <ArrowUpwardIcon style={{ color: 'white' }} fontSize="small" />
          </IconButton>
          <IconButton
            style={{ pointerEvents: 'initial', }}
            size="medium"
            variant="contained"
            className="cursor-pointer"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();

              const currentJsonString = query.serialize();
              const currentJson = JSON.parse(currentJsonString);
              const nodeIndex = currentJson?.ROOT?.nodes?.findIndex(
                (nodeId) => nodeId === node.id
              );
              if (nodeIndex < currentJson?.ROOT?.nodes.length - 1) {
                arraymove(currentJson?.ROOT?.nodes, nodeIndex, nodeIndex + 1);
                actions.deserialize(currentJson);
              }
            }}
          >
            <ArrowDownwardIcon style={{ color: 'white' }} fontSize="small" />
          </IconButton>
          <IconButton
            style={{ pointerEvents: 'initial', }}
            size="medium"
            variant="contained"
            className="cursor-pointer"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              actions.delete(node.id);

              const jsonString = query.serialize()
              const json = JSON.parse(jsonString)
              if (json?.ROOT?.nodes?.length === 0) {
                setView('add_item')
              }
            }}
          >
            <DeleteIcon style={{ color: 'white' }} fontSize="small" />
            {/* <Delete /> */}
          </IconButton>
          <IconButton
            style={{ pointerEvents: 'initial', }}
            size="medium"
            variant="contained"
            className="cursor-pointer"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();

              const currentJsonString = query.serialize();
              const currentJson = JSON.parse(currentJsonString);
              const nodeIndex = currentJson?.ROOT?.nodes?.findIndex(
                (nodeId) => nodeId === node.id
              );
              setAddItemIndex(nodeIndex + 1);
              setView('add_item');
            }}
          >
            <AddIcon style={{ color: 'white' }} fontSize="small" />
          </IconButton>
          {!!type && type !== 'Embed' && (
            <IconButton
              style={{ pointerEvents: 'initial', background: 'black' }}
              size="medium"
              variant="contained"
              className="cursor-pointer"
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                actions.selectNode(null);
                actions.selectNode(id);
                setEditMode(true);
                // if (type === 'Collection') {
                //   setView('collection');
                // } else {
                //   setEditMode(true);
                // }

              }}
            >
              <PaletteIcon style={{ color: 'white' }} fontSize="small" />
              {/* <Delete /> */}
            </IconButton>
          )}

          {!!type && (type === 'Collection' || type === 'Embed') && (
            <IconButton
              style={{ pointerEvents: 'initial', }}
              size="medium"
              variant="contained"
              className="cursor-pointer"
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                actions.selectNode(null);
                actions.selectNode(id);
                // setEditMode(true);
                if (type === 'Collection') {
                  setEditingCollection(id)
                  setView('collection_info');
                }
                //  else if (type === 'Embed') {
                //   setEditPart('embed_info');
                // }
              }}
            >
              <EditIcon style={{ color: 'white' }} fontSize="small" />
            </IconButton>
          )}</div>
      </div>}
    </>
  );
};
