import { useState, useEffect } from "react";

import { themes } from "@themes/index";

import Button from "@components/ui/button";
import NumberInput from "@components/ui/form/number";
import { ProductIcon } from "@components/icons/product-icon";
import { useModalState } from "@components/ui/modal/modal.context";

import {
  useFindManyOrderedProductLazyQuery,
  useUpdateOneOrderedProductMutation,
} from "@generated";

type Props = {
  website: any;
};

export default function ProductRedeemedPopupDetails(props: Props) {
  const { website } = props;

  const [redeemQuantity, setRedeemQuantity] = useState(1);
  const [isReedemed, setIsRedeemed] = useState(false);

  const [orderedProductData, setOrderedProductData] = useState<
    Record<string, any>
  >({});

  const [processingTransaction, setProcessingTransaction] = useState(false);

  const [updateOrderedProduct] = useUpdateOneOrderedProductMutation();

  const [getOrderedProduct, { data: lazyOrderedProductData }] =
    useFindManyOrderedProductLazyQuery({
      fetchPolicy: "no-cache",
    });

  const {
    data: { orderId, onRedeem },
  } = useModalState();

  const redeemProduct = async () => {
    setProcessingTransaction(true);

    const orderedProduct = await updateOrderedProduct({
      variables: {
        where: {
          id: orderedProductData.id,
        },
        data: {
          redeemedQuantity: {
            set: (orderedProductData.redeemedQuantity || 0) + redeemQuantity,
          },
        },
      },
    });

    if (orderedProduct?.data) {
      setOrderedProductData(orderedProduct.data.updateOneOrderedProduct);
    }

    setRedeemQuantity(1);

    setProcessingTransaction(false);
    setIsRedeemed(true);

    await onRedeem();
  };

  const fetchOrderedProduct = async () => {
    setProcessingTransaction(true);
    await getOrderedProduct({
      variables: {
        where: {
          orderId: {
            equals: orderId,
          },
        },
      },
    });
    setProcessingTransaction(false);
  };

  useEffect(() => {
    if (lazyOrderedProductData?.findManyOrderedProduct[0]) {
      setOrderedProductData(lazyOrderedProductData?.findManyOrderedProduct[0]);
    }
  }, [lazyOrderedProductData]);

  useEffect(() => {
    if (orderId) {
      fetchOrderedProduct();
    }
  }, [orderId]);
  return (
    <div className="flex max-w-full flex-col bg-white text-left xs:max-w-[430px] sm:max-w-[550px] md:max-w-[600px] lg:max-w-[960px] xl:max-w-[1200px] 2xl:max-w-[1266px] 3xl:max-w-[1460px]">
      <div className="-mx-2.5 flex flex-wrap items-center py-3 ltr:pl-4 ltr:pr-16 rtl:pr-4 rtl:pl-16 md:py-4 ltr:md:pl-6 rtl:md:pr-6 lg:-mx-4 lg:py-5 ltr:xl:pl-8 rtl:xl:pr-8">
        <h2 className="truncate px-2.5 py-1 text-base font-medium md:text-lg ltr:lg:pl-4 ltr:lg:pr-5 rtl:lg:pr-4 rtl:lg:pl-5 3xl:text-xl">
          {"Item Redeemed"}
        </h2>
      </div>
      <div className="flex flex-col p-4 gap-4 md:p-6 items-center md:min-w-[600px]">
        <div
          className="w-[200px] h-[200px] flex justify-center items-center rounded-xl"
          style={{
            backgroundImage: orderedProductData.imageObj?.url
              ? `url(${orderedProductData.imageObj?.url})`
              : undefined,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundColor: themes[website.themeColor || "base"].accent50,
          }}
        >
          {!orderedProductData.imageObj?.url ? (
            <ProductIcon className="w-[64px] h-[64px]" />
          ) : (
            []
          )}
        </div>
        <div className="">{`#${orderedProductData.id}`}</div>
        <div className="">{orderedProductData.name}</div>
        {processingTransaction ||
        orderedProductData.quantity - orderedProductData.redeemedQuantity >
          0 ? (
          isReedemed ? (
            <button
              className="underline"
              onClick={() => {
                setIsRedeemed(false);
              }}
            >
              Redeem again
            </button>
          ) : (
            <>
              <div className="text-center">
                Please select the quantity to redeem.
                <br />(
                <span className="text-red-500 mx-1">
                  {orderedProductData.quantity -
                    (orderedProductData.redeemedQuantity || 0)}
                </span>
                items available)
              </div>
              <div>
                <NumberInput
                  value={redeemQuantity}
                  minimum={1}
                  maximum={
                    orderedProductData.quantity -
                    (orderedProductData.redeemedQuantity || 0)
                  }
                  onValueChange={(value: number) => {
                    setRedeemQuantity(value);
                  }}
                />
              </div>
              <Button
                className="font-semibold"
                size="small"
                onClick={() => {
                  redeemProduct();
                }}
                loading={processingTransaction}
                disabled={processingTransaction}
              >
                Redeem
              </Button>
            </>
          )
        ) : (
          <div className="text-center text-red-500">
            There is no items available to redeem
          </div>
        )}
        {/* <button className="underline">
          Go to Gallery
        </button> */}
      </div>
    </div>
  );
}
