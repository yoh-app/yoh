import { SitemapStream, streamToPromise } from 'sitemap';
import prisma from 'admin/src/server/context/prisma'

export default async (req, res) => {
  try {
    const smStream = new SitemapStream({
      hostname: `https://${req.headers.host}`,
      cacheTime: 600000,
    });

    const hostname = req.headers.get('host');

    const websiteSlug = hostname
      .replace(`.yoh.app`, '')
      .replace(`.yohnft.com`, '')
      .replace(`.pixite.io`, '')
      .replace(`.pixite.app`, '')
      .replace(`.awkns.local:3003`, '');

    // List of pages
    const pages = await prisma.page.findMany({
      where: {
        website: {
          slug: {
            equals: websiteSlug
          }
        }
      }
    })

    // Create each URL row
    pages.forEach(page => {
      smStream.write({
        url: `/pages/${page.slug}`,
        changefreq: 'daily',
        priority: 0.9
      });
    });

    // End sitemap stream
    smStream.end();

    // XML sitemap string
    const sitemapOutput = (await streamToPromise(smStream)).toString();

    // Change headers
    res.writeHead(200, {
      'Content-Type': 'application/xml'
    });

    // Display output to user
    res.end(sitemapOutput);
  } catch (e) {
    console.log(e)
    res.send(JSON.stringify(e))
  }

}