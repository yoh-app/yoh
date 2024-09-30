// import asyncRedis from 'async-redis';
import { kv, createClient } from '@vercel/kv';

const aDay = 24 * 60 * 60;
// PageViewAggregateQuery
interface Parameters {
  type: string,
  beginSec: number,
  endSec: number,
  wedsiteId: string,
  isRenew: boolean
}

const getInitList = (props: Parameters) => {
  const { beginSec, endSec } = props;
  if (endSec - beginSec <= aDay) {
    return Array(24).fill(1).map((_, index) => {
      return {
        key: index,
        value: 0
      }
    })
  } else {
    const beginTimestamp = Math.floor(beginSec / aDay);
    const endTimestamp = Math.floor(endSec / aDay);

    return Array(endTimestamp - beginTimestamp + 1).fill(1).map((_, index) => {
      const date = new Date((beginTimestamp + index) * aDay * 1000);
      const key = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      return {
        key,
        value: 0
      }
    })
  }
}

export const getWebsiteAnalytics = (prisma: any, props: Parameters) => {
  const { type } = props;
  switch (type) {
    case 'widget':
      return getAnalyticsWidget(prisma, props);
    case 'income':
      return getAnalyticsIncome(prisma, props);
    case 'times':
      return getAnalyticsTimes(prisma, props);
    case 'top5PageView':
      return getAnalyticsTop5PageView(prisma, props);
    case 'top3Sales':
      return getAnalyticsTop3Sales(prisma, props);
    case 'request':
      return getAnalyticsRequest(prisma, props);
    case 'top5PageRequest':
      return getAnalyticsTop5PageRequest(prisma, props);
    default:
      return {}
  }
}

export const getAnalyticsWidget = async (prisma: any, props: Parameters) => {
  const { beginSec, endSec, wedsiteId, isRenew } = props;
  let countOrderIncome = 0;
  let countRequestIncome = 0;
  let countPageView = 0;

  const redisName = `websiteAnalytics_${wedsiteId}_widget_${beginSec}_${endSec}`;

  let result;

  // get data from redis is exists
  // const client = asyncRedis.createClient({
  //   url: process.env.REDIS_URL,
  // })
  // const anayticsDate = await client.get(redisName);

  const kvClient = createClient({
    url: process.env.NODE_ENV === 'production' ? process.env.KV_REST_API_URL : process.env.KV_REST_API_URL,
    token: process.env.NODE_ENV === 'production' ? process.env.KV_REST_API_TOKEN : process.env.KV_REST_API_TOKEN,
  });

  const anayticsDate = await kvClient.get(redisName);

  if (anayticsDate && !isRenew) {
    const { analyticsData, expiredAt } = JSON.parse(anayticsDate);

    if (expiredAt >= Date.now()) {
      return {
        ...analyticsData
      };
    }
  }

  // order income
  const orderList = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: new Date(beginSec * 1000),
        lt: new Date(endSec * 1000),
      },
      websiteId: {
        equals: wedsiteId
      },
      paid: {
        equals: true
      }
      // orderStatus: {
      //   equals: 'completed'
      // }
    },
  })
  orderList.forEach((element: any) => {
    countOrderIncome += element.total
  });

  // request income
  const requestList = await prisma.request.findMany(
    {
      where: {
        NOT: {
          requestStatus: {
            equals: 'pending',
          },
        },
        OR: [
          {
            requestStatus: {
              equals: 'completed'
            }
          },
          {
            requestStatus: {
              equals: 'active'
            }
          },
        ],
        AND: {
          createdAt: {
            gte: new Date(beginSec * 1000),
            lt: new Date(endSec * 1000),
          },
          page: {
            websiteId: {
              equals: wedsiteId
            }
          },
        },
      },
    }

    // {
    // where: {
    //   createdAt: {
    //     gte: new Date(beginSec * 1000),
    //     lt: new Date(endSec * 1000),
    //   },
    //   page: {
    //     websiteId: {
    //       equals: wedsiteId
    //     }
    //   },
    //   requestStatus: {
    //     equals: 'active'
    //   }
    // },
    // }
  )
  console.log(requestList, 'request list 1')
  requestList.forEach((element: any) => {
    countRequestIncome += element.total
  });

  // page view
  const pageViews = await prisma.pageView.findMany({
    where: {
      createdAt: {
        gte: new Date(beginSec * 1000),
        lt: new Date(endSec * 1000),
      },
      page: {
        websiteId: {
          equals: wedsiteId
        }
      }
    },
  })
  countPageView = pageViews.length

  result = {
    countOrderIncome,
    countRequestIncome,
    countPageView,
    analyticsAt: Date.now()
  }

  // save to redis
  const timeout = 24 * 60 * 60 * 1000; // 24 hours
  // client.set(redisName, JSON.stringify({ analyticsData: result, expiredAt: Date.now() + timeout }))
  kvClient.set(redisName, JSON.stringify({ analyticsData: result, expiredAt: Date.now() + timeout }))

  return result;
}

