import generateSlug from "../../../../global/before/functions/generateSlug";

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
      displayStyle: type === 'page' ? 'column' : 'row',
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
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// import { addCollection } from "components/craft/editor/CraftEditor/Modals/utils";
const taxes = [
  {
    countryCode: 'US',
    name: 'US - CA',
    description: 'some tax',
    percentage: 10,
    jurisdiction: 'CA',
    state: 'CA',
    inclusive: false,
    active: true,
  },
  {
    countryCode: 'TW',
    name: 'TW',
    description: 'some tax',
    percentage: 0,
    jurisdiction: undefined,
    inclusive: false,
    active: true,
  },
];
const shippings = [
  {
    name: 'US CA shipping',
    state: 'CA',
    countryCode: 'US',
    currencyCode: 'usd',
    active: true,
    amount: 10,
  },
  {
    name: 'TW Shipping',
    countryCode: 'TW',
    active: true,
    currencyCode: 'ntd',
    amount: 5,
  },
];

const attributes = [
  {
    name: 'size',
    values: [
      {
        value: 'x-small',
        meta: '',
      },
      {
        value: 'small',
        meta: '',
      },
      {
        value: 'medium',
        meta: '',
      },
      {
        value: 'large',
        meta: '',
      },
      {
        value: 'x-large',
        meta: '',
      },
    ],
  },
  {
    name: 'color',
    values: [
      {
        value: 'red',
        meta: '',
      },
      {
        value: 'blue',
        meta: '',
      },
      {
        value: 'green',
      },
    ],
  },
];

const imagePlaceholder = "/mockup-assets/images/devices/3-devices.svg"

const templateJson = {
  "ROOT": {
    "id": "ROOT",
    "type": "Root",
    "displayName": "Root",
    "props": {},
    "custom": {},
    "parent": null,
    "nodes": [
      "829b409c-e186-4807-8316-1d9bb02e868b"
    ],
    "linkedNodes": {},
    "hidden": false,
    "isCanvas": true
  },
  "630e8ab4-03ea-48fd-b0ab-494184564817": {
    "id": "630e8ab4-03ea-48fd-b0ab-494184564817",
    "type": "HtmlText",
    "displayName": "HtmlText",
    "props": {
      "fontSize": "15",
      "textAlign": "center",
      "fontWeight": "500",
      "color": {
        "a": 1,
        "b": 90,
        "g": 90,
        "r": 92
      },
      "margin": [
        0,
        0,
        0,
        0
      ],
      "shadow": 0,
      "text": "TitlePlaceholder",
      "url": ""
    },
    "custom": {
      "className": "",
      "defaultText": "Lorem ipsum dolor\n            sit amet consectutar domor at elis"
    },
    "parent": "c1cc1a0c-69a7-4ab9-8530-dab683b7c76f",
    "nodes": [],
    "linkedNodes": {},
    "hidden": false,
    "isCanvas": true
  },
  "c1cc1a0c-69a7-4ab9-8530-dab683b7c76f": {
    "id": "c1cc1a0c-69a7-4ab9-8530-dab683b7c76f",
    "type": "HtmlTag",
    "displayName": "HtmlTag",
    "props": {
      "backgroundSet": false,
      "backgroundImage": "",
      "backgroundColor": {
        "a": 0.1,
        "b": 255,
        "g": 255,
        "r": 255
      },
      "text": null
    },
    "custom": {
      "src": "",
      "className": "mt-2 mb-4 text-4xl lg:text-5xl font-bold font-heading",
      "htmlElement": "div"
    },
    "parent": "a26d7500-4ee9-4114-aaad-b2323b6cd6ec",
    "nodes": [
      "630e8ab4-03ea-48fd-b0ab-494184564817"
    ],
    "linkedNodes": {},
    "hidden": false,
    "isCanvas": true
  },
  "09c36a7f-4357-484b-8d0a-38973244b2c2": {
    "id": "09c36a7f-4357-484b-8d0a-38973244b2c2",
    "type": "HtmlText",
    "displayName": "HtmlText",
    "props": {
      "fontSize": "15",
      "textAlign": "center",
      "fontWeight": "500",
      "color": {
        "a": 1,
        "b": 90,
        "g": 90,
        "r": 92
      },
      "margin": [
        0,
        0,
        0,
        0
      ],
      "shadow": 0,
      "text": "DescriptionPlaceholder",
      "url": ""
    },
    "custom": {
      "className": "",
      "defaultText": "Lorem ipsum dolor sit amet,\n            consectetur adipiscing elit. Pellentesque massa nibh, pulvinar vitae aliquet nec, accumsan aliquet orci."
    },
    "parent": "51f509cc-e756-46da-8a5f-51b928059300",
    "nodes": [],
    "linkedNodes": {},
    "hidden": false,
    "isCanvas": true
  },
  "51f509cc-e756-46da-8a5f-51b928059300": {
    "id": "51f509cc-e756-46da-8a5f-51b928059300",
    "type": "HtmlTag",
    "displayName": "HtmlTag",
    "props": {
      "backgroundSet": false,
      "backgroundImage": "",
      "backgroundColor": {
        "a": 0.1,
        "b": 255,
        "g": 255,
        "r": 255
      },
      "text": null
    },
    "custom": {
      "src": "",
      "className": "mb-8 text-lg text-gray-500 leading-loose",
      "htmlElement": "div"
    },
    "parent": "a26d7500-4ee9-4114-aaad-b2323b6cd6ec",
    "nodes": [
      "09c36a7f-4357-484b-8d0a-38973244b2c2"
    ],
    "linkedNodes": {},
    "hidden": false,
    "isCanvas": true
  },
  "f790fa21-eec5-418c-b2e5-b800156630f7": {
    "id": "f790fa21-eec5-418c-b2e5-b800156630f7",
    "type": "HtmlTag",
    "displayName": "HtmlTag",
    "props": {
      "backgroundSet": false,
      "backgroundImage": "",
      "backgroundColor": {
        "a": 0.1,
        "b": 255,
        "g": 255,
        "r": 255
      },
      "text": null
    },
    "custom": {
      "src": "",
      "className": "mr-4",
      "htmlElement": "div"
    },
    "parent": "599810d4-9b3e-407a-ad7c-671305b52124",
    "nodes": [],
    "linkedNodes": {},
    "hidden": false,
    "isCanvas": true
  },
  "f1f6efa4-83aa-44ff-9165-515af50d8f2c": {
    "id": "f1f6efa4-83aa-44ff-9165-515af50d8f2c",
    "type": "HtmlTag",
    "displayName": "HtmlTag",
    "props": {
      "backgroundSet": false,
      "backgroundImage": "",
      "backgroundColor": {
        "a": 0.1,
        "b": 255,
        "g": 255,
        "r": 255
      },
      "text": null
    },
    "custom": {
      "src": "",
      "className": "",
      "htmlElement": "div"
    },
    "parent": "599810d4-9b3e-407a-ad7c-671305b52124",
    "nodes": [],
    "linkedNodes": {},
    "hidden": false,
    "isCanvas": true
  },
  "599810d4-9b3e-407a-ad7c-671305b52124": {
    "id": "599810d4-9b3e-407a-ad7c-671305b52124",
    "type": "HtmlTag",
    "displayName": "HtmlTag",
    "props": {
      "backgroundSet": false,
      "backgroundImage": "",
      "backgroundColor": {
        "a": 0.1,
        "b": 255,
        "g": 255,
        "r": 255
      },
      "text": null
    },
    "custom": {
      "src": "",
      "className": "flex justify-center items-center mb-16",
      "htmlElement": "div"
    },
    "parent": "a26d7500-4ee9-4114-aaad-b2323b6cd6ec",
    "nodes": [
      "f790fa21-eec5-418c-b2e5-b800156630f7",
      "f1f6efa4-83aa-44ff-9165-515af50d8f2c"
    ],
    "linkedNodes": {},
    "hidden": false,
    "isCanvas": true
  },
  "a26d7500-4ee9-4114-aaad-b2323b6cd6ec": {
    "id": "a26d7500-4ee9-4114-aaad-b2323b6cd6ec",
    "type": "HtmlTag",
    "displayName": "HtmlTag",
    "props": {
      "backgroundSet": false,
      "backgroundImage": "",
      "backgroundColor": {
        "a": 0.1,
        "b": 255,
        "g": 255,
        "r": 255
      },
      "text": null
    },
    "custom": {
      "src": "",
      "className": "max-w-2xl mx-auto mb-16",
      "htmlElement": "div"
    },
    "parent": "2213e15b-5c06-4a34-ae7b-740be77b3897",
    "nodes": [
      "c1cc1a0c-69a7-4ab9-8530-dab683b7c76f",
      "51f509cc-e756-46da-8a5f-51b928059300",
      "599810d4-9b3e-407a-ad7c-671305b52124"
    ],
    "linkedNodes": {},
    "hidden": false,
    "isCanvas": true
  },
  "77073496-c3ba-408a-8290-f816cb459eb5": {
    "id": "77073496-c3ba-408a-8290-f816cb459eb5",
    "type": "HtmlImg",
    "displayName": "HtmlImg",
    "props": {
      "imageSrc": "",
      "text": null
    },
    "custom": {
      "src": "imagePlaceholder",
      "className": "mx-auto",
      "htmlElement": "img"
    },
    "parent": "b5bcfcfb-64fd-4186-b8d5-0b61c2ac0ef2",
    "nodes": [],
    "linkedNodes": {},
    "hidden": false,
    "isCanvas": true
  },
  "b5bcfcfb-64fd-4186-b8d5-0b61c2ac0ef2": {
    "id": "b5bcfcfb-64fd-4186-b8d5-0b61c2ac0ef2",
    "type": "HtmlTag",
    "displayName": "HtmlTag",
    "props": {
      "backgroundSet": false,
      "backgroundImage": "",
      "backgroundColor": {
        "a": 0.1,
        "b": 255,
        "g": 255,
        "r": 255
      },
      "text": null
    },
    "custom": {
      "src": "",
      "className": "",
      "htmlElement": "div"
    },
    "parent": "2213e15b-5c06-4a34-ae7b-740be77b3897",
    "nodes": [
      "77073496-c3ba-408a-8290-f816cb459eb5"
    ],
    "linkedNodes": {},
    "hidden": false,
    "isCanvas": true
  },
  "2213e15b-5c06-4a34-ae7b-740be77b3897": {
    "id": "2213e15b-5c06-4a34-ae7b-740be77b3897",
    "type": "HtmlTag",
    "displayName": "HtmlTag",
    "props": {
      "backgroundSet": false,
      "backgroundImage": "",
      "backgroundColor": {
        "a": 0.1,
        "b": 255,
        "g": 255,
        "r": 255
      },
      "text": null
    },
    "custom": {
      "src": "",
      "className": "relative container px-4 mx-auto text-center",
      "htmlElement": "div"
    },
    "parent": "829b409c-e186-4807-8316-1d9bb02e868b",
    "nodes": [
      "a26d7500-4ee9-4114-aaad-b2323b6cd6ec",
      "b5bcfcfb-64fd-4186-b8d5-0b61c2ac0ef2"
    ],
    "linkedNodes": {},
    "hidden": false,
    "isCanvas": true
  },
  "829b409c-e186-4807-8316-1d9bb02e868b": {
    "id": "829b409c-e186-4807-8316-1d9bb02e868b",
    "type": "HtmlSection",
    "displayName": "HtmlSection",
    "props": {
      "backgroundSet": false,
      "backgroundImage": "",
      "backgroundColor": {
        "a": 0.1,
        "b": 255,
        "g": 255,
        "r": 255
      },
      "padding": [
        60,
        60,
        60,
        60
      ],
      "text": null
    },
    "custom": {
      "src": "",
      "className": "pt-20",
      "htmlElement": "section"
    },
    "parent": "ROOT",
    "nodes": [
      "2213e15b-5c06-4a34-ae7b-740be77b3897"
    ],
    "linkedNodes": {},
    "hidden": false,
    "isCanvas": true
  }
}

// let templateString = '{"ROOT":{"id":"ROOT","type":"Root","displayName":"Root","props":{},"custom":{},"parent":null,"nodes":["829b409c-e186-4807-8316-1d9bb02e868b"],"linkedNodes":{},"hidden":false,"isCanvas":true},"630e8ab4-03ea-48fd-b0ab-494184564817":{"id":"630e8ab4-03ea-48fd-b0ab-494184564817","type":"HtmlText","displayName":"HtmlText","props":{"fontSize":"15","textAlign":"center","fontWeight":"500","color":{"a":1,"b":90,"g":90,"r":92},"margin":[0,0,0,0],"shadow":0,"text":"TitlePlaceholder","url":""},"custom":{"className":"","defaultText":"Lorem ipsum dolor\\n            sit amet consectutar domor at elis"},"parent":"c1cc1a0c-69a7-4ab9-8530-dab683b7c76f","nodes":[],"linkedNodes":{},"hidden":false,"isCanvas":true},"c1cc1a0c-69a7-4ab9-8530-dab683b7c76f":{"id":"c1cc1a0c-69a7-4ab9-8530-dab683b7c76f","type":"HtmlTag","displayName":"HtmlTag","props":{"backgroundSet":false,"backgroundImage":"","backgroundColor":{"a":0.1,"b":255,"g":255,"r":255},"text":null},"custom":{"src":"","className":"mt-2 mb-4 text-4xl lg:text-5xl font-bold font-heading","htmlElement":"div"},"parent":"a26d7500-4ee9-4114-aaad-b2323b6cd6ec","nodes":["630e8ab4-03ea-48fd-b0ab-494184564817"],"linkedNodes":{},"hidden":false,"isCanvas":true},"09c36a7f-4357-484b-8d0a-38973244b2c2":{"id":"09c36a7f-4357-484b-8d0a-38973244b2c2","type":"HtmlText","displayName":"HtmlText","props":{"fontSize":"15","textAlign":"center","fontWeight":"500","color":{"a":1,"b":90,"g":90,"r":92},"margin":[0,0,0,0],"shadow":0,"text":"DescriptionPlaceholder","url":""},"custom":{"className":"","defaultText":"Lorem ipsum dolor sit amet,\\n            consectetur adipiscing elit. Pellentesque massa nibh, pulvinar vitae aliquet nec, accumsan aliquet orci."},"parent":"51f509cc-e756-46da-8a5f-51b928059300","nodes":[],"linkedNodes":{},"hidden":false,"isCanvas":true},"51f509cc-e756-46da-8a5f-51b928059300":{"id":"51f509cc-e756-46da-8a5f-51b928059300","type":"HtmlTag","displayName":"HtmlTag","props":{"backgroundSet":false,"backgroundImage":"","backgroundColor":{"a":0.1,"b":255,"g":255,"r":255},"text":null},"custom":{"src":"","className":"mb-8 text-lg text-gray-500 leading-loose","htmlElement":"div"},"parent":"a26d7500-4ee9-4114-aaad-b2323b6cd6ec","nodes":["09c36a7f-4357-484b-8d0a-38973244b2c2"],"linkedNodes":{},"hidden":false,"isCanvas":true},"f790fa21-eec5-418c-b2e5-b800156630f7":{"id":"f790fa21-eec5-418c-b2e5-b800156630f7","type":"HtmlTag","displayName":"HtmlTag","props":{"backgroundSet":false,"backgroundImage":"","backgroundColor":{"a":0.1,"b":255,"g":255,"r":255},"text":null},"custom":{"src":"","className":"mr-4","htmlElement":"div"},"parent":"599810d4-9b3e-407a-ad7c-671305b52124","nodes":[],"linkedNodes":{},"hidden":false,"isCanvas":true},"f1f6efa4-83aa-44ff-9165-515af50d8f2c":{"id":"f1f6efa4-83aa-44ff-9165-515af50d8f2c","type":"HtmlTag","displayName":"HtmlTag","props":{"backgroundSet":false,"backgroundImage":"","backgroundColor":{"a":0.1,"b":255,"g":255,"r":255},"text":null},"custom":{"src":"","className":"","htmlElement":"div"},"parent":"599810d4-9b3e-407a-ad7c-671305b52124","nodes":[],"linkedNodes":{},"hidden":false,"isCanvas":true},"599810d4-9b3e-407a-ad7c-671305b52124":{"id":"599810d4-9b3e-407a-ad7c-671305b52124","type":"HtmlTag","displayName":"HtmlTag","props":{"backgroundSet":false,"backgroundImage":"","backgroundColor":{"a":0.1,"b":255,"g":255,"r":255},"text":null},"custom":{"src":"","className":"flex justify-center items-center mb-16","htmlElement":"div"},"parent":"a26d7500-4ee9-4114-aaad-b2323b6cd6ec","nodes":["f790fa21-eec5-418c-b2e5-b800156630f7","f1f6efa4-83aa-44ff-9165-515af50d8f2c"],"linkedNodes":{},"hidden":false,"isCanvas":true},"a26d7500-4ee9-4114-aaad-b2323b6cd6ec":{"id":"a26d7500-4ee9-4114-aaad-b2323b6cd6ec","type":"HtmlTag","displayName":"HtmlTag","props":{"backgroundSet":false,"backgroundImage":"","backgroundColor":{"a":0.1,"b":255,"g":255,"r":255},"text":null},"custom":{"src":"","className":"max-w-2xl mx-auto mb-16","htmlElement":"div"},"parent":"2213e15b-5c06-4a34-ae7b-740be77b3897","nodes":["c1cc1a0c-69a7-4ab9-8530-dab683b7c76f","51f509cc-e756-46da-8a5f-51b928059300","599810d4-9b3e-407a-ad7c-671305b52124"],"linkedNodes":{},"hidden":false,"isCanvas":true},"77073496-c3ba-408a-8290-f816cb459eb5":{"id":"77073496-c3ba-408a-8290-f816cb459eb5","type":"HtmlImg","displayName":"HtmlImg","props":{"imageSrc":"","text":null},"custom":{"src":"ImagePlaceholder","className":"mx-auto","htmlElement":"img"},"parent":"b5bcfcfb-64fd-4186-b8d5-0b61c2ac0ef2","nodes":[],"linkedNodes":{},"hidden":false,"isCanvas":true},"b5bcfcfb-64fd-4186-b8d5-0b61c2ac0ef2":{"id":"b5bcfcfb-64fd-4186-b8d5-0b61c2ac0ef2","type":"HtmlTag","displayName":"HtmlTag","props":{"backgroundSet":false,"backgroundImage":"","backgroundColor":{"a":0.1,"b":255,"g":255,"r":255},"text":null},"custom":{"src":"","className":"","htmlElement":"div"},"parent":"2213e15b-5c06-4a34-ae7b-740be77b3897","nodes":["77073496-c3ba-408a-8290-f816cb459eb5"],"linkedNodes":{},"hidden":false,"isCanvas":true},"2213e15b-5c06-4a34-ae7b-740be77b3897":{"id":"2213e15b-5c06-4a34-ae7b-740be77b3897","type":"HtmlTag","displayName":"HtmlTag","props":{"backgroundSet":false,"backgroundImage":"","backgroundColor":{"a":0.1,"b":255,"g":255,"r":255},"text":null},"custom":{"src":"","className":"relative container px-4 mx-auto text-center","htmlElement":"div"},"parent":"829b409c-e186-4807-8316-1d9bb02e868b","nodes":["a26d7500-4ee9-4114-aaad-b2323b6cd6ec","b5bcfcfb-64fd-4186-b8d5-0b61c2ac0ef2"],"linkedNodes":{},"hidden":false,"isCanvas":true},"829b409c-e186-4807-8316-1d9bb02e868b":{"id":"829b409c-e186-4807-8316-1d9bb02e868b","type":"HtmlSection","displayName":"HtmlSection","props":{"backgroundSet":false,"backgroundImage":"","backgroundColor":{"a":0.1,"b":255,"g":255,"r":255},"padding":[60,60,60,60],"text":null},"custom":{"src":"","className":"pt-20","htmlElement":"section"},"parent":"ROOT","nodes":["2213e15b-5c06-4a34-ae7b-740be77b3897"],"linkedNodes":{},"hidden":false,"isCanvas":true}}'

const createDefaultWebsite = {
  mutateResult: false,
  run: async (root, args, context, info) => {

    try {
      const { prisma } = context;
      const website = await prisma.website.findUnique({
        where: {
          id: context?.params?.result.id,
        },
        include: {
          user: true,
        },
      });

      const templateString = '{"ROOT":{"id":"ROOT","type":"Root","displayName":"Root","props":{},"custom":{},"parent":null,"nodes":["829b409c-e186-4807-8316-1d9bb02e868b"],"linkedNodes":{},"hidden":false,"isCanvas":true},"630e8ab4-03ea-48fd-b0ab-494184564817":{"id":"630e8ab4-03ea-48fd-b0ab-494184564817","type":"HtmlText","displayName":"HtmlText","props":{"fontSize":"15","textAlign":"center","fontWeight":"500","color":{"a":1,"b":90,"g":90,"r":92},"margin":[0,0,0,0],"shadow":0,"text":"TitlePlaceholder","url":""},"custom":{"className":"","defaultText":"Lorem ipsum dolor\\n            sit amet consectutar domor at elis"},"parent":"c1cc1a0c-69a7-4ab9-8530-dab683b7c76f","nodes":[],"linkedNodes":{},"hidden":false,"isCanvas":true},"c1cc1a0c-69a7-4ab9-8530-dab683b7c76f":{"id":"c1cc1a0c-69a7-4ab9-8530-dab683b7c76f","type":"HtmlTag","displayName":"HtmlTag","props":{"backgroundSet":false,"backgroundImage":"","backgroundColor":{"a":0.1,"b":255,"g":255,"r":255},"text":null},"custom":{"src":"","className":"mt-2 mb-4 text-4xl lg:text-5xl font-bold font-heading","htmlElement":"div"},"parent":"a26d7500-4ee9-4114-aaad-b2323b6cd6ec","nodes":["630e8ab4-03ea-48fd-b0ab-494184564817"],"linkedNodes":{},"hidden":false,"isCanvas":true},"09c36a7f-4357-484b-8d0a-38973244b2c2":{"id":"09c36a7f-4357-484b-8d0a-38973244b2c2","type":"HtmlText","displayName":"HtmlText","props":{"fontSize":"15","textAlign":"center","fontWeight":"500","color":{"a":1,"b":90,"g":90,"r":92},"margin":[0,0,0,0],"shadow":0,"text":"DescriptionPlaceholder","url":""},"custom":{"className":"","defaultText":"Lorem ipsum dolor sit amet,\\n            consectetur adipiscing elit. Pellentesque massa nibh, pulvinar vitae aliquet nec, accumsan aliquet orci."},"parent":"51f509cc-e756-46da-8a5f-51b928059300","nodes":[],"linkedNodes":{},"hidden":false,"isCanvas":true},"51f509cc-e756-46da-8a5f-51b928059300":{"id":"51f509cc-e756-46da-8a5f-51b928059300","type":"HtmlTag","displayName":"HtmlTag","props":{"backgroundSet":false,"backgroundImage":"","backgroundColor":{"a":0.1,"b":255,"g":255,"r":255},"text":null},"custom":{"src":"","className":"mb-8 text-lg text-gray-500 leading-loose","htmlElement":"div"},"parent":"a26d7500-4ee9-4114-aaad-b2323b6cd6ec","nodes":["09c36a7f-4357-484b-8d0a-38973244b2c2"],"linkedNodes":{},"hidden":false,"isCanvas":true},"f790fa21-eec5-418c-b2e5-b800156630f7":{"id":"f790fa21-eec5-418c-b2e5-b800156630f7","type":"HtmlTag","displayName":"HtmlTag","props":{"backgroundSet":false,"backgroundImage":"","backgroundColor":{"a":0.1,"b":255,"g":255,"r":255},"text":null},"custom":{"src":"","className":"mr-4","htmlElement":"div"},"parent":"599810d4-9b3e-407a-ad7c-671305b52124","nodes":[],"linkedNodes":{},"hidden":false,"isCanvas":true},"f1f6efa4-83aa-44ff-9165-515af50d8f2c":{"id":"f1f6efa4-83aa-44ff-9165-515af50d8f2c","type":"HtmlTag","displayName":"HtmlTag","props":{"backgroundSet":false,"backgroundImage":"","backgroundColor":{"a":0.1,"b":255,"g":255,"r":255},"text":null},"custom":{"src":"","className":"","htmlElement":"div"},"parent":"599810d4-9b3e-407a-ad7c-671305b52124","nodes":[],"linkedNodes":{},"hidden":false,"isCanvas":true},"599810d4-9b3e-407a-ad7c-671305b52124":{"id":"599810d4-9b3e-407a-ad7c-671305b52124","type":"HtmlTag","displayName":"HtmlTag","props":{"backgroundSet":false,"backgroundImage":"","backgroundColor":{"a":0.1,"b":255,"g":255,"r":255},"text":null},"custom":{"src":"","className":"flex justify-center items-center mb-16","htmlElement":"div"},"parent":"a26d7500-4ee9-4114-aaad-b2323b6cd6ec","nodes":["f790fa21-eec5-418c-b2e5-b800156630f7","f1f6efa4-83aa-44ff-9165-515af50d8f2c"],"linkedNodes":{},"hidden":false,"isCanvas":true},"a26d7500-4ee9-4114-aaad-b2323b6cd6ec":{"id":"a26d7500-4ee9-4114-aaad-b2323b6cd6ec","type":"HtmlTag","displayName":"HtmlTag","props":{"backgroundSet":false,"backgroundImage":"","backgroundColor":{"a":0.1,"b":255,"g":255,"r":255},"text":null},"custom":{"src":"","className":"max-w-2xl mx-auto mb-16","htmlElement":"div"},"parent":"2213e15b-5c06-4a34-ae7b-740be77b3897","nodes":["c1cc1a0c-69a7-4ab9-8530-dab683b7c76f","51f509cc-e756-46da-8a5f-51b928059300","599810d4-9b3e-407a-ad7c-671305b52124"],"linkedNodes":{},"hidden":false,"isCanvas":true},"77073496-c3ba-408a-8290-f816cb459eb5":{"id":"77073496-c3ba-408a-8290-f816cb459eb5","type":"HtmlImg","displayName":"HtmlImg","props":{"imageSrc":"","text":null},"custom":{"src":"ImagePlaceholder","className":"mx-auto","htmlElement":"img"},"parent":"b5bcfcfb-64fd-4186-b8d5-0b61c2ac0ef2","nodes":[],"linkedNodes":{},"hidden":false,"isCanvas":true},"b5bcfcfb-64fd-4186-b8d5-0b61c2ac0ef2":{"id":"b5bcfcfb-64fd-4186-b8d5-0b61c2ac0ef2","type":"HtmlTag","displayName":"HtmlTag","props":{"backgroundSet":false,"backgroundImage":"","backgroundColor":{"a":0.1,"b":255,"g":255,"r":255},"text":null},"custom":{"src":"","className":"","htmlElement":"div"},"parent":"2213e15b-5c06-4a34-ae7b-740be77b3897","nodes":["77073496-c3ba-408a-8290-f816cb459eb5"],"linkedNodes":{},"hidden":false,"isCanvas":true},"2213e15b-5c06-4a34-ae7b-740be77b3897":{"id":"2213e15b-5c06-4a34-ae7b-740be77b3897","type":"HtmlTag","displayName":"HtmlTag","props":{"backgroundSet":false,"backgroundImage":"","backgroundColor":{"a":0.1,"b":255,"g":255,"r":255},"text":null},"custom":{"src":"","className":"relative container px-4 mx-auto text-center","htmlElement":"div"},"parent":"829b409c-e186-4807-8316-1d9bb02e868b","nodes":["a26d7500-4ee9-4114-aaad-b2323b6cd6ec","b5bcfcfb-64fd-4186-b8d5-0b61c2ac0ef2"],"linkedNodes":{},"hidden":false,"isCanvas":true},"829b409c-e186-4807-8316-1d9bb02e868b":{"id":"829b409c-e186-4807-8316-1d9bb02e868b","type":"HtmlSection","displayName":"HtmlSection","props":{"backgroundSet":false,"backgroundImage":"","backgroundColor":{"a":0.1,"b":255,"g":255,"r":255},"padding":[60,60,60,60],"text":null},"custom":{"src":"","className":"pt-20","htmlElement":"section"},"parent":"ROOT","nodes":["2213e15b-5c06-4a34-ae7b-740be77b3897"],"linkedNodes":{},"hidden":false,"isCanvas":true}}'
        .replace('ImagePlaceholder', website?.imageObj?.url ? website?.imageObj?.url : imagePlaceholder)
        .replace('TitlePlaceholder', website?.name)
        .replace('DescriptionPlaceholder', website?.description)

      // const exampleAttachment = await prisma.attachment.create({
      //   data: {
      //     name: 'Example Attachment',
      //     imageObj: {
      //       url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTZue-7SYtHZFh3WKowj3xBTZKNYlRjsJchA&usqp=CAU'
      //     },
      //     website: {
      //       connect: {
      //         id: website?.id
      //       }
      //     },
      //   }
      // })

      const examplePageWithSlug = await generateSlug.run(root, {
        data: {
          name: 'Example Page',
          content: templateString,
          imageObj: {
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTZue-7SYtHZFh3WKowj3xBTZKNYlRjsJchA&usqp=CAU'
          },
          website: {
            connect: {
              id: website?.id
            }
          },
        }
      }, context, info)

      const examplePage = await prisma.page.create({
        data: examplePageWithSlug?.data?.data
      })
      let exampleProductData = {}
      let products = []
      let productCollection = {}

      console.log("hello world1")
      exampleProductData = {
        name: 'Example Product',
        description: 'An example Product',
        price: 1,
        // isUnlimited: true,
        quantity: 10,
        royaltyFee: 10,
        // productType: 'product',
        website: {
          connect: {
            id: website?.id
          }
        },
        imageObj: {
          url: 'https://i.seadn.io/gae/HG3ksxxOc6RzUH7KidMKwVxiyC4b7pxDsXQoa5FN4-9VznAkrIbQ8nHEdYTG1JefjNU0lLZ2ETeS7tmK5RQPRsli5qzgAZO4hs0GKrI?auto=format&w=750'
        },
      }
      const exampleProductWithSlug = await generateSlug.run(root, {
        data: exampleProductData
      }, context, info)
      const exampleProduct = await prisma.product.create(
        {
          data: exampleProductWithSlug?.data?.data
        }
      )
      products.push(exampleProduct)
      productCollection = await prisma.productCollection.create(
        {
          data: {
            name: 'All Products',
            website: {
              connect: {
                id: website?.id
              }
            },
            products: {
              connect: products.map((_product) => {
                return {
                  id: _product.id
                }
              })
            }
          }
        }
      )

      // let jobCollection, departmentCollection
      // if (website.host.includes('yoh') || website.host.includes('dlbs')) {

      console.log("hello world4")

      const exampleExternalPageWithSlug = await generateSlug.run(root, {
        data: {
          name: 'Example External Page: Google',
          externalUrl: "https://www.google.com",
          isExternalLink: true,
          imageObj: {
            url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2008px-Google_%22G%22_Logo.svg.png'
          },
          website: {
            connect: {
              id: website?.id
            }
          },
        }
      }, context, info)
      const exampleExternalPage = await prisma.page.create(
        { data: exampleExternalPageWithSlug?.data?.data }
      )
      console.log("hello world5")

      // const attachmentCollection = await prisma.attachmentCollection.create(
      //   {
      //     data: {
      //       name: 'All Attachments',
      //       website: {
      //         connect: {
      //           id: website?.id
      //         }
      //       },
      //       attachments: {
      //         connect: [{ id: exampleAttachment.id }]
      //       }
      //     }
      //   }
      // )
      // console.log("hello world6")

      const pageCollection = await prisma.pageCollection.create(
        {
          data: {
            name: 'All Pages',
            website: {
              connect: {
                id: website?.id
              }
            },
            pages: {
              connect: [{ id: exampleExternalPage.id }, { id: examplePage.id }]
            }
          }
        }
      )

      const exampleVideoWithSlug = await generateSlug.run(root, {
        data: {
          name: 'Example Video',
          // content: templateString,
          imageObj: {
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTZue-7SYtHZFh3WKowj3xBTZKNYlRjsJchA&usqp=CAU'
          },
          website: {
            connect: {
              id: website?.id
            }
          },
        }
      }, context, info)

      const exampleVideo = await prisma.video.create(
        {
          data: exampleVideoWithSlug?.data?.data
        }
      )

      const videoCollection = await prisma.videoCollection.create({
        data: {
          name: 'All Videos',
          website: {
            connect: {
              id: website?.id
            }
          },
          videos: {
            connect: [{ id: exampleVideo.id }]
          }
        }
      })

      const addVideoGroupJson = addCollection({
        currentJson: templateString,
        collectionId: videoCollection?.id,
        websiteId: website?.id,
        type: 'video',
        addItemIndex: 2,
      });

      const addPageGroupJson = addCollection({
        currentJson: JSON.stringify(addVideoGroupJson),
        collectionId: pageCollection?.id,
        websiteId: website?.id,
        type: 'page',
        addItemIndex: 2,
      });

      let indexPageWithSlug

      const addProductCollectionJson = addCollection({
        currentJson: JSON.stringify(addPageGroupJson),
        collectionId: productCollection?.id,
        websiteId: website?.id,
        type: 'product',
        addItemIndex: 3,
      });

      indexPageWithSlug = await generateSlug.run(root, {
        data: {
          content: addProductCollectionJson,
          isIndex: true,
          name: 'Home',
          website: {
            connect: {
              id: website?.id
            }
          }
        }
      }, context, info)


      console.log("hello world10")

      const indexPage = await prisma.page.create(
        {
          data: indexPageWithSlug?.data?.data
        }
      )


      // const websiteTaxes = taxes.filter((tax) => tax.countryCode === website.countryCode);
      // const websiteShippings = shippings.filter((shipping) => shipping.countryCode === website.countryCode);
      // await Promise.all(
      //   websiteTaxes.map(async (tax, index) => {
      //     const stripePrivateTax = await stripe.taxRates.create(
      //       {
      //         display_name: tax.name,
      //         description: tax.description,
      //         jurisdiction: tax.jurisdiction,
      //         state: tax.state,
      //         percentage: tax.percentage,
      //         inclusive: tax.inclusive,
      //         country: tax.countryCode,
      //       },
      //       {
      //         stripeAccount: website?.user?.stripeAccountId,
      //       },
      //     );
      //     websiteTaxes[index] = {
      //       ...websiteTaxes[index],
      //       stripePrivateTaxId: stripePrivateTax.id,
      //     };
      //   }),
      // );
      // const account = await stripe.accounts.create({
      //   type: 'express',
      //   email: website?.user.email,
      // });
      // const updateWebsite = await prisma.website.update({
      //   where: {
      //     id: context?.params?.result.id,
      //   },
      //   data: {
      //     // simpleIndexPage: addProductCollectionJson,
      //     paymentMethod: 'crypto',
      //     // stripeAccountId: account.id,

      //     // stripeAccountId: process.env.NODE_ENV === 'production' ? account.id : 'acct_1JBheKRK4I1jKgKY',
      //     // taxes: {
      //     //   createMany: {
      //     //     data: websiteTaxes,
      //     //   },
      //     // },
      //     // shippings: {
      //     //   createMany: {
      //     //     data: websiteShippings,
      //     //   },
      //     // },
      //     // attributes: {
      //     //   create: attributes,
      //     // }
      //   },
      // });

      return { data: context?.params?.result };
    } catch (error) {
      return { error };
    }
  },
};

export default createDefaultWebsite;
