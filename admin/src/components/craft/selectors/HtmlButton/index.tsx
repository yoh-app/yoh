import React, { useState, useEffect, useContext } from 'react';
import { useNode } from '@craftjs/core';
import { TextSettings } from './TextSettings';
import { RenderEdit } from '../../editor/RenderEdit';
import { CraftContext } from '../../editor/CraftContext';
import Button from 'client/src/components/ui/button';
import { useEditor } from '@craftjs/core';

export type HtmlButton = {
  fontSize: string;
  textAlign: string;
  fontWeight: string;
  color: Record<'r' | 'g' | 'b' | 'a', string>;
  shadow: number;
  text: string;
  margin: [string, string, string, string];
  url: string;
};

const defaultProps = {
  fontSize: '15',
  textAlign: 'left',
  fontWeight: '500',
  color: { r: 92, g: 90, b: 90, a: 1 },
  margin: [0, 0, 0, 0],
  shadow: 0,
  text: '',
  url: '',
};

export const HtmlButton = (props: Partial<HtmlButton>) => {
  const { fontSize, textAlign, fontWeight, color, shadow, text, margin, url, backgroundColor, hidden } = props;
  const {
    connectors: { connect },
    className,
    defaultText,
  } = useNode((node) => ({
    className: node.data.custom.className,
    defaultText: node.data.custom.defaultText,
  }));
  const { websiteData } = useContext(CraftContext);

  const [style, setStyle] = useState({ cursor: 'pointer' });
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));
  if (!defaultText?.trim()?.length) {
    return null;
  }

  useEffect(() => {
    const newStyle = { cursor: 'pointer' };

    if (
      defaultProps.margin[0] !== margin[0] ||
      defaultProps.margin[1] !== margin[1] ||
      defaultProps.margin[2] !== margin[2] ||
      defaultProps.margin[3] !== margin[3]
    ) {
      newStyle.margin = `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`;
    }
    if (
      defaultProps.color.r !== color.r ||
      defaultProps.color.g !== color.g ||
      defaultProps.color.b !== color.b ||
      defaultProps.color.a !== color.a
    ) {
      newStyle.color = `rgba(${Object.values(color)})`;
    }
    if (defaultProps.fontSize !== fontSize) {
      newStyle.fontSize = `${fontSize}px`;
    }
    if (defaultProps.shadow !== shadow) {
      newStyle.textShadow = `0px 0px 2px rgba(0,0,0,${(shadow || 0) / 100})`;
    }
    if (defaultProps.fontWeight !== fontWeight) {
      newStyle.fontWeight = fontWeight;
    }
    if (defaultProps.textAlign !== textAlign) {
      newStyle.textAlign = textAlign;
    }
    if (defaultProps.url !== url) {
      newStyle.url = url;
    }
    if (Object.keys(newStyle).length > 0) {
      setStyle(newStyle);
    }
  }, [props]);
  if (url && !enabled && !hidden) {
    return (
      <>
        <RenderEdit />
        <Button style={{ marginBottom: '5px', marginRight: '5px', backgroundColor: backgroundColor ? `rgba(${Object.values(backgroundColor)})` : undefined }} className={className} ref={connect}>
          <a target='_blank' href={url}>
            <div style={style}>
              {text}
            </div>
          </a>
        </Button>
      </>
    );
  } else {
    return (
      <>
        <RenderEdit />
        <Button
          style={{ opacity: hidden ? 0 : 1, marginBottom: '5px', marginRight: '5px', backgroundColor: backgroundColor ? `rgba(${Object.values(backgroundColor)})` : undefined }} className={className} ref={connect}>
          <div style={style} >
            {text}
          </div>
        </Button>
      </>
    );
  }
};

HtmlButton.craft = {
  // displayName: 'HtmlButton',
  rules: {},
  props: defaultProps,
  custom: {
    className: '',
    defaultText: '',
  },
  related: {
    toolbar: TextSettings,
  },
};
