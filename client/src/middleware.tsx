import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

export default function middleware(req: NextRequest) {
  // Clone the request url
  const url = req.nextUrl.clone();

  // Get pathname of request (e.g. /blog-slug)
  const { pathname, basePath, locale, defaultLocale } = req.nextUrl;

  // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
  const hostname = req.headers.get('host');

  if (!hostname)
    return new Response(null, {
      status: 400,
      statusText: 'No hostname found in request headers',
    });

  const currentHost = hostname
    .replace(`.pounds.network`, '')
    .replace(`.yoh.app`, '')
    .replace(`.yohnft.com`, '')
    .replace(`.pixite.io`, '')
    .replace(`.pixite.app`, '')
    .replace(`.awkns.local:3003`, '');

  if (pathname.startsWith(`/_sites`)) {
    return new Response(null, {
      status: 404,
    });
  }
  if (!pathname.includes('.') && !pathname.startsWith('/api')) {
    if (process.env.NODE_ENV === 'production') {
      if (locale !== defaultLocale) {
        url.pathname = `/_sites/${currentHost}${pathname}`;
      } else {
        url.pathname = `/${locale}/_sites/${currentHost}${pathname}`;
      }
    } else {
      url.pathname = `/_sites/${currentHost}${pathname}`;
    }

    return NextResponse.rewrite(url);
  }
}
