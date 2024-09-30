import React from 'react';
import { Element, useEditor } from '@craftjs/core';
import { Tooltip } from '@mui/material';
import { Container } from '../../selectors/Container';
import { Text } from '../../selectors/Text';
import { Video } from '../../selectors/Video';
import { Button } from '../../selectors/Button';

import SquareSvg from '../../../../../public/static/icons/craft/toolbox/rectangle.svg';
import TypeSvg from '../../../../../public/static/icons/craft/toolbox/text.svg';
import YoutubeSvg from '../../../../../public/static/icons/craft/toolbox/video-line.svg';
import ButtonSvg from '../../../../../public/static/icons/craft/toolbox/button.svg';
import UndoSvg from '../../../../../public/static/icons/craft/toolbox/undo.svg';
import RedoSvg from '../../../../../public/static/icons/craft/toolbox/redo.svg';

import styled from 'styled-components';

const ToolboxDiv = styled.div<{ enabled: boolean }>`
  transition: 0.4s cubic-bezier(0.19, 1, 0.22, 1);
  ${(props) => (!props.enabled ? `width: 0;` : '')}
  ${(props) => (!props.enabled ? `opacity: 0;` : '')}
`;

const Item = styled.a<{ disabled?: boolean; move?: boolean }>`
  svg {
    width: 22px;
    height: 22px;
    fill: #707070;
  }
  ${(props) =>
    props.move &&
    `
    cursor: move;
  `}
  ${(props) =>
    props.disabled &&
    `
    opacity:0.5;
    cursor: not-allowed;
  `}
`;

export const Toolbox = () => {
  const {
    enabled,
    connectors: { create },
    actions,
    canUndo,
    canRedo,
  } = useEditor((state, query) => ({
    enabled: state.options.enabled,
    canUndo: query.history.canUndo(),
    canRedo: query.history.canRedo(),
  }));

  return (
    <ToolboxDiv
      enabled={enabled && enabled}
      className="toolbox transition w-12 border-r h-full flex flex-col bg-white"
    >
      <div className="flex flex-1 flex-col items-center pt-3">
        <div
          ref={(ref) =>
            create(
              ref,
              <Element
                canvas
                is={Container}
                background={{ r: 78, g: 78, b: 78, a: 1 }}
                color={{ r: 0, g: 0, b: 0, a: 1 }}
                height="300px"
                width="300px"
              ></Element>
            )
          }
        >
          <Tooltip title="Container" placement="right">
            <Item className="m-2 pb-2 cursor-pointer block" move>
              <SquareSvg />
            </Item>
          </Tooltip>
        </div>
        <div ref={(ref) => create(ref, <Text fontSize="12" textAlign="left" text="Hi there" />)}>
          <Tooltip title="Text" placement="right">
            <Item className="m-2 pb-2 cursor-pointer block" move>
              <TypeSvg />
            </Item>
          </Tooltip>
        </div>
        <div ref={(ref) => create(ref, <Button />)}>
          <Tooltip title="Button" placement="right">
            <Item className="m-2 pb-2 cursor-pointer block" move>
              <ButtonSvg />
            </Item>
          </Tooltip>
        </div>
        <div ref={(ref) => create(ref, <Video />)}>
          <Tooltip title="Video" placement="right">
            <Item className="m-2 pb-2 cursor-pointer block" move>
              <YoutubeSvg />
            </Item>
          </Tooltip>
        </div>
      </div>
      <div className="flex flex-col items-center pt-3">
        <div>
          <Tooltip title="Undo" placement="right">
            <Item
              className="m-2 pb-2 cursor-pointer block"
              disabled={!canUndo}
              onClick={() => actions.history.undo()}
            >
              <UndoSvg />
            </Item>
          </Tooltip>
        </div>
        <div>
          <Tooltip title="Redo" placement="right">
            <Item
              className="m-2 pb-2 cursor-pointer block"
              disabled={!canRedo}
              onClick={() => actions.history.redo()}
            >
              <RedoSvg />
            </Item>
          </Tooltip>
        </div>
      </div>
    </ToolboxDiv>
  );
};
