import prisma from 'admin/src/server/context/prisma'

export default async function handler(req, res) {
  try {
    const { productId } = req.query
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        website: true
      }
    })
    if (product) {
      console.log(product, product?.creatorEarnings * 100)
      return res.json({
        "name": product?.name,
        "description": `${product?.description}\nHolder Contents: https://${product?.website?.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/products/${product.slug}`,
        "image": product?.imageObj?.url,
        "external_link": `https://${product?.website?.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/products/${product.slug}`,
        "seller_fee_basis_points": product?.creatorEarnings * 100, // Indicates a 1% seller fee.
        "fee_recipient": product?.website?.walletAddress // Where seller fees will be paid to. 
      });
    } else {
      return res.status(500).send('Address not exist');
    }

  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    console.log(err)
    return res.status(500).send('Address not exist');
  }
}