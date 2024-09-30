import prisma from 'admin/src/server/context/prisma'
export default async function requestClick(req, res) {
  // const { ip, slug } = req.body
  const { pageSlug, requestId } = req.body
  await prisma.requestClick.create({
    data: {
      // ip,
      page: {
        connect: {
          slug: pageSlug
        }
      },
      request: {
        connect: {
          id: requestId
        }
      }
    }
  })
  res.send(200)
}