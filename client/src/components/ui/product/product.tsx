import type { GetNetworkResult } from "@wagmi/core";

import cn from "classnames";
// import MapGL, { Layer, LayerProps, Source } from "react-map-gl";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Libraries,
} from "@react-google-maps/api";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";

import { UserIconAlt } from "@components/icons/user-icon-alt";
import { CalenderIcon } from "@components/icons/calendar-icon";
import { LabelIcon } from "@components/icons/label-icon";
import { ProductIcon } from "@components/icons/product-icon";
import ProductThumbnailGallery from "@components/ui/product/product-thumbnail-gallery";
import { toast } from "react-toastify";

import { useModalAction } from "@components/ui/modal/modal.context";

import BackButton from "@components/ui/back-button";
import Button from "@components/ui/button";
import { useTranslation } from "next-i18next";
import { getVariations } from "@utils/get-variations";
import { useState, useEffect, useMemo, useRef } from "react";
import isEqual from "lodash/isEqual";
import isEmpty from "lodash/isEmpty";
import { useCustomer } from "@contexts/customer.context";
import { useSettings } from "@contexts/settings.context";
import { useUI } from "@contexts/ui.context";
import {
  useFindManyProductLazyQuery,
  useFindManyOrderedProductQuery,
  // useStripeEnabledQuery,
  useServerMintMutation,
  // usePrepareStripePurchaseMutation,
  usePreparePurchaseMutation,
  useUpdateOneOrderMutation,
  useFinishPurchaseMutation,
} from "@generated";

// import web3 from "web3";
import { useAccount, erc20ABI } from "wagmi";
import { themes } from "@themes/index";
import {
  useContractWrite,
  usePrepareContractWrite,
  useNetwork,
  useFeeData,
} from "wagmi";
import ArbitrumSingleEditionMintableAbi from "@web3/contractsData/arbitrum-SingleEditionMintable.json";
import ArbitrumPaymentsAbi from "@web3/contractsData/arbitrum-Payments.json";
import ArbitrumPaymentsAddress from "@web3/contractsData/arbitrum-Payments-address.json";
import PolygonPaymentsAddress from "@web3/contractsData/polygon-Payments-address.json";

// import ArbitrumSingleEditionMintable from "@web3/contractsData/arbitrum-SingleEditionMintable.json";
// import PolygonSingleEditionMintable from "@web3/contractsData/polygon-SingleEditionMintable.json";

// import abi from "./contract.json";
import { utils } from "ethers";
import { useRouter } from "next/router";
import { fDateTimeSuffix } from "@utils/formatTime";
import { stringMap } from "aws-sdk/clients/backup";

const libraries: Libraries = ["geometry", "drawing", "places"];

