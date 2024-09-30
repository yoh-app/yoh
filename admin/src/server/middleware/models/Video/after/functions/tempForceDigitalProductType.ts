
const createDefaultWebsite = {
  mutateResult: false,
  run: async (root, args, context, info) => {
    try {
      const { prisma } = context;
      const product = await prisma.product.findUnique({
        where: {
          id: context?.params?.result.id,
        },
      });

      const updateProduct = await prisma.product.update({
        where: {
          id: product?.id
        },
        data: {
          productType: 'digital'
        }
      })
      return { data: updateProduct };
    } catch (error) {
      return { error };
    }
  },
};

export default createDefaultWebsite;
