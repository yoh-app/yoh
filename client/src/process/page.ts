import processItem from './item';
const processPage = (page) => {
  const requests = page?.requests?.filter((request) => request?.requestStatus === 'active').map((request) => processItem(request))

  return JSON.parse(JSON.stringify({
    ...page,
    requests
  }));
};

export default processPage;