export const getAnalyticsIncome = async (prisma: any, props: Parameters) => {
  const { beginSec, endSec, wedsiteId, isRenew } = props;
  const orderedProductData = getInitList(props);
  const requestData = getInitList(props);
  const orderData = getInitList(props);

  const redisName = `websiteAnalytics_${wedsiteId}_income_${beginSec}_${endSec}`;

  let result;

  // get data from redis is exists
  // const client = asyncRedis.createClient({
  //   url: process.env.REDIS_URL,
  // })
  // const anayticsDate = await client.get(redisName);
  const kvClient = createClient({
    url: process.env.NODE_ENV === 'production' ? process.env.KV_REST_API_URL : process.env.KV_REST_API_URL,
    token: process.env.NODE_ENV === 'production' ? process.env.KV_REST_API_TOKEN : process.env.KV_REST_API_TOKEN,
  });

  const anayticsDate = await kvClient.get(redisName);

  if (anayticsDate && !isRenew) {
    const { analyticsData, expiredAt } = JSON.parse(anayticsDate);

    if (expiredAt >= Date.now()) {
      return analyticsData;
    }
  }

  const orderList = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: new Date(beginSec * 1000),
        lt: new Date(endSec * 1000),
      },
      websiteId: {
        equals: wedsiteId
      },
      paid: {
        equals: true
      }
      // orderStatus: {
      //   equals: 'completed'
      // }
    },
  })
  orderList.forEach((element: any) => {
    const createdDate = new Date(element.createdAt);
    const key = `${createdDate.getFullYear()}-${(createdDate.getMonth() + 1).toString().padStart(2, '0')}-${createdDate.getDate().toString().padStart(2, '0')}`;
    const matchedDate = orderData.find((date: any) => {
      if (endSec - beginSec <= aDay) {
        return date.key === createdDate.getHours();
      } else {
        return date.key === key
      }
    })
    if (matchedDate) {
      matchedDate.value += element.total
    }
  });

  // product income
  const orderedProductList = await prisma.orderedProduct.findMany({
    where: {
      createdAt: {
        gte: new Date(beginSec * 1000),
        lt: new Date(endSec * 1000),
      },
      websiteId: {
        equals: wedsiteId
      },
      order: {
        paid: {
          equals: true
        }
        // orderStatus: {
        //   equals: 'completed'
        // }
      }
    },
  })
  orderedProductList.forEach((element: any) => {
    const createdDate = new Date(element.createdAt);
    const key = `${createdDate.getFullYear()}-${(createdDate.getMonth() + 1).toString().padStart(2, '0')}-${createdDate.getDate().toString().padStart(2, '0')}`;
    const matchedDate = orderedProductData.find((date: any) => {
      if (endSec - beginSec <= aDay) {
        return date.key === createdDate.getHours();
      } else {
        return date.key === key
      }
    })
    if (matchedDate) {
      matchedDate.value += element.total
    }
  });

  // request income
  const requestList = await prisma.request.findMany(
    {
      where: {
        NOT: {
          requestStatus: {
            equals: 'pending',
          },
        },
        OR: [
          {
            requestStatus: {
              equals: 'completed'
            }
          },
          {
            requestStatus: {
              equals: 'active'
            }
          },
        ],
        AND: {
          createdAt: {
            gte: new Date(beginSec * 1000),
            lt: new Date(endSec * 1000),
          },
          page: {
            websiteId: {
              equals: wedsiteId
            }
          },
        },
      },
    }
  )

  console.log(requestList, 'request list 2')

  requestList.forEach((element: any) => {
    const createdDate = new Date(element.createdAt);
    const key = `${createdDate.getFullYear()}-${(createdDate.getMonth() + 1).toString().padStart(2, '0')}-${createdDate.getDate().toString().padStart(2, '0')}`;
    const matchedDate = requestData.find((date: any) => {
      if (endSec - beginSec <= aDay) {
        return date.key === createdDate.getHours();
      } else {
        return date.key === key
      }
    })
    if (matchedDate) {
      matchedDate.value += element.total
    }
  });

  result = {
    order: orderData,
    orderedProduct: orderedProductData,
    request: requestData,
    analyticsAt: Date.now()
  }

  // save to redis
  const timeout = 24 * 60 * 60 * 1000; // 24 hours
  // client.set(redisName, JSON.stringify({ analyticsData: result, expiredAt: Date.now() + timeout }))
  kvClient.set(redisName, JSON.stringify({ analyticsData: result, expiredAt: Date.now() + timeout }))

  return result;
}

export const getAnalyticsTimes = async (prisma: any, props: Parameters) => {
  const { beginSec, endSec, wedsiteId, isRenew } = props;
  const pageViewData = getInitList(props);
  const orderData = getInitList(props);

  const redisName = `websiteAnalytics_${wedsiteId}_times_${beginSec}_${endSec}`;

  let result;

  // get data from redis is exists
  // const client = asyncRedis.createClient({
  //   url: process.env.REDIS_URL,
  // })
  const kvClient = createClient({
    url: process.env.NODE_ENV === 'production' ? process.env.KV_REST_API_URL : process.env.KV_REST_API_URL,
    token: process.env.NODE_ENV === 'production' ? process.env.KV_REST_API_TOKEN : process.env.KV_REST_API_TOKEN,
  });

  const anayticsDate = await kvClient.get(redisName);
  if (anayticsDate && !isRenew) {
    const { analyticsData, expiredAt } = JSON.parse(anayticsDate);

    if (expiredAt >= Date.now()) {
      return analyticsData;
    }
  }

  // page view
  const pageViewList = await prisma.pageView.findMany({
    where: {
      createdAt: {
        gte: new Date(beginSec * 1000),
        lt: new Date(endSec * 1000),
      },
      page: {
        websiteId: {
          equals: wedsiteId
        },
      }
    },
  })
  pageViewList.forEach((element: any) => {
    const createdDate = new Date(element.createdAt);
    const key = `${createdDate.getFullYear()}-${(createdDate.getMonth() + 1).toString().padStart(2, '0')}-${createdDate.getDate().toString().padStart(2, '0')}`;
    const matchedDate = pageViewData.find((date: any) => {
      if (endSec - beginSec <= aDay) {
        return date.key === createdDate.getHours();
      } else {
        return date.key === key
      }
    })
    if (matchedDate) {
      matchedDate.value += 1
    }
  });

  // order
  const orderList = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: new Date(beginSec * 1000),
        lt: new Date(endSec * 1000),
      },
      websiteId: {
        equals: wedsiteId
      },
    },
  })
  orderList.forEach((element: any) => {
    const createdDate = new Date(element.createdAt);
    const key = `${createdDate.getFullYear()}-${(createdDate.getMonth() + 1).toString().padStart(2, '0')}-${createdDate.getDate().toString().padStart(2, '0')}`;
    const matchedDate = orderData.find((date: any) => {
      if (endSec - beginSec <= aDay) {
        return date.key === createdDate.getHours();
      } else {
        return date.key === key
      }
    })
    if (matchedDate) {
      matchedDate.value += 1;
    }
  });

  result = {
    pageView: pageViewData,
    order: orderData,
    analyticsAt: Date.now()
  }

  // save to redis
  const timeout = 24 * 60 * 60 * 1000; // 24 hours
  // client.set(redisName, JSON.stringify({ analyticsData: result, expiredAt: Date.now() + timeout }))
  kvClient.set(redisName, JSON.stringify({ analyticsData: result, expiredAt: Date.now() + timeout }))

  return result;
}

export const getAnalyticsTop5PageView = async (prisma: any, props: Parameters) => {
  const { beginSec, endSec, wedsiteId, isRenew } = props;
  const pageViewData: Record<string, any> = [];

  const redisName = `websiteAnalytics_${wedsiteId}_top5pageView_${beginSec}_${endSec}`;

  let result;

  // get data from redis is exists
  // const client = asyncRedis.createClient({
  //   url: process.env.REDIS_URL,
  // })
  const kvClient = createClient({
    url: process.env.NODE_ENV === 'production' ? process.env.KV_REST_API_URL : process.env.KV_REST_API_URL,
    token: process.env.NODE_ENV === 'production' ? process.env.KV_REST_API_TOKEN : process.env.KV_REST_API_TOKEN,
  });

  const anayticsDate = await kvClient.get(redisName);
  if (anayticsDate && !isRenew) {
    const { analyticsData, expiredAt } = JSON.parse(anayticsDate);

    if (expiredAt >= Date.now()) {
      return analyticsData;
    }
  }

  // page view
  const pageViewList = await prisma.pageView.findMany({
    where: {
      createdAt: {
        gte: new Date(beginSec * 1000),
        lt: new Date(endSec * 1000),
      },
      page: {
        websiteId: {
          equals: wedsiteId
        },
      }
    },
    include: {
      page: true,
    }
  })
  const _pageViewSet: Record<string, any> = {};
  pageViewList.forEach((element: any) => {
    if (_pageViewSet[element.pageId]) {
      _pageViewSet[element.pageId].count += 1;
    } else {
      _pageViewSet[element.pageId] = {
        id: element.pageId,
        pageName: element.page.name,
        count: 1
      }
    }
  });

  Object.keys(_pageViewSet).forEach((key) => {
    pageViewData.push(_pageViewSet[key])
  })

  result = {
    pageView: pageViewData.sort((a, b) => {
      return b.count - a.count
    }).slice(0, 5),
    analyticsAt: Date.now()
  }

  // save to redis
  const timeout = 24 * 60 * 60 * 1000; // 24 hours
  kv.set(redisName, JSON.stringify({ analyticsData: result, expiredAt: Date.now() + timeout }))

  return result;
}

export const getAnalyticsTop3Sales = async (prisma: any, props: Parameters) => {
  const { beginSec, endSec, wedsiteId, isRenew } = props;
  const orderedproductData: Record<string, any> = [];

  const redisName = `websiteAnalytics_${wedsiteId}_top3sales_${beginSec}_${endSec}`;

  let result;

  // get data from redis is exists
  // const client = asyncRedis.createClient({
  //   url: process.env.REDIS_URL,
  // })

  const kvClient = createClient({
    url: process.env.NODE_ENV === 'production' ? process.env.KV_REST_API_URL : process.env.KV_REST_API_URL,
    token: process.env.NODE_ENV === 'production' ? process.env.KV_REST_API_TOKEN : process.env.KV_REST_API_TOKEN,
  });

  const anayticsDate = await kvClient.get(redisName);
  if (anayticsDate && !isRenew) {
    const { analyticsData, expiredAt } = JSON.parse(anayticsDate);

    if (expiredAt >= Date.now()) {
      return analyticsData;
    }
  }

  // ordered product
  const orderedProductList = await prisma.orderedProduct.findMany({
    where: {
      createdAt: {
        gte: new Date(beginSec * 1000),
        lt: new Date(endSec * 1000),
      },
      websiteId: {
        equals: wedsiteId
      },
      order: {
        paid: {
          equals: true
        }
        // orderStatus: {
        //   equals: 'completed'
        // }
      }
    },
    include: {
      product: true
    }
  })
  const _orderedProductSet: Record<string, any> = {};
  orderedProductList.forEach((element: any) => {
    if (_orderedProductSet[element.product.id]) {
      _orderedProductSet[element.product.id].amount += element.total;
    } else {
      _orderedProductSet[element.product.id] = {
        id: element.product.id,
        productName: element.name,
        amount: element.total
      }
    }
  });

  Object.keys(_orderedProductSet).forEach((key) => {
    orderedproductData.push(_orderedProductSet[key])
  })

  result = {
    orderedProduct: orderedproductData.sort((a, b) => {
      return b.amount - a.amount
    }).slice(0, 3),
    analyticsAt: Date.now()
  }

  // save to redis
  const timeout = 24 * 60 * 60 * 1000; // 24 hours
  // client.set(redisName, JSON.stringify({ analyticsData: result, expiredAt: Date.now() + timeout }))
  kvClient.set(redisName, JSON.stringify({ analyticsData: result, expiredAt: Date.now() + timeout }))

  return result;
}

