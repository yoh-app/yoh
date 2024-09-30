import React, { useContext } from 'react';
import { useNode, useEditor } from '@craftjs/core';
import { TagSettings } from './TagSettings';
import { RenderEdit } from '../../editor/RenderEdit';
import { CraftContext } from '../../editor/CraftContext';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { arraymove } from '../../utils/arraymove'
import { RenderSection } from '../../editor/RenderSection';

export type HtmlSection = {
  children: React.ReactNode;
  backgroundSet: boolean;
  backgroundImage: string;
  backgroundColor: string;
};

const defaultProps = {
  backgroundSet: false,
  backgroundImage: '',
  backgroundColor: { r: 255, g: 255, b: 255, a: 0.1 },
  padding: [60, 60, 60, 60]
};

export const HtmlSection = (props: Partial<HtmlSection>) => {
  props = {
    ...defaultProps,
    ...props,
  };
  const { children, backgroundImage, backgroundColor, backgroundSet, padding } = props;
  const {
    connectors: { connect },
    className,
    htmlElement,
    style,
    src,
    node,
  } = useNode((node) => ({
    className: node.data.custom.className,
    src: node.data.custom.src,
    htmlElement: node.data.custom.htmlElement,
    style: node.data.custom.style,
    node,
  }));

  const { query, actions, enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  const isFirstSection = query.node(node.node.parent).id === 'ROOT' &&
    query.node(node.node.parent).node.nodes[0] === node.id

  // let backgroundStyle = backgroundImage
  //   ? {
  //     backgroundImage: `url(${backgroundImage})`,
  //     backgroundRepeat: 'no-repeat',
  //     backgroundSize: 'cover',
  //   }
  //   : backgroundColor && backgroundSet
  //     ? { backgroundColor: `rgba(${backgroundColor?.r},${backgroundColor?.g},${backgroundColor?.b},${backgroundColor?.a})`, borderColor: `rgba(${backgroundColor?.r},${backgroundColor?.g},${backgroundColor?.b},${backgroundColor?.a})` }
  //     : {}

  let backgroundStyle = {
    backgroundImage: `linear-gradient(to right, rgba(${backgroundColor?.r}, ${backgroundColor?.g}, ${backgroundColor?.b}, ${backgroundColor?.a}), rgba(${backgroundColor?.r}, ${backgroundColor?.g}, ${backgroundColor?.b}, ${backgroundColor?.a})), url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  }

  backgroundStyle.padding = `${isFirstSection && padding?.[0] < 150 ? '150' : padding[0]}px ${padding[1]}px ${padding[2]}px ${padding[3]}px`;

  const { setAddItemIndex, setView } = useContext(CraftContext);
  return (
    <div
      STYLE={style}
      style={backgroundStyle}
      ref={connect}
      className={className}
    >
      {children}
      {/* <RenderEdit /> */}

      <RenderSection />
    </div>
  );
};

HtmlSection.craft = {
  displayName: 'HtmlSection',
  rules: {},
  props: defaultProps,
  custom: {
    src: '',
    className: '',
    htmlElement: 'section',
  },
  related: {
    toolbar: TagSettings,
  },
};
