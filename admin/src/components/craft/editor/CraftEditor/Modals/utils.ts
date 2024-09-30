import All from 'templates/sections/basic.json';
import { DomHandler, Parser } from 'htmlparser2';
import { v4 as uuid } from 'uuid';

export const isCollectionType = ({ selected, query }) => {
  if (selected?.size > 0) {
    const node = query?.node(Array.from(selected)[0]);
    if (node?.node?.type === 'Collection') {
      return true;
    }
  }
  return false;
};
export const addCollection = ({ currentJson, collectionId, websiteId, type, addItemIndex }) => {
  const jsonContent = JSON.parse(currentJson);
  jsonContent.ROOT.nodes.splice(addItemIndex, 0, collectionId);
  jsonContent[collectionId] = {
    type: {
      resolvedName: 'Collection',
    },
    isCanvas: false,
    props: {
      id: collectionId,
      websiteId,
      type,
    },
    displayName: 'Collection',
    custom: {
      // id: collectionId,
      // websiteId,
      // type,
    },
    hidden: false,
    nodes: [],
    linkedNodes: {},
    parent: 'ROOT',
  };

  return jsonContent;
};

export const addTemplate = ({ id, addItemIndex, currentJson }) => {
  const template = All?.find((tem) => tem.id === id);

  const jsonContent = JSON.parse(currentJson);

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
              resolvedName: getResolvedName(domItem),
            },
            isCanvas: true,
            props: getResolvedName(domItem) === 'HtmlButton' && domItem?.children?.[0]?.data ? {
              text: domItem.children[0].data
            } : {
              text: domItem?.data
            },
            displayName: domItem?.name,
            custom: {
              htmlElement: domItem?.name,
              className: domItem?.attribs?.class,
              defaultText: getResolvedName(domItem) === 'HtmlButton' ? domItem?.children?.[0]?.data : domItem?.data,
              style: domItem?.attribs.style,
            },
            hidden: false,
            nodes: [],
            linkedNodes: {},
            parent: 'ROOT',
          };
          if (getResolvedName(domItem) === 'HtmlSection') {
            jsonContent.ROOT.nodes.splice(addItemIndex, 0, domItem.id);
          }
        }
      });
    }
  });
  const parser = new Parser(handler);
  parser.write(template.html);
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
            resolvedName: getResolvedName(child),
          },
          isCanvas: true,
          props: getResolvedName(child) === 'HtmlButton' && child?.children?.[0]?.data ? {
            text: child.children[0].data
          } : {
            text: child?.data
          },
          // displayName: child.type === 'tag' ? child?.name : 'text',
          custom: {
            // htmlElement: child.type === 'tag' ? child?.name : 'text',
            className: child?.attribs?.class,
            // defaultText: child?.data,
            defaultText: getResolvedName(child) === 'HtmlButton' ? child?.children?.[0]?.data : child?.data,
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

  return { ...jsonContent, ...craftNodes };
};

export const getResolvedName = (element) => {
  if (element.type === 'tag') {
    // if (element?.children?.[0]?.data && element?.attribs?.class?.includes('transition') && element?.attribs?.class?.includes('duration-200') || element.name === 'a') {
    if ((element?.attribs?.class?.includes('rounded') && element?.attribs?.class?.includes('hover')) || (element?.attribs?.class?.includes('transition') && element?.attribs?.class?.includes('hover'))) {
      return 'HtmlButton'
    } else if (element.name === 'section') {
      return 'HtmlSection';
    } else if (element.name === 'img') {
      return 'HtmlImg';
    } else {
      return 'HtmlTag';
    }
  } else {
    return 'HtmlText';
  }
};