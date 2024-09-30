import prisma from 'admin/src/server/context/prisma'
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';
export default async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  // if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
  //   return res.status(401).json({ message: 'Invalid token' });
  // }

  try {
    const hostname = req.headers.host;
    if (!hostname)
      return new Response(null, {
        status: 400,
        statusText: 'No hostname found in request headers',
      });

    const currentHost = hostname
      .replace(`.yoh.app`, '')
      .replace(`.yohnft.com`, '')
      .replace(`.pixite.io`, '')
      .replace(`.pixite.app`, '')
      .replace(`.awkns.local:3003`, '');
    console.log('currentHost:', currentHost)

    const website = await prisma.website.findUnique({
      where: {
        slug: currentHost
      },
      include: {
        products: true,
        pages: true
      }
    })
    console.log(website)

    await res.revalidate(`/_sites/${currentHost}`);
    await res.revalidate(`/_sites/${currentHost}/login`);
    await res.revalidate(`/_sites/${currentHost}/logout`);
    await res.revalidate(`/_sites/${currentHost}/search`);
    await res.revalidate(`/_sites/${currentHost}/request`);
    await res.revalidate(`/_sites/${currentHost}/nft`);
    await res.revalidate(`/_sites/${currentHost}/requests`);

    await Promise.all(website?.pages?.map(async (page) => {
      await res.revalidate(`/_sites/${currentHost}/pages/${page.slug}`);
    }))

    await Promise.all(website?.products?.map(async (product) => {
      await res.revalidate(`/_sites/${currentHost}/products/${product.slug}`);
    }))
    const locales = ['zh', 'en']

    await Promise.all(locales.map(async (locale) => {
      await res.revalidate(`/${locale}/_sites/${currentHost}`);
      await res.revalidate(`/${locale}/_sites/${currentHost}/login`);
      await res.revalidate(`/${locale}/_sites/${currentHost}/logout`);
      await res.revalidate(`/${locale}/_sites/${currentHost}/search`);
      await res.revalidate(`/${locale}/_sites/${currentHost}/nft`);
      await res.revalidate(`/${locale}/_sites/${currentHost}/request`);
      await res.revalidate(`/${locale}/_sites/${currentHost}/requests`);
      await res.revalidate(`/${locale}/_sites/${currentHost}/orders`);
      await res.revalidate(`/${locale}/_sites/${currentHost}/orders/orderId`);

      await Promise.all(website?.pages?.map(async (page) => {
        await res.revalidate(`/${locale}/_sites/${currentHost}/pages/${page.slug}`);
        await res.revalidate(`/${locale}/_sites/${currentHost}/pages/${page.slug}/request`);
      }))

      await Promise.all(website?.products?.map(async (product) => {
        await res.revalidate(`/${locale}/_sites/${currentHost}/products/${product.slug}`);
      }))
    }))

    console.log('finished')

    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    console.log(err)
    return res.status(500).send('Error revalidating');
  }
}