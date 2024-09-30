import React, { useEffect, useContext, useState } from 'react';

import { useNode, useEditor } from '@craftjs/core';

import { CraftContext } from '../../editor/CraftContext';

import { TagSettings } from './TagSettings';
import { RenderEdit } from '../../editor/RenderEdit';

export type HtmlImg = {
  children: React.ReactNode;
  imageSrc: string;
};

const defaultHtmlImgProps = {
  imageSrc: '',
  text: ''
};

export const HtmlImg = (props: Partial<HtmlImg>) => {
  props = {
    ...defaultHtmlImgProps,
    ...props,
  };
  const { children, imageSrc, url, hidden, borderRadius } = props;
  const {
    connectors: { connect },
    className,
    htmlElement,
    style,
    src,
  } = useNode((node) => ({
    className: node.data.custom.className,
    src: node.data.custom.src,
    htmlElement: node.data.custom.htmlElement,
    style: node.data.custom.style,
  }));

  const { inEdit, setNextPage, setView } = useContext(CraftContext);

  const { enabled, query } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  let ReturnElement = () => (
    <img alt={props?.text} ref={connect} style={{ opacity: hidden ? 0 : 1, ...borderRadius ? { borderRadius } : undefined }} STYLE={style} className={className} src={imageSrc?.length > 0 ? imageSrc : src} />
  );

  if (url && !hidden && !enabled) {
    return (
      <a href={url}>
        <ReturnElement />
        <RenderEdit />
      </a>
    );
  } else {
    return (
      <>
        <ReturnElement />
        <RenderEdit />
      </>
    );
  }
};

HtmlImg.craft = {
  displayName: 'HtmlImg',
  rules: {},
  props: defaultHtmlImgProps,
  custom: {
    src: '',
    className: '',
    htmlElement: 'img',
  },
  related: {
    toolbar: TagSettings,
  },
};
