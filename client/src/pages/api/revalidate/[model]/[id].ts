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
    const model = req.query.model
    const id = req.query.id
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
    const locales = ['zh', 'en']

    if (model === 'website') {
      await res.revalidate(`/_sites/${currentHost}`);
      // await res.revalidate(`/_sites/${currentHost}/login`);
      // await res.revalidate(`/_sites/${currentHost}/logout`);
      // await res.revalidate(`/_sites/${currentHost}/search`);

      await Promise.all(locales.map(async (locale) => {
        await res.revalidate(`/${locale}/_sites/${currentHost}`);
        await res.revalidate(`/${locale}/_sites/${currentHost}/login`);
        await res.revalidate(`/${locale}/_sites/${currentHost}/logout`);
        await res.revalidate(`/${locale}/_sites/${currentHost}/search`);
      }))


    } else if (model === 'product') {
      await Promise.all(locales.map(async (locale) => {
        await res.revalidate(`/${locale}/_sites/${currentHost}/products/${website?.products?.find((product) => product.id === id)?.slug}`);
      }))
    } else if (model === 'page') {
      const page = website?.pages?.find((page) => page.id === id)

      if (page?.isIndex) {
        await res.revalidate(`/_sites/${currentHost}`);
        await Promise.all(locales.map(async (locale) => {
          await res.revalidate(`/${locale}/_sites/${currentHost}`);
        }))
      }
      await Promise.all(locales.map(async (locale) => {
        await res.revalidate(`/${locale}/_sites/${currentHost}/pages/${website?.pages?.find((page) => page.id === id)?.slug}`);
      }))
    }

    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    console.log(err)
    return res.status(500).send('Error revalidating');
  }
}