import processItem from './item';

export const processImage = (item) => {
  return {
    id: item?.url,
    url: item?.url,
    image: item?.url,
    mobile: {
      url: item?.url,
    },
    desktop: {
      url: item?.url,
    },
    original: item?.url,
    thumbnail: item?.url,
  }
}

export const processVideo = (item) => {
  const requests = item?.requests?.filter((request) => request?.requestStatus === 'active').map((request) => processItem(request))

  return JSON.parse(JSON.stringify({
    ...item,
    requests
  }));
}

export const processAudio = (item) => {
  return {
    id: item?.url,
    url: item?.url,
    // audio: item?.url,
    // mobile: {
    //   url: item?.url,
    // },
    // desktop: {
    //   url: item?.url,
    // },
    // original: item?.url,
    // thumbnail: item?.url,
  }
}
