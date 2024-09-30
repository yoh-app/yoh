// import asyncRedis from 'async-redis';
import axios from 'axios';
import { kv, createClient } from '@vercel/kv';

export const cleanCache = async ({ websiteId, prisma }) => {
  try {
    // const client = asyncRedis.createClient({
    //   url: process.env.REDIS_URL
    // });
    const kvClient = createClient({
      url: process.env.NODE_ENV === 'production' ? process.env.KV_REST_API_URL : process.env.KV_REST_API_URL,
      token: process.env.NODE_ENV === 'production' ? process.env.KV_REST_API_TOKEN : process.env.STAGING_KV_REST_API_TOKEN,
    });

    const website = await prisma.website.findUnique({
      where: {
        id: websiteId,
      },
      include: {
        pages: true,
        products: true,
      },
    });
    // client.del(`${website.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}`);
    const indexRequest = axios.get(
      `${process.env.PROTOCOL}://${process.env.NEXT_PUBLIC_DOMAIN}`
    );
    console.log(indexRequest);
    Promise.all(
      website?.pages?.map(async (page) => {
        try {
          // client.del(`${website.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/pages/${page.slug}`);
          const pageRequest = await axios.get(
            `${process.env.PROTOCOL}://${process.env.NEXT_PUBLIC_DOMAIN}/pages/${page.slug}`
          );
          console.log(pageRequest);
        } catch (err) {
          console.log(err);
          throw new Error(err);
        }
      }),
    );
    Promise.all(
      website?.products?.map(async (product) => {
        try {
          // client.del(`${website.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/products/${product.slug}`);
          const productRequest = await axios.get(
            `${process.env.PROTOCOL}://${process.env.NEXT_PUBLIC_DOMAIN}/products/${product.slug}`
          );
          console.log(productRequest);
        } catch (err) {
          console.log(err);
          throw new Error(err);
        }
      }),
    );
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};


export const updateWebsiteCache = async ({ websiteId, prisma, kvClient }) => {
  try {
    const website = await prisma.website.findUnique({
      where: {
        id: websiteId
      },
      include: {
        pages: true,
        products: true
      }
    })
    const indexPage = await prisma.page.findFirst({
      where: {
        website: {
          id: {
            equals: websiteId,
          },
        },
        isIndex: {
          equals: true,
        },
      },
      include: {
        website: true,
        requests: {
          where: {
            requestStatus: {
              in: 'active',
            },
          },
        },
        items: {
          include: {
            block: true,
            collection: {
              include: {
                pages: {
                  include: {
                    categories: true,
                  },
                },
                products: {
                  include: {
                    categories: true,
                  },
                },
                links: {
                  include: {
                    categories: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    const cacheIndexPage = await kvClient.set(`${website.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}`, JSON.stringify(indexPage))

    // const cacheIndexPage = await redisClient.set(`${website.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}`, JSON.stringify(indexPage))
    console.log(indexPage, 'cached index page')
    await Promise.all(
      website?.pages?.map(async (_page) => {
        if (_page.slug) {
          try {
            const page = await prisma.page.findUnique({
              where: {
                slug: _page.slug,
              },
              include: {
                website: true,
                requests: {
                  where: {
                    requestStatus: {
                      in: 'active',
                    },
                  },
                },
                items: {
                  include: {
                    block: true,
                    collection: {
                      include: {
                        pages: {
                          include: {
                            categories: true,
                          },
                        },
                        products: {
                          include: {
                            categories: true,
                            audios: true,
                            videos: true,
                            links: true,
                          },
                        },
                        links: {
                          include: {
                            categories: true,
                          },
                        },
                      },
                    },
                    embed: true,
                  },
                },
              },
            });
            if (website?.slug && page?.slug) {
              const cachePage = await kvClient.set(`${website.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/pages/${page.slug}`, JSON.stringify(page))

              // const cachePage = await redisClient.set(`${website.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/pages/${page.slug}`, JSON.stringify(page))
            }
          } catch (err) {
            console.log(err);
            throw new Error(err);
          }
        }

      }),
    );
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
}