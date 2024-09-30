import React, { useState, useEffect } from 'react';
import { useNode, useEditor } from '@craftjs/core';
import { TextSettings } from './TextSettings';
import { RenderEdit } from '../../editor/RenderEdit';
import ContentEditable from 'react-contenteditable';


export type HtmlText = {
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
  textAlign: 'center',
  fontWeight: '500',
  color: { r: 92, g: 90, b: 90, a: 1 },
  margin: [0, 0, 0, 0],
  shadow: 0,
  text: '',
  url: '',
};

export const HtmlText = (props: Partial<HtmlText>) => {
  const { fontSize, textAlign, fontWeight, color, shadow, text, margin, url, hidden } = props;
  const {
    connectors: { connect },
    className,
    selected,
    defaultText,
    actions: { setProp },
  } = useNode((node) => ({
    className: node.data.custom.className,
    defaultText: node.data.custom.defaultText,
    selected: node.events.selected,
  }));
  console.log(hidden, 'hidden')
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));
  const [style, setStyle] = useState({
    cursor: 'pointer'
  });

  if (!defaultText.trim().length) {
    return null;
  }

  useEffect(() => {
    const newStyle = {
      cursor: 'pointer',
      fontWeight,
      textAlign,
    };

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
      newStyle.color = `rgba(${color?.r},${color?.g},${color?.b},${color?.a})`;
    }
    if (defaultProps.fontSize !== fontSize) {
      newStyle.fontSize = `${fontSize}px`;
    }
    if (defaultProps.shadow !== shadow) {
      newStyle.textShadow = `0px 0px 2px rgba(0,0,0,${(shadow || 0) / 100})`;
    }
    // if (defaultProps.fontWeight !== fontWeight) {
    // newStyle.fontWeight = fontWeight;
    // }
    // if (defaultProps.textAlign !== textAlign) {
    // newStyle.textAlign = textAlign;
    // }
    if (Object.keys(newStyle).length > 0) {
      setStyle(newStyle);
    }
  }, [props]);

  if (url && !enabled) {
    return (
      <a target={(url.includes('yoh.app') || url.includes('pixite')) ? '_self' : '_blank'} href={url}>
        <RenderEdit />
        <div className={className} ref={connect}>
          <ContentEditable
            html={text}
            disabled={!enabled}
            onChange={(e) =>
              // setProp(
              //   (props) =>
              //     (props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, '')),
              //   500
              // )
              setProp(
                (props) =>
                  (props.text = e.target.value)
              )
            }
            tagName="p"
            style={style}
            className={className}
          />
        </div>
      </a>
    );
  } else {
    return (
      <div style={{ opacity: hidden ? 0 : 1 }} ref={connect}>
        <ContentEditable
          html={text}
          disabled={!enabled}
          onChange={(e) =>
            // setProp(
            //   (props) =>
            //     (props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, '')),
            //   500
            // )
            setProp(
              (props) =>
                (props.text = e.target.value)
            )
          }
          tagName="p"
          style={style} className={className}
        />
        <RenderEdit />
      </div>
    );
  }
};

HtmlText.craft = {
  // displayName: 'HtmlText',
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
