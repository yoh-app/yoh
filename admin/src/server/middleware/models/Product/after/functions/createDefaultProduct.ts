
const createDefaultWebsite = {
  mutateResult: false,
  run: async (root, args, context, info) => {
    try {
      const { prisma } = context;
      const product = await prisma.product.findUnique({
        where: {
          id: context?.params?.result.id,
        },
        include: {
          website: true
        }
      });

      const allProductCollection = await prisma.productCollection.findFirst({
        where: {
          name: {
            equals: 'All Products'
          },
          website: {
            id: {
              equals: product?.website?.id
            }
          }
        }
      })

      const updateProduct = await prisma.product.update({
        where: {
          id: context?.params?.result.id,
        },
        data: {
          // productType: 'digital',
          productCollections: {
            connect: [{
              id: allProductCollection.id
            }]
          }
        }
      })

      return { data: updateProduct };
    } catch (error) {
      return { error };
    }
  },
};

export default createDefaultWebsite;
