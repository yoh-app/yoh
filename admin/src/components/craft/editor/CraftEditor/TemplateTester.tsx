import React, { useEffect, useState } from 'react';
import { useEditor } from '@craftjs/core';
import { DomHandler, Parser } from 'htmlparser2';
import { v4 as uuid } from 'uuid';

export const TemplateTester = () => {
  const {
    enabled,
    actions: { setOptions, history, deserialize },
    connectors: { create },
    canUndo,
    canRedo,
    query,
  } = useEditor((state, query) => ({
    enabled: state.options.enabled,
    canUndo: query.history.canUndo(),
    canRedo: query.history.canRedo(),
  }));

  const [expJson, setExpJson] = useState(null);
  const [expHtml, setExpHtml] = useState(null);

  return (
    <div
      style={{
        zIndex: 10000,
        background: 'black',
        color: 'white',
        position: 'fixed',
        bottom: 0,
        right: 0,
      }}
    >
      <div>
        import json:&nbsp;
        <input
          style={{ color: 'black' }}
          type="text"
          onChange={(e) => setExpJson(e.target.value)}
        />
        <button onClick={() => deserialize(expJson)}>submit</button>
      </div>
      <div>
        export json:&nbsp;
        <button
          onClick={() => {
            const contentString = query.serialize();
          }}
        >
          submit
        </button>
      </div>
      <div>
        import html:&nbsp;
        <input style={{ color: 'black' }} onChange={(e) => setExpHtml(e.target.value)} />
        <button
          onClick={() => {
            const jsonContent = {
              ROOT: {
                type: { resolvedName: 'Root' },
                isCanvas: true,
                hidden: false,
                displayName: 'Root',
                nodes: [],
                props: {},
              },
            };

            let root = {};
            const craftNodes = {};

            const handler = new DomHandler(function (error, dom) {
              if (error) {
                // Handle error
              } else {
                // Parsing completed, do something
                // root = dom;
                dom.forEach((domItem) => {
                  if (domItem?.type === 'tag') {
                    domItem.id = uuid();
                    root = domItem;
                    craftNodes[domItem.id] = {
                      type: {
                        // resolvedName: domItem?.name === 'img' ? 'HtmlImg' : 'HtmlTag',
                        resolvedName: 'HtmlTag',
                      },
                      isCanvas: true,
                      props: {},
                      displayName: domItem?.name,
                      custom: {
                        htmlElement: domItem?.name,
                        className: domItem?.attribs?.class,
                        defaultText: domItem?.data,
                        style: domItem?.attribs.style,
                      },
                      hidden: false,
                      nodes: [],
                      linkedNodes: {},
                      parent: 'ROOT',
                    };
                    jsonContent.ROOT.nodes.push(domItem.id);
                  }
                });
              }
            });
            const parser = new Parser(handler);
            parser.write(expHtml);
            parser.end();

            traverse(root);

            function traverse(cursor) {
              if (cursor.children) {
                cursor.children.forEach((child) => {
                  child.id = uuid();

                  if (child.parent) {
                    craftNodes[child.parent.id].nodes.push(child.id);
                  }
                  craftNodes[child.id] = {
                    type: {
                      // resolvedName: child.type === 'tag' ? (child.name === 'img' ? 'HtmlImg' : 'HtmlTag') : 'HtmlText',
                      resolvedName: child.type === 'tag' ? 'HtmlTag' : 'HtmlText',
                    },
                    isCanvas: true,
                    props: {},
                    displayName: child.type === 'tag' ? child?.name : 'text',
                    custom: {
                      htmlElement: child.type === 'tag' ? child?.name : 'text',
                      className: child?.attribs?.class,
                      defaultText: child?.data,
                      src: child?.attribs?.src,
                      style: child?.attribs?.style,
                    },
                    hidden: false,
                    nodes: [],
                    linkedNodes: {},
                    parent: child?.parent?.id,
                  };
                  traverse(child);
                });
              }
            }
            deserialize({ ...jsonContent, ...craftNodes });
          }}
        >
          test
        </button>
      </div>
    </div>
  );
};
