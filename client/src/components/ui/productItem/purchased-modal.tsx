import { useState, useEffect } from "react";

import { themes } from "@themes/index";

import Button from "@components/ui/button";
import { ProductIcon } from "@components/icons/product-icon";
import { useModalState } from "@components/ui/modal/modal.context";

import { useFindManyOrderedProductLazyQuery } from "@generated";

type Props = {
  website: any;
};

export default function ProductPurchasedPopupDetails(props: Props) {
  const { website } = props;

  const [orderedProductData, setOrderedProductData] = useState<
    Record<string, any>
  >({});

  const [processingTransaction, setProcessingTransaction] = useState(false);

  const [getOrderedProduct, { data: lazyOrderedProductData }] =
    useFindManyOrderedProductLazyQuery({
      fetchPolicy: "no-cache",
    });

  const {
    data: { purchasedData, onToRedeem },
  } = useModalState();

  const redeemProduct = async () => {
    await onToRedeem();
  };

  const fetchOrderedProduct = async () => {
    setProcessingTransaction(true);
    await getOrderedProduct({
      variables: {
        where: {
          orderId: {
            equals: purchasedData?.id,
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
    if (purchasedData.id) {
      fetchOrderedProduct();
    }
  }, [purchasedData]);
  return (
    <div className="flex max-w-full flex-col bg-white text-left xs:max-w-[430px] sm:max-w-[550px] md:max-w-[600px] lg:max-w-[960px] xl:max-w-[1200px] 2xl:max-w-[1266px] 3xl:max-w-[1460px]">
      <div className="-mx-2.5 flex flex-wrap items-center py-3 ltr:pl-4 ltr:pr-16 rtl:pr-4 rtl:pl-16 md:py-4 ltr:md:pl-6 rtl:md:pr-6 lg:-mx-4 lg:py-5 ltr:xl:pl-8 rtl:xl:pr-8">
        <h2 className="truncate px-2.5 py-1 text-base font-medium md:text-lg ltr:lg:pl-4 ltr:lg:pr-5 rtl:lg:pr-4 rtl:lg:pl-5 3xl:text-xl">
          {"Item Purchased"}
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
        <Button
          className="font-semibold"
          size="small"
          onClick={() => {
            redeemProduct();
          }}
          loading={processingTransaction}
          disabled={processingTransaction}
        >
          Redeem Now
        </Button>
        {/* <button className="underline">Go to Gallery</button>
        <button className="underline">Transfer to your wallet</button> */}
      </div>
    </div>
  );
}
