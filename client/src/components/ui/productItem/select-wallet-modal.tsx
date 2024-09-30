import { useState, useMemo, useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useChainId } from "wagmi";
import { mainnet, polygon, arbitrum, avalanche } from 'wagmi/chains'

import Button from "@components/ui/button";
import NumberInput from "@components/ui/form/number";
import { themes } from "@themes/index";
import { useModalState } from "@components/ui/modal/modal.context";

import "@rainbow-me/rainbowkit/styles.css";

type Props = {
  website: any;
};

export default function ProductSelectWalletPopupDetails(props: Props) {
  const { website } = props;
  const [walletType, setWalletType] = useState("polygon");
  const { address } = useAccount();
  const chainId = useChainId();

  const [purchaseQuantity, setPurchaseQuantity] = useState(1);

  const {
    data: { product, orderedProductData, selectedSpecSet, onPay },
  } = useModalState();

  const [processingTransaction, setProcessingTransaction] = useState(false);

  const totalSold = useMemo(() => {
    let summary = 0;
    if (product.useVariations) {
      orderedProductData
        ?.filter((orderedProduct: Record<string, any>) => {
          return orderedProduct.variationOptions.id === selectedSpecSet.id;
        })
        .forEach((orderedProduct: Record<string, any>) => {
          summary += orderedProduct.quantity;
        });
    } else {
      orderedProductData?.forEach((orderedProduct: Record<string, any>) => {
        summary += orderedProduct.quantity;
      });
    }
    return summary;
  }, [orderedProductData]);

  const showProductQuantity = useMemo(() => {
    switch (product.productType) {
      case "deal":
      case "event":
      case "membership":
        return product.useQuantity;
      // case "digital":
      //   return true;
      case "product":
        return product.useVariations || product.useQuantity;
      default:
        return false;
    }
  }, [product]);

  const productQuantity = useMemo(() => {
    switch (product.productType) {
      case "deal":
      case "event":
      case "membership":
        return product.quantity;
      case "digital":
        return 1;
      case "product":
        return product.useVariations
          ? selectedSpecSet.quantity
          : product.useQuantity
            ? product.quantity
            : 0;
      default:
        return 0;
    }
  }, [product]);

  const purchaseLimitation = useMemo(() => {
    switch (product.productType) {
      case "deal":
      case "event":
      case "membership":
        if (
          typeof product.maxQuantity !== "undefined" &&
          product.maxQuantity !== null
        ) {
          return product.useQuantity
            ? Math.min(productQuantity - totalSold, product.maxQuantity)
            : product.maxQuantity;
        } else {
          return undefined;
        }
      case "digital":
        return product.useNft ? undefined : 1;
      case "product":
        if (product.useVariations) {
          return selectedSpecSet.quantity - totalSold
        } else {
          if (
            typeof product.maxQuantity !== "undefined" &&
            product.maxQuantity !== null
          ) {
            return product.useQuantity
              ? Math.min(productQuantity - totalSold, product.maxQuantity)
              : product.maxQuantity;
          } else {
            return undefined;
          }
        }
      default:
        return undefined;
    }
  }, [product]);

  const payBill = async () => {
    setProcessingTransaction(true);

    await onPay(purchaseQuantity, address);
  };

  const getChainId = async () => {
    // { label: "Arbitrum Wallet", value: "arbitrum" },
    // { label: "Avalanche Wallet", value: "avalanche" },
    // { label: "Ethereum Wallet", value: "ethereum" },
    // { label: "Polygon Wallet", value: "polygon" },
    console.log('chainId', chainId)
    console.log('mainnet', mainnet)
    console.log('polygon', polygon)
    console.log('arbitrum', arbitrum)
    console.log('avalanche', avalanche)
  }

  useEffect(() => {
    getChainId();
  }, [])
  return (
    <div className="flex max-w-full flex-col bg-white text-left xs:max-w-[430px] sm:max-w-[550px] md:max-w-[600px] lg:max-w-[960px] xl:max-w-[1200px] 2xl:max-w-[1266px] 3xl:max-w-[1460px]">
      <div className="-mx-2.5 flex flex-wrap items-center py-3 ltr:pl-4 ltr:pr-16 rtl:pr-4 rtl:pl-16 md:py-4 ltr:md:pl-6 rtl:md:pr-6 lg:-mx-4 lg:py-5 ltr:xl:pl-8 rtl:xl:pr-8">
        <h2 className="truncate px-2.5 py-1 text-base font-medium md:text-lg ltr:lg:pl-4 ltr:lg:pr-5 rtl:lg:pr-4 rtl:lg:pl-5 3xl:text-xl">
          {"Select a wallet"}
        </h2>
      </div>
      <div className="flex flex-col p-4 gap-4 md:p-6 items-center md:min-w-[600px]">
        <ConnectButton />
        {address ? (
          <>
            {showProductQuantity ? (
              <div className="text-center">
                Please select the quantity to purchase.
                <br />(
                <span className="text-red-500 mx-1">{productQuantity}</span>
                items in stock)
              </div>
            ) : (
              []
            )}
            {product.productType !== "digital" || !!product.useNft ? (
              <div>
                <NumberInput
                  value={purchaseQuantity}
                  minimum={1}
                  maximum={purchaseLimitation}
                  onValueChange={(value: number) => {
                    setPurchaseQuantity(value);
                  }}
                />
              </div>
            ) : (
              []
            )}
            <div>Then You’re going to pay</div>
            <div
              className="flex items-end gap-2"
              style={{
                color: themes[website.themeColor || "base"].accent400,
              }}
            >
              <div className="text-4xl">
                {(product?.salePrice || product?.price) * purchaseQuantity}
              </div>
              <div>USD</div>
            </div>
            <Button
              size="small"
              onClick={() => {
                payBill();
              }}
              loading={processingTransaction}
              disabled={processingTransaction}
            >
              Purchase
            </Button>
          </>
        ) : (
          <p className="text-sm text-red-500">Please connect your wallet.</p>
        )}
      </div>
    </div>
  );
}