const mapStyles = [
  {
    featureType: "all",
    elementType: "all",
    stylers: [
      {
        saturation: "32",
      },
      {
        lightness: "-3",
      },
      {
        visibility: "on",
      },
      {
        weight: "1.18",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "labels",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "landscape.man_made",
    elementType: "all",
    stylers: [
      {
        saturation: "-70",
      },
      {
        lightness: "14",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "all",
    stylers: [
      {
        saturation: "100",
      },
      {
        lightness: "-14",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
      {
        lightness: "12",
      },
    ],
  },
];

type Props = {
  loading: boolean;
  view: Record<string, any>;
  setView: (value: any) => void;
  product: Record<string, any>;
  nftBought: any;
  variant?: "defaultView" | "modalView";
};

function nftsAddressSmartContract(chain: GetNetworkResult["chain"]) {
  switch (chain?.id) {
    case 137:
      // return PolygonSingleEditionMintable.address;
      return "";
    case 42161:
      // return ArbitrumSingleEditionMintable.address;
      return "";
    default:
      return 0;
  }
}

function paymentsAddressSmartContract(chain: GetNetworkResult["chain"]) {
  switch (chain?.id) {
    case 137:
      return PolygonPaymentsAddress.address;
    case 42161:
      return ArbitrumPaymentsAddress.address;
    default:
      return 0;
  }
}

const ProductDetails: React.FC<Props> = ({
  loading,
  view,
  setView,
  product,
  nftBought,
}) => {
  const [imageList, setImageList] = useState<Record<string, any>[]>([]);
  const [attachments, setAttachments] = useState<Record<string, any>[]>([]);
  const [updateOrder] = useUpdateOneOrderMutation();
  const [finishPurchase] = useFinishPurchaseMutation();
  const [productQuantity, setProductQuantity] = useState(0);

  const [selectedSpec, setSelectedSpec] = useState<Record<string, any>>({});

  const { isAuthorize } = useUI();

  const { openModal } = useModalAction();

  const { slug: websiteSlug } = useSettings();

  const [mapRef, setMapRef] = useState(null);
  const mapRef2 = useRef();

  const { chain } = useNetwork();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });

  const onMapLoad = (map: any) => {
    mapRef2.current = map;
    setMapRef(map);
  };

  const usdcContractAddress = "0xaf88d065e77c8cC2239327C5EDb3A432268e5831";

  // const contractAddress = "0x1E1Fc143E78d59cBDe3294FAa44609A951e11A91";

  const [processingTransaction, setProcessingTransaction] = useState(false);

  const { customer } = useCustomer();
  const { t } = useTranslation("common");
  const { query } = useRouter();
  const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
  const { address } = useAccount();
  // console.log("address: ", address);
  const website = useSettings() as Record<string, any>;
  const [serverMint] = useServerMintMutation();
  // const [prepareStripePurchase] = usePrepareStripePurchaseMutation()

  const [getProduct, { data: lazyProductData }] = useFindManyProductLazyQuery({
    fetchPolicy: "no-cache",
  });

  const { data: orderedProductData, refetch: refetchOrderedProduct } =
    useFindManyOrderedProductQuery({
      variables: {
        where: {
          productId: {
            equals: product?.id,
          },
          order: {
            customerId: {
              equals: customer?.id,
            },
            deleted: {
              not: {
                equals: true,
              },
            },
            paid: {
              equals: true,
            },
          },
        },
        // orderBy: {
        //   createdAt: {
        //     sort: "desc",
        //   },
        // },
      },
    });

  // const { slug: websiteSlug } = useSettings();
  // const { data: stripeDate } = useStripeEnabledQuery({
  //   variables: {
  //     websiteSlug: websiteSlug,
  //   },
  //   skip: !websiteSlug,
  // });

  const outOfStock = product?.quantity < 1;
  // const disabled = outOfStock || processingTransaction || !contractAddress
  const disabled = false;
  const variations = getVariations(product?.variations);

  const isSelected = !isEmpty(variations)
    ? !isEmpty(attributes) &&
    Object.keys(variations).every((variation) =>
      attributes.hasOwnProperty(variation)
    )
    : true;
  let selectedVariation: any = {};
  if (isSelected) {
    selectedVariation = product?.variation_options?.find((o: any) => {
      const options = JSON.parse(o?.options);
      return isEqual(
        options.map((v: any) => v.value).sort(),
        Object.values(attributes).sort()
      );
    });
    if (selectedVariation) {
      Object.keys(selectedVariation).map((key) => {
        if (!Number.isNaN(parseFloat(selectedVariation[key]))) {
          selectedVariation[key] = parseFloat(selectedVariation[key]);
        }
      });
    }
  }

  // const [customWalletAddress, setCustomWalletAddress] = useState(null);

  // const isInternalNft = product?.isNft && !product?.isExternalNft;
  const feeData = useFeeData({
    watch: true,
  });
  const [order, setOrder] = useState<Record<string, any>>({});
  // const [affiliateOrder, setAffiliateOrder] = useState<Record<string, any>>({});

  const [preparePurchase] = usePreparePurchaseMutation();

  const { config: approveConfig } = usePrepareContractWrite({
    address: usdcContractAddress,
    abi: erc20ABI,
    functionName: "approve",
    enabled: !!address ? true : false,
    args: [
      ArbitrumPaymentsAddress.address as `0x${string}`,
      utils.parseUnits("1000", 6),
      // product?.price,
      // product?.website?.walletAddress,
      // website?.walletAddress,
      // product?.commissionFee
      // ,
      // {
      //   gasLimit: 1300000,
      //   // value: web3.utils.toWei(product?.price ? `${product?.price}` : '0'),
      //   // gasPrice: feeData.data?.gasPrice ? feeData.data?.gasPrice.mul('11').div('10') : undefined
      // },
    ],
    onSettled(data, error) {
      console.log("Settled allowance", { data, error });
    },
  });

  const { writeAsync: approveWriteAsync } = useContractWrite(approveConfig);

  const { config: payConfig } = usePrepareContractWrite({
    address: paymentsAddressSmartContract(chain) as `0x${string}`,
    abi: ArbitrumPaymentsAbi.abi,
    functionName: "pay",
    enabled: (!!order?.id && !!address && !!product?.website?.walletAddress) ? true : false,
    args: [
      utils.parseUnits(product?.price.toString(), 6),
      product?.website?.walletAddress,
      query?.affiliateWalletAddress ? query?.affiliateWalletAddress : product?.website?.walletAddress,
      product?.commissionFee ?? 0,
      // product?.website?.walletAddress,
      // website?.walletAddress,
      // utils.parseUnits("0", 6)
      // , {
      //   // value: utils.parseUnits("2", 6),
      //   gasLimit: 1300000,
      //   // gasPrice: feeData.data?.gasPrice ? feeData.data?.gasPrice.mul('13').div('10') : undefined
      // }
      {
        gasLimit: 1300000,
      },
    ],
    // gasLimit: 130000,
    onSettled(data, error) {
      console.log("Settled pay", { data, error });
    },
  });

  const { config: payNftConfig } = usePrepareContractWrite({
    address: nftsAddressSmartContract(chain) as `0x${string}`,
    abi: ArbitrumSingleEditionMintableAbi.abi,
    functionName: "purchaseWithUsdc",
    enabled: !!order?.id,
    args: [
      utils.parseUnits(product?.price.toString(), 6),
      product?.website?.walletAddress,
      website?.walletAddress,
      product?.commissionFee ?? 0,
      // product?.website?.walletAddress,
      // website?.walletAddress,
      // utils.parseUnits("0", 6)
      // , {
      //   // value: utils.parseUnits("2", 6),
      //   gasLimit: 1300000,
      //   // gasPrice: feeData.data?.gasPrice ? feeData.data?.gasPrice.mul('13').div('10') : undefined
      // }
      {
        gasLimit: 1300000,
      },
    ],
    // gasLimit: 130000,
    onSettled(data, error) {
      console.log("Settled pay", { data, error });
    },
  });

  const { writeAsync: payWriteAsync, data: payWriteData } =
    useContractWrite(payConfig);
  // const MAX_ALLOWANCE = 115792089237316195423570985008687907853269984665640564039457584007913129639935n
  // const usdcAddress = '0x2791bca1f2de4661ed88a30c99a7a9449aa84174'
  // const { approveConfig } = usePrepareContractWrite({
  //   address: usdcAddress,
  //   enabled: true,
  //   abi: erc20ABI,
  //   functionName: "approve",
  //   args: [contractAddress, utils.parseUnits("1000", 6)],
  //   onSettled(data, error) {
  //     console.log('Settled approve', { data, error });
  //   },
  // });

  useEffect(() => {
    const finishPurchaseAction = async () => {
      if (payWriteData?.hash) {
        await finishPurchase({
          variables: {
            // affiliateOrderId: affiliateOrder?.id,
            orderId: order?.id,
            transactionHash: payWriteData?.hash,
          },
        });
        refetchOrderedProduct();
        viewPurchased(order);
      }
    };
    finishPurchaseAction();
  }, [payWriteData]);

  const purchaseWithWallet = () => {
    openModal("PRODUCT_SELECT_WALLET_MODAL", {
      product,
      orderedProductData: orderedProductData?.findManyOrderedProduct || [],
      selectedSpecSet,
      onPay: async (quantity: number, paymentAddress: string) => {
        try {
          // if (approveWriteAsync) {
          //   await approveWriteAsync();
          // }

          // if (payWriteAsync) {
          //   await payWriteAsync();
          // }

          const purchasedData = await preparePurchase({
            variables: {
              productId: product?.id,
              customerId: customer?.id,
              websiteSlug,
              paymentAddress,
              quantity,
            },
          });

          getProduct({
            variables: {
              where: {
                id: {
                  equals: product?.id,
                },
                active: {
                  equals: true,
                },
              },
            },
          });
          setOrder(purchasedData?.data?.preparePurchase);
          refetchOrderedProduct();
          // if (purchasedData?.data?.preparePurchase?.affiliateOrder?.id) {
          //   setAffiliateOrder(purchasedData?.data?.preparePurchase?.affiliateOrder)
          // }
        } catch (e) {
          toast.error("Pay failed.");
        }
      },
    });
  };

  const viewPurchased = (purchasedData: Record<string, any>) => {
    openModal("PRODUCT_PURCHASED_MODAL", {
      purchasedData,
      onToRedeem: () => {
        redeemProduct(purchasedData.id);
      },
    });
  };

  const redeemProduct = (orderId: string) => {
    openModal("PRODUCT_REDEEMED_MODAL", {
      orderId,
      onRedeem: () => {
        refetchOrderedProduct();
      },
    });
  };

  const viewAttachment = (attachment: Record<string, any>) => {
    openModal("PRODUCT_ATTACHMENT_MODAL", {
      attachment,
    });
  };

  const productVariationsSet = useMemo(() => {
    const object: Record<string, any> = {};
    Object.keys(product.variations).forEach((key: string) => {
      const spec = product.variations[key];
      object[spec.attribute.name] = spec.value.map(
        (item: Record<string, any>) => {
          return item.value;
        }
      );
    });
    return object;
  }, [product]);

  const priceRange = useMemo(() => {
    let min = 0;
    let max = 0;
    if (product.useVariations) {
      Object.keys(product.variationOptions).forEach((key) => {
        const price = Number(
          product.variationOptions[key].sale_price ||
          product.variationOptions[key].price
        );
        if (min === 0 || price < min) {
          min = price;
        }
        if (max === 0 || price > max) {
          max = price;
        }
      });
    }
    return `${min} - ${max}`;
  }, [product.useVariations, product.variationOptions]);

  const selectedSpecSet = useMemo(() => {
    let object: Record<string, any> = {};
    if (product.variationOptions) {
      const matechedSpecSet = Object.keys(product.variationOptions).find(
        (key: string) => {
          const optionsSet: Record<string, any> = {};
          if (product.variationOptions[key]?.options) {
            JSON.parse(product.variationOptions[key].options).forEach(
              (item: Record<string, any>) => {
                optionsSet[item.name] = item.value;
              }
            );
          }
          const unmatchedSpec = Object.keys(productVariationsSet).find(
            (key) => {
              return optionsSet[key] !== selectedSpec[key];
            }
          );
          return !unmatchedSpec;
        }
      );
      if (matechedSpecSet) {
        object = product.variationOptions[matechedSpecSet];
      }
    }
    return object;
  }, [selectedSpec, product.variationOptions, product.variations]);

  const productTag = useMemo(() => {
    return product.productType
      ? product.productType[0].toUpperCase() + product.productType.slice(1)
      : "";
  }, [product.productType]);

  const tagList = useMemo(() => {
    return (
      product.productCollections.filter((collection: any) => {
        return collection.name;
      }) || []
    );
  }, [product.productCollections]);

  const productPurchasableTime = useMemo(() => {
    if (product.useStartTime) {
      const startTimestamp = new Date(product.startTime).getTime();
      const endTimestamp = new Date(product.endTime).getTime();
      const curentTimestamp = Date.now();
      return curentTimestamp < endTimestamp && curentTimestamp > startTimestamp;
    } else {
      return true;
    }
  }, [product, Date]);

  const productPurchasable = useMemo(() => {
    switch (product.productType) {
      case "deal":
      case "event":
      case "membership":
        return (
          (product.useQuantity && product.quantity > 0) || !product.useQuantity
        );
      case "digital":
        return true;
      case "product":
        return (
          (product.useVariations &&
            selectedSpecSet.id &&
            !selectedSpecSet.is_disable) ||
          (!product.useVariations &&
            ((product.useQuantity && product.quantity > 0) ||
              !product.useQuantity))
        );
      default:
        return false;
    }
  }, [product, selectedSpecSet]);

  // const { writeAsync: approveWriteAsync } = useContractWrite(approveConfig)

  const handleSelectSpec = (event: SelectChangeEvent, key: string) => {
    setSelectedSpec({
      ...selectedSpec,
      [key]: event.target.value,
    });
  };

  useEffect(() => {
    // console.log(order?.amount ? web3.utils.toWei(`${order?.amount}`) : '0', order?.applicationFee ? web3.utils.toWei(`${order.applicationFee}`) : '0')
    // if (!polygonIsLoading && !klaytnIsLoading && !polygonContractData &&
    //   !klaytnContractData && order?.id && processingTransaction) {
    //   if (product?.website?.chain?.name === 'Polygon') {
    //     polygonWrite?.()
    //   } else if (product?.website?.chain?.name === 'Klaytn') {
    //     klaytnWrite?.()
    //   }
    // }

    const executeOrder = async () => {
      if (order?.id && approveWriteAsync && payWriteAsync) {
        await approveWriteAsync();
        await payWriteAsync();
        // await updateOrder({
        //   variables: {
        //     where: {
        //       id: order?.id
        //     },
        //     data: {
        //       paid: {
        //         set: true
        //       }
        //     }
        //   }
        // })
        // refetchOrderedProduct();
        // viewPurchased(order);
      }
    };
    executeOrder();
  }, [order]);

  useEffect(() => {
    if (lazyProductData?.findManyProduct[0]) {
      const currentProductData = lazyProductData?.findManyProduct[0];
      setProductQuantity(
        (currentProductData.quantity || 0) -
        (currentProductData.quantitySold || 0)
      );
    }
  }, [lazyProductData]);

  useEffect(() => {
    let gallery: { url: string }[] = [];
    if (product.imageObj) {
      gallery.push(product.imageObj);
    }
    if (product.gallery) {
      gallery = gallery.concat(product.gallery);
    }
    setImageList(gallery);
    setAttachments(product.attachments);
    setProductQuantity((product.quantity || 0) - (product.quantitySold || 0));

    // console.log("nftBought", nftBought);
  }, []);
  return (
    <article className="rounded-lg">
      {/* back */}
      <div className="p-6 lg:px-8">
        <BackButton />
      </div>

      {/* basic */}
      <div className="my-4 md:my-7 px-4 md:px-7 flex flex-col-reverse gap-4 md:flex-row">
        <div className="relative max-w-[750px] w-full flex-shrink-0">
          <ProductThumbnailGallery gallery={imageList} />
        </div>
        <div className="flex flex-col gap-4 flex-grow">
          <div className="flex flex-col gap-4 w-full md:flex-row md:items-end">
            <div className="max-w-[500px] text-2xl flex items-center gap-2">
              <div className="truncate">{product.name}</div>
            </div>
            <div className="flex items-center gap-2">
              <UserIconAlt className="h-4 w-4" />
              <div>{product.website.name}</div>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full md:flex-row md:items-end">
            <div
              className="max-w-[500px] text-2xl flex items-center gap-2"
              style={{
                color: themes[website.themeColor || "base"].accent400,
              }}
            >
              {product.productType === "product" && product.useVariations ? (
                <>{`${(!selectedSpecSet.is_disable && selectedSpecSet.price) ||
                  priceRange
                  } USD`}</>
              ) : (
                <>{`${product.salePrice || product.price} USD`}</>
              )}
            </div>
          </div>
          {product.productType === "product" &&
            product.useVariations &&
            product.variations ? (
            <div className="flex flex-col gap-2">
              {product.variations.map((spec: Record<string, any>) => {
                return (
                  <div className="flex items-center" key={spec.attribute.id}>
                    <div>{`${spec.attribute.name}: `}</div>
                    <div className="px-2 text-sm">
                      {isAuthorize ? (
                        <FormControl size="small">
                          <Select
                            displayEmpty
                            value={selectedSpec[spec.attribute.name] || ""}
                            onChange={(event) => {
                              handleSelectSpec(event, spec.attribute.name);
                            }}
                            input={<OutlinedInput />}
                            renderValue={(selected) => {
                              if (!selected) {
                                return <>Select ...</>;
                              }
                              return selected;
                            }}
                          >
                            <MenuItem disabled value="">
                              Please select
                            </MenuItem>
                            {spec.value.map((item: Record<string, any>) => {
                              return (
                                <MenuItem key={item.id} value={item.value}>
                                  {item.meta}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      ) : (
                        <>
                          {spec.value
                            .map((item: Record<string, any>) => {
                              return item.meta;
                            })
                            .join(", ")}
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            []
          )}
          {product.productType === "product" &&
            product.useVariations &&
            !selectedSpecSet ? (
            <p className="text-red-500">
              Please select variations combination.
            </p>
          ) : (
            []
          )}
          {product.productType === "product" &&
            product.useVariations &&
            selectedSpecSet &&
            selectedSpecSet.is_disable ? (
            <p className="text-red-500">
              This combination does't have product. Please select another
              combination.
            </p>
          ) : (
            []
          )}
          <div className="w-full h-[1px] bg-[#e5e7eb]"></div>
          <div className="flex gap-2">
            {product.useQuantity ? <div>{`${productQuantity} Sales`}</div> : []}
            {selectedSpecSet.quantity ? (
              <div>{`${selectedSpecSet.is_disable ? 0 : selectedSpecSet.quantity
                } Sales`}</div>
            ) : (
              []
            )}
            <div>{`${attachments.length} Attachments`}</div>
          </div>
          <div className="w-full h-[1px] bg-[#e5e7eb]"></div>
          {product.useStartTime ? (
            <div className="flex items-center gap-2">
              <CalenderIcon className="w-4 h-4" />
              <div>{`Duration: ${fDateTimeSuffix(
                product.startTime
              )} - ${fDateTimeSuffix(product.endTime)}`}</div>
              {!productPurchasableTime ? (
                <p className="text-red-500">Off Selling</p>
              ) : (
                []
              )}
            </div>
          ) : (
            []
          )}
          <div className="flex items-center gap-2">
            <LabelIcon className="w-4 h-4" />
            <div className="flex items-center gap-2">
              <div>{`Tag: `}</div>
              {productTag ? (
                <div
                  className="px-2 rounded-full text-sm text-white"
                  style={{
                    background: themes[website.themeColor || "base"].accent500,
                  }}
                >
                  {`#${productTag}`}
                </div>
              ) : (
                []
              )}
              {tagList.map((tag: any, index: number) => {
                return (
                  <div
                    className="px-2 rounded-full text-sm"
                    style={{
                      background:
                        themes[website.themeColor || "base"].accent100,
                    }}
                    key={index}
                  >
                    {`#${tag.name}`}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-full h-[1px] bg-[#e5e7eb]"></div>
        </div>
      </div>

      {/* info */}
      <div
        className="p-4 my-4 md:px-7 flex flex-col gap-3 md:flex-row md:justify-between md:items-center md:gap-0"
        style={{
          backgroundColor: themes[website.themeColor || "base"]?.accent50,
        }}
      >
        <div className="flex flex-col gap-1">
          <div className="flex gap-2 items-start">
            <div className="truncate text-2xl">{product.name}</div>
            {/* <StarIcon className="w-4 h-4" /> */}
          </div>
          <div className="flex items-center gap-2">
            <UserIconAlt className="h-4 w-4 flex-shrink-0" />
            <div className="truncate">{product.website.name}</div>
          </div>
        </div>
        {/* {product?.website?.walletAddress && customer?.id ? ( */}
        <div className="flex gap-4 items-start">
          <Button
            className="font-semibold disabled:text-white"
            size="small"
            onClick={() => {
              purchaseWithWallet();
            }}
            disabled={!productPurchasableTime || !productPurchasable}
          >
            Purchase with wallet
          </Button>
        </div>
        {/* ) : (
          <div className="flex gap-4 items-start">Please Login</div>
        )} */}
      </div>

      {/* redeem select options */}
      <div className="my-4 md:my-7 px-4 md:px-7 flex flex-col gap-2">
        {(product?.productType === "product" ||
          product?.productType === "deal") && (
            <div
              className="text-xl font-bold"
              style={{
                color: themes[website.themeColor || "base"].accent600,
              }}
            >
              Redeem
            </div>
          )}
        <div>{`${orderedProductData?.findManyOrderedProduct.length} instances`}</div>
        <div>
          {orderedProductData?.findManyOrderedProduct.map(
            (item: any, index: number) => {
              return (
                <div
                  className={cn("flex items-center p-2 gap-2 border-b", {
                    "opacity-30": !(
                      item.quantity - (item.redeemedQuantity || 0) >
                      0
                    ),
                  })}
                  key={item.id}
                >
                  <div className="flex-shrink-0">{index + 1}</div>
                  <div className="flex-shrink-0">{`#${item.id}`}</div>
                  <div className="flex-grow">{item.createdAt}</div>
                  {product?.productType !== "event" && (
                    <div className="flex-shrink-0">
                      {item.quantity - (item.redeemedQuantity || 0) > 0 ? (
                        <Button
                          className="font-semibold"
                          size="small"
                          onClick={() => {
                            redeemProduct(item.order.id);
                          }}
                        >
                          Redeem
                        </Button>
                      ) : (
                        <div
                          style={{
                            color:
                              themes[website.themeColor || "base"].accent600,
                          }}
                        >
                          Unredeemable
                        </div>
                      )}
                    </div>
                  )}
                  {product?.productType !== "event" ? (
                    <div className="flex items-center gap-1">
                      <span className="text-red-500">
                        {item.quantity - (item.redeemedQuantity || 0)}
                      </span>
                      <span>/</span>
                      <span>{item.quantity}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <span>{item.quantity}</span>
                    </div>
                  )}
                </div>
              );
            }
          )}
        </div>
      </div>

      {/* detail */}
      <div className="my-4 md:my-7 px-4 md:px-7 flex flex-col gap-2">
        <div
          className="text-xl font-bold"
          style={{
            color: themes[website.themeColor || "base"].accent600,
          }}
        >
          Details
        </div>
        <p>{product.description || "-"}</p>
      </div>

      {/* location */}
      <div className="my-4 md:my-7 px-4 md:px-7 flex flex-col gap-2">
        <div
          className="text-xl font-bold"
          style={{
            color: themes[website.themeColor || "base"].accent600,
          }}
        >
          Location
        </div>
        <div className="mt-2 border rounded-xl overflow-hidden h-[400px]">
          {isLoaded &&
            ((product?.website?.locationLat && product?.website?.locationLng) ||
              (product?.locationLat && product?.locationLng)) ? (
            <GoogleMap
              zoom={14}
              center={{
                lat: product.locationLat ?? product.website.locationLat,
                lng: product.locationLng ?? product.website.locationLng,
              }}
              mapContainerClassName="w-[100%] h-[400px]"
              options={{
                disableDefaultUI: true,
                zoomControl: true,
                styles: mapStyles,
              }}
              onLoad={onMapLoad}
            // onDragEnd={onBoundsChanged}
            >
              <Marker
                position={{
                  lat: parseFloat(product.website.locationLat),
                  lng: parseFloat(product.website.locationLng),
                }}
              ></Marker>
            </GoogleMap>
          ) : (
            []
          )}
        </div>
      </div>

      {/* attachments */}
      {attachments.length ? (
        <div className="my-4 md:my-7 px-4 md:px-7 flex flex-col gap-2">
          <div
            className="text-xl font-bold"
            style={{
              color: themes[website.themeColor || "base"].accent600,
            }}
          >
            Attachment
          </div>
          {product.productType === "digital" &&
            !orderedProductData?.findManyOrderedProduct.length ? (
            <p className="text-red-500">You haven't this product yet.</p>
          ) : (
            []
          )}
          <div className="grid grid-cols-1 gap-4 items-start md:grid-cols-4">
            {attachments.map((attachment) => {
              if (
                product.productType !== "digital" ||
                orderedProductData?.findManyOrderedProduct.length
              ) {
                return attachment.attachmentType === "document" ? (
                  <a
                    href={attachment?.attachmentObj?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={`attachment_${attachment.id}`}
                  >
                    <div className="flex flex-col gap-2">
                      <div
                        className="relative w-full aspect-square flex-shrink-0 flex items-center justify-center border rounded-xl cursor-pointer"
                        style={{
                          backgroundImage: `url(${attachment.previewObj.url})`,
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                        }}
                      >
                        <div className="absolute top-3 left-3 z-20 px-2 rounded-full uppercase bg-white/75">
                          {attachment.attachmentType}
                        </div>
                        {!attachment.imageObj?.url ? (
                          <ProductIcon className="w-[64px] h-[64px]" />
                        ) : (
                          []
                        )}
                      </div>
                      <div
                        className="text-lg font-bold"
                        style={{
                          color: themes[website.themeColor || "base"].accent400,
                        }}
                      >
                        {attachment.name}
                      </div>
                    </div>
                  </a>
                ) : (
                  <div
                    className="flex flex-col gap-2"
                    key={`attachment_${attachment.id}`}
                  >
                    <div
                      className="relative w-full aspect-square flex-shrink-0 flex items-center justify-center border rounded-xl cursor-pointer"
                      onClick={() => {
                        viewAttachment(attachment);
                      }}
                      style={{
                        backgroundImage: `url(${attachment.previewObj.url})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                      }}
                    >
                      <div className="absolute top-3 left-3 z-20 px-2 rounded-full uppercase bg-white/75">
                        {attachment.attachmentType}
                      </div>
                      {!attachment.imageObj?.url ? (
                        <ProductIcon className="w-[64px] h-[64px]" />
                      ) : (
                        []
                      )}
                    </div>
                    <div
                      className="text-lg font-bold"
                      style={{
                        color: themes[website.themeColor || "base"].accent400,
                      }}
                    >
                      {attachment.name}
                    </div>
                  </div>
                );
              } else {
                return (
                  <div
                    className="flex flex-col gap-2"
                    key={`attachment_${attachment.id}`}
                  >
                    <div
                      className="relative w-full aspect-square flex-shrink-0 flex items-center justify-center border rounded-xl"
                      style={{
                        backgroundImage: `url(${attachment.previewObj.url})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                      }}
                    >
                      <div className="absolute top-3 left-3 z-20 px-2 rounded-full uppercase bg-white/75">
                        {attachment.attachmentType}
                      </div>
                      {!attachment.imageObj?.url ? (
                        <ProductIcon className="w-[64px] h-[64px]" />
                      ) : (
                        []
                      )}
                    </div>
                    <div
                      className="text-lg font-bold"
                      style={{
                        color: themes[website.themeColor || "base"].accent400,
                      }}
                    >
                      {attachment.name}
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      ) : (
        []
      )}
    </article>
  );
};

export default ProductDetails;
