
const checkRefund = {
  mutateResult: false,
  run: async (root, args, context, info) => {
    try {
      const { prisma, params } = context;

      const order = await prisma.order.findUnique({
        where: {
          id: params?.result?.id,
        },
      });

      if (order?.orderStatus === 'completed' && order?.requireShipping) {
        if (order?.refundObj?.length > 0) {
          const refundProducts = [];
          order?.refundObj?.map((refund) => {
            if (refund?.orderedProduct?.id && refund?.quantity > 0 && !refund.processed) {
              refundProducts.push(refund);
              refund.processed = true;
            }
          });
          if (refundProducts?.length > 0) {
            const refund = await prisma.refund.create({
              order: {
                connect: {
                  id: order.id,
                },
              },
              orderedProducts: {
                connect: refundProducts.map((refund) => {
                  return {
                    id: refund?.orderedProduct.id,
                  };
                }),
              },
              amount: refundProducts.reduce((refund) => refund.sale_price ?? refund.price * refund.quantity, 0),
            });

            return { data: order };
          }
        }
      }

      return { data: params.result };
    } catch (error) {
      return { error };
    }
  },
};

export default checkRefund;
