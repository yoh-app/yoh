
const createDefaultWebsite = {
  mutateResult: false,
  run: async (root, args, context, info) => {
    try {
      const { prisma } = context;
      const products = await prisma.product.findMany({
        where: {
          website: {
            id: {
              equals: context?.permission?.Website
            }
          }
        },
        // include: {
        //   website: true
        // }
      });
      console.log(context.params.result)
      const attribute = context.params.result
      await Promise.all(products.map(async (product) => {

        let variations = product?.variations
        if (variations?.length > 0) {
          variations.map((variation, index) => {
            if (attribute?.values?.length > 0 && variation?.attribute?.values) {
              variations[index].attribute.values = attribute.values
            }
          })

          const newProduct = await prisma.product.update({
            where: {
              id: product.id
            },
            data: {
              variations: variations
            }
          })
        }

      }))

      return { data: context.params.result };
    } catch (error) {
      return { error };
    }
  },
};

export default createDefaultWebsite;
