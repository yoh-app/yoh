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
import LinkIcon from '@mui/icons-material/Link';
import ImageIcon from '@mui/icons-material/Image';

import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { v4 as uuid } from 'uuid';
import { CraftContext } from './CraftContext';
import { arraymove } from '../utils/arraymove'
import { useTranslation } from 'next-i18next';


export const RenderEdit = ({ }) => {
  const { actions, query, connectors, enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
    selected: state.events.selected,
  }));
  const { t } = useTranslation('design');

  const { setEditMode, setView, setAddItemIndex, setEditPart } = useContext(CraftContext);
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
    actions: { setProp },
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
    node?.node?.type === 'HtmlButton'
      ? 'HtmlButton'
      : node?.node?.type === 'HtmlText'
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
                    : node?.node?.type === 'HtmlTag'
                      ? 'HtmlTag' : null;
  useEffect(() => {
    if (dom && !!type && enabled) {
      if (type === 'HtmlImg') {
        if (isActive || isHover) dom.classList.add('component-selected-img');
        else dom.classList.remove('component-selected-img');
      } else if (dom.classList.contains('absolute')) {
        if (isActive || isHover) dom.classList.add('component-selected-absolute');
        else dom.classList.remove('component-selected-absolute');
      } else {
        if (isActive || isHover) dom.classList.add('component-selected');
        else dom.classList.remove('component-selected');
      }
    }
    if (dom?.classList && !enabled) {
      dom.classList.remove('component-selected-absolute');
      dom.classList.remove('component-selected');
    }
  }, [dom, isActive, isHover, enabled]);

  const getPos = useCallback((dom: HTMLElement) => {
    const { top, left, bottom, width, height } = dom
      ? dom.getBoundingClientRect()
      : { top: 0, left: 0, bottom: 0 };
    return {
      top: `${top - 100 > 0 ? top - 40 : bottom + 10}px`,
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
      {enabled && (isActive)
        ? ReactDOM.createPortal(
          <div
            ref={currentRef}
            className="fixed flex items-center"
            style={
              {
                left: getPos(dom).left,
                top: getPos(dom).top,
                // width: getPos(dom).width,
                // height: getPos(dom).height,
                // border: '1px dashed black',
                // borderRadius: '10px',
                // backgroundColor: 'rgba(234,22,12,0.4)',
                zIndex: 50,
                borderRadius: '5px',
                padding: '0 5px',
                pointerEvents: 'none',
              }
            }
            onClick={() => actions.selectNode(id)}
          >
            <div style={{ display: 'inline-block', background: 'black', borderRadius: '30px' }}>
              <span style={{ color: 'white', paddingLeft: '10px' }}>{t(type)}</span>
              {type === 'CardItem' && (
                <IconButton
                  style={{ pointerEvents: 'initial', }}
                  size="medium"
                  variant="contained"
                  className="cursor-pointer"
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    const currentJsonString = query.serialize();
                    const currentJson = JSON.parse(currentJsonString);
                    const nodeIndex = currentJson?.[parent?.id]?.nodes?.findIndex(
                      (nodeId) => nodeId === node.id
                    );
                    const newId = uuid();
                    processNode(currentJson, node.id, newId, parent.id);
                    currentJson[parent?.id].nodes.splice(nodeIndex, 0, newId);
                    actions.deserialize(currentJson);
                  }}
                >
                  <ContentCopyIcon style={{ color: 'white' }} fontSize="small" />
                  {/* <Delete /> */}
                </IconButton>
              )}
              {type === 'CardItem' && (
                <IconButton
                  style={{ pointerEvents: 'initial', }}
                  size="medium"
                  variant="contained"
                  className="cursor-pointer"
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    const currentJsonString = query.serialize();
                    const currentJson = JSON.parse(currentJsonString);
                    const nodeIndex = currentJson?.[parent?.id]?.nodes?.findIndex(
                      (nodeId) => nodeId === node.id
                    );
                    arraymove(currentJson[parent?.id].nodes, nodeIndex, nodeIndex - 1);
                    actions.deserialize(currentJson);
                  }}
                >
                  <ArrowLeftIcon style={{ color: 'white' }} fontSize="small" />
                  {/* <Delete /> */}
                </IconButton>
              )}
              {type === 'CardItem' && (
                <IconButton
                  style={{ pointerEvents: 'initial', }}
                  size="medium"
                  variant="contained"
                  className="cursor-pointer"
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    const currentJsonString = query.serialize();
                    const currentJson = JSON.parse(currentJsonString);
                    const nodeIndex = currentJson?.[parent?.id]?.nodes?.findIndex(
                      (nodeId) => nodeId === node.id
                    );
                    arraymove(currentJson[parent?.id].nodes, nodeIndex, nodeIndex + 1);
                    actions.deserialize(currentJson);
                  }}
                >
                  <ArrowRightIcon style={{ color: 'white' }} fontSize="small" />
                  {/* <Delete /> */}
                </IconButton>
              )}
              {/* 
            {parent?.node?.id === ROOT_NODE && (
              <IconButton
                style={{ pointerEvents: 'initial',  }}
                size="medium"
                variant="contained"
                className="cursor-pointer"
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();

                  const currentJsonString = query.serialize();
                  const currentJson = JSON.parse(currentJsonString);
                  const nodeIndex = currentJson?.[parent?.id]?.nodes?.findIndex(
                    (nodeId) => nodeId === node.id
                  );
                  arraymove(currentJson[parent?.id].nodes, nodeIndex, nodeIndex - 1);
                  actions.deserialize(currentJson);
                }}
              >
                <ArrowUpwardIcon style={{ color: 'white' }} fontSize="small" />
              </IconButton>
            )} */}
              {/* {parent?.node?.id === ROOT_NODE && (
              <IconButton
                style={{ pointerEvents: 'initial',  }}
                size="medium"
                variant="contained"
                className="cursor-pointer"
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();

                  const currentJsonString = query.serialize();
                  const currentJson = JSON.parse(currentJsonString);
                  const nodeIndex = currentJson?.[parent?.id]?.nodes?.findIndex(
                    (nodeId) => nodeId === node.id
                  );
                  arraymove(currentJson[parent?.id].nodes, nodeIndex, nodeIndex + 1);
                  actions.deserialize(currentJson);
                }}
              >
                <ArrowDownwardIcon style={{ color: 'white' }} fontSize="small" />
              </IconButton>
            )} */}
              {!!type && (type === 'HtmlText' || type === 'HtmlImg' || type === 'HtmlButton') && (
                <IconButton
                  style={{ pointerEvents: 'initial', }}
                  size="medium"
                  variant="contained"
                  className="cursor-pointer"
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    actions.selectNode(null);
                    actions.selectNode(id);
                    // if (type === 'Collection') {
                    //   setView('collection');
                    // } else {
                    setEditPart('link')

                    setEditMode(true);
                    // }
                    //  else {
                    //   setView('basic');
                    // }
                  }}
                >
                  <LinkIcon style={{ color: 'white' }} fontSize="small" />
                  {/* <Delete /> */}
                </IconButton>
              )}
              {!!type && type === 'HtmlImg' && (
                <IconButton
                  style={{ pointerEvents: 'initial', }}
                  size="medium"
                  variant="contained"
                  className="cursor-pointer"
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    actions.selectNode(null);
                    actions.selectNode(id);
                    // if (type === 'Collection') {
                    //   setView('collection');
                    // } else {
                    setEditPart('image')

                    setEditMode(true);
                    // }
                    //  else {
                    //   setView('basic');
                    // }
                  }}
                >
                  <ImageIcon style={{ color: 'white' }} fontSize="small" />
                  {/* <Delete /> */}
                </IconButton>
              )}

              {!!type && type !== 'HtmlImg' && type !== 'Embed' && (
                <IconButton
                  style={{ pointerEvents: 'initial', }}
                  size="medium"
                  variant="contained"
                  className="cursor-pointer"
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    actions.selectNode(null);
                    actions.selectNode(id);
                    setEditPart('palette')
                    // if (type === 'Collection') {
                    //   setView('collection');
                    // } else {
                    setEditMode(true);
                    // }
                    //  else {
                    //   setView('basic');
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
                      setView('collection_info');
                    }
                    // else if (type === 'Embed') {
                    //   setEditPart('embed_info');
                    // }
                  }}
                >
                  <EditIcon style={{ color: 'white' }} fontSize="small" />
                </IconButton>
              )}

              {deletable && !!type ? (
                <IconButton
                  style={{ pointerEvents: 'initial', }}
                  size="medium"
                  variant="contained"
                  className="cursor-pointer"
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    setProp(
                      (props) => {
                        console.log(props)
                        if (props.hidden) {
                          props.hidden = false
                        } else {
                          props.hidden = true
                        }
                      }
                    )
                    // if (node?.node?.type === 'HtmlText') {
                    //   actions.delete(parent?.node?.id);
                    // } else {
                    //   actions.delete(id);
                    // }
                  }}
                >
                  {props?.hidden ? <VisibilityIcon fontSize="small" style={{ color: 'white' }} /> : <VisibilityOffIcon fontSize="small" style={{ color: 'white' }} />}

                  {/* <DeleteIcon style={{ color: 'white' }} fontSize="small" /> */}
                  {/* <Delete /> */}
                </IconButton>
              ) : null}
              {deletable && !!type ? (
                <IconButton
                  style={{ pointerEvents: 'initial', }}
                  size="medium"
                  variant="contained"
                  className="cursor-pointer"
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();

                    if (node?.node?.type === 'HtmlText') {
                      actions.delete(parent?.node?.id);
                    } else {
                      actions.delete(id);
                    }
                  }}
                >
                  <DeleteIcon style={{ color: 'white' }} fontSize="small" />
                  {/* <Delete /> */}
                </IconButton>
              ) : null}
              {/* {parent?.node?.id === ROOT_NODE && (
              <IconButton
                style={{ pointerEvents: 'initial',  }}
                size="medium"
                variant="contained"
                className="cursor-pointer"
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();

                  const currentJsonString = query.serialize();
                  const currentJson = JSON.parse(currentJsonString);
                  const nodeIndex = currentJson?.[parent?.id]?.nodes?.findIndex(
                    (nodeId) => nodeId === node.id
                  );
                  setAddItemIndex(nodeIndex);
                  setView('add_item');
                }}
              >
                <AddIcon style={{ color: 'white' }} fontSize="small" />
              </IconButton>
            )} */}
            </div>
          </div>,
          document.body
        )
        : null}
    </>
  );
};