export const getAnalyticsRequest = async (prisma: any, props: Parameters) => {
  const { beginSec, endSec, wedsiteId, isRenew } = props;
  const requestData = getInitList(props);

  const redisName = `websiteAnalytics_${wedsiteId}_request_${beginSec}_${endSec}`;

  let result;

  // get data from redis is exists
  // const client = asyncRedis.createClient({
  //   url: process.env.REDIS_URL,
  // })
  const kvClient = createClient({
    url: process.env.NODE_ENV === 'production' ? process.env.KV_REST_API_URL : process.env.KV_REST_API_URL,
    token: process.env.NODE_ENV === 'production' ? process.env.KV_REST_API_TOKEN : process.env.KV_REST_API_TOKEN,
  });

  const anayticsDate = await kvClient.get(redisName);
  if (anayticsDate && !isRenew) {
    const { analyticsData, expiredAt } = JSON.parse(anayticsDate);

    if (expiredAt >= Date.now()) {
      return analyticsData;
    }
  }

  // request
  const requestList = await prisma.request.findMany(
    {
      where: {
        NOT: {
          requestStatus: {
            equals: 'pending',
          },
        },
        OR: [
          {
            requestStatus: {
              equals: 'completed'
            }
          },
          {
            requestStatus: {
              equals: 'active'
            }
          },
        ],
        AND: {
          createdAt: {
            gte: new Date(beginSec * 1000),
            lt: new Date(endSec * 1000),
          },
          page: {
            websiteId: {
              equals: wedsiteId
            }
          },
        },
      },
      include: {
        page: true
      }
    }

    //   {
    //   where: {
    //     createdAt: {
    //       gte: new Date(beginSec * 1000),
    //       lt: new Date(endSec * 1000),
    //     },
    //     page: {
    //       websiteId: {
    //         equals: wedsiteId
    //       }
    //     },
    //     requestStatus: {
    //       equals: 'active'
    //     }
    //   },
    // }
  )
  console.log(requestList, 'request list 3')

  requestList.forEach((element: any) => {
    const createdDate = new Date(element.createdAt);
    const key = `${createdDate.getFullYear()}-${(createdDate.getMonth() + 1).toString().padStart(2, '0')}-${createdDate.getDate().toString().padStart(2, '0')}`;
    const matchedDate = requestData.find((date: any) => {
      if (endSec - beginSec <= aDay) {
        return date.key === createdDate.getHours();
      } else {
        return date.key === key
      }
    })
    if (matchedDate) {
      matchedDate.value += 1
    }
  });

  result = {
    request: requestData,
    analyticsAt: Date.now()
  }

  // save to redis
  const timeout = 24 * 60 * 60 * 1000; // 24 hours
  kvClient.set(redisName, JSON.stringify({ analyticsData: result, expiredAt: Date.now() + timeout }))

  return result;
}

export const getAnalyticsTop5PageRequest = async (prisma: any, props: Parameters) => {
  const { beginSec, endSec, wedsiteId, isRenew } = props;
  const requestData: Record<string, any> = [];

  const redisName = `websiteAnalytics_${wedsiteId}_top5pageRequest_${beginSec}_${endSec}`;

  let result;

  // get data from redis is exists
  // const client = asyncRedis.createClient({
  //   url: process.env.REDIS_URL,
  // })
  const kvClient = createClient({
    url: process.env.NODE_ENV === 'production' ? process.env.KV_REST_API_URL : process.env.KV_REST_API_URL,
    token: process.env.NODE_ENV === 'production' ? process.env.KV_REST_API_TOKEN : process.env.KV_REST_API_TOKEN,
  });

  const anayticsDate = await kvClient.get(redisName);
  if (anayticsDate && !isRenew) {
    const { analyticsData, expiredAt } = JSON.parse(anayticsDate);

    if (expiredAt >= Date.now()) {
      return analyticsData;
    }
  }

  // ordered product
  const requestList = await prisma.request.findMany(
    {
      where: {
        NOT: {
          requestStatus: {
            equals: 'pending',
          },
        },
        OR: [
          {
            requestStatus: {
              equals: 'completed'
            }
          },
          {
            requestStatus: {
              equals: 'active'
            }
          },
        ],
        AND: {
          createdAt: {
            gte: new Date(beginSec * 1000),
            lt: new Date(endSec * 1000),
          },
          page: {
            websiteId: {
              equals: wedsiteId
            }
          },
        },
      },
      include: {
        page: true
      }
    }
  )
  console.log(requestList, 'request list 4')

  const _requestSet: Record<string, any> = {};
  requestList.forEach((element: any) => {
    if (_requestSet[element.pageId]) {
      _requestSet[element.pageId].count += 1;
    } else {
      _requestSet[element.pageId] = {
        id: element.pageId,
        requestName: element.name,
        pageName: element.page.name,
        count: 1
      }
    }
  });

  Object.keys(_requestSet).forEach((key) => {
    requestData.push(_requestSet[key])
  })

  result = {
    request: requestData.sort((a, b) => {
      return b.count - a.count
    }).slice(0, 3),
    analyticsAt: Date.now()
  }

  // save to redis
  const timeout = 24 * 60 * 60 * 1000; // 24 hours
  // client.set(redisName, JSON.stringify({ analyticsData: result, expiredAt: Date.now() + timeout }))
  kvClient.set(redisName, JSON.stringify({ analyticsData: result, expiredAt: Date.now() + timeout }))

  return result;
}