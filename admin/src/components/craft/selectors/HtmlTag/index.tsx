import React from 'react';
import { useNode } from '@craftjs/core';
import { TagSettings } from './TagSettings';
import { RenderEdit } from '../../editor/RenderEdit';
export type HtmlTag = {
  children: React.ReactNode;
  backgroundSet: boolean;
  backgroundImage: string;
  backgroundColor: string;
};

const defaultHtmlTagProps = {
  backgroundSet: false,
  backgroundImage: '',
  backgroundColor: { r: 255, g: 255, b: 255, a: 0.1 },
};

export const HtmlTag = (props: Partial<HtmlTag>) => {
  props = {
    ...defaultHtmlTagProps,
    ...props,
  };
  const { children, backgroundImage, backgroundColor, backgroundSet, hidden, borderRadius } = props;
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

  return (
    <>
      <div
        style={backgroundSet ? {
          backgroundImage: `linear-gradient(to right, rgba(${backgroundColor?.r}, ${backgroundColor?.g}, ${backgroundColor?.b}, ${backgroundColor?.a}), rgba(${backgroundColor?.r}, ${backgroundColor?.g}, ${backgroundColor?.b}, ${backgroundColor?.a})), url(${backgroundImage})`,
          opacity: hidden ? 0 : 1,
          ...borderRadius ? { borderRadius } : undefined
        } : {
          opacity: hidden ? 0 : 1,
          ...borderRadius ? { borderRadius } : undefined
        }}
        STYLE={style}
        ref={connect}
        className={className}
      >
        {children}
      </div>
      <RenderEdit />
    </>
  );
};

HtmlTag.craft = {
  displayName: 'HtmlTag',
  rules: {},
  props: defaultHtmlTagProps,
  custom: {
    src: '',
    className: '',
    htmlElement: 'div',
  },
  related: {
    toolbar: TagSettings,
  },
};
