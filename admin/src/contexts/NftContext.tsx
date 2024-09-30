import React, { useEffect, useMemo, createContext, useState, useContext } from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import {
  useContractWrite,
  usePrepareContractWrite,
  useNetwork,
  useAccount,
  useFeeData,
} from 'wagmi';
import { signMessage } from "wagmi/actions";
import axios from "axios";

import { InjectedConnector } from 'wagmi/connectors/injected';
import { utils, ethers } from 'ethers';
import {
  useFindUniqueWebsiteQuery,
  usePermissionQuery,
  useUpdateOneProductMutation,
} from 'generated';
import { useRouter } from 'next/router'
// import NftContractCreator_ADDRESS_POLYGON from 'contractsData/polygon-NftContractCreator-address.json'
// import NftContractCreator_ADDRESS_GOERLI from 'contractsData/goerli-NftContractCreator-address.json'

// import NftContractCreator_ABI from 'contractsData/polygon-NftContractCreator.json'

import NftContractCreator_ADDRESS_POLYGON from 'client/src/web3/contractsData/polygon-SingleEditionMintableCreator-address.json'

import NftContractCreator_ABI from 'client/src/web3/contractsData/polygon-SingleEditionMintableCreator.json'


import { useTranslation } from 'next-i18next'
import {
  useConnectModal,
} from '@rainbow-me/rainbowkit';

function addressSmartContract(chain) {
  console.log("chain:", chain)
  switch (chain?.id) {
    case 137:
      return NftContractCreator_ADDRESS_POLYGON.address;
    // case 5:
    //   return NftContractCreator_ADDRESS_GOERLI.address;
    default:
      return 0;
  }
}

const NftContext = createContext({});
const dealWithEther = (price) => {
  if (isNaN(price) || price === '') {
    return 0;
  }
  return utils.parseEther(price);
};
function NftProvider({ children }) {
  const { t } = useTranslation(['design'])
  const { address } = useAccount()
  const feeData = useFeeData({
    watch: true,
  })
  const [processingTransaction, setProcessingTransaction] = useState(false)
  const [step, setStep] = useState(null)
  const [createdProduct, setCreatedProduct] = useState(null)
  const { openConnectModal } = useConnectModal()
  const [updateProduct] = useUpdateOneProductMutation();
  const { data: permissionData } = usePermissionQuery();
  const { data: websiteData } = useFindUniqueWebsiteQuery({
    variables: {
      where: {
        id: permissionData?.permission?.Website,
      },
    },
    skip: !permissionData?.permission?.Website,
  });

  const [nftInputs, setNftInputs] = useState({
    name: '',
    symbol: '',
    description: '',
    imageUrl: '',
    quantity: 100000,
    royaltyBPS: '500',
    // storageSize: '0',
    salePrice: '0',
    contractURI: ''
  });
  const router = useRouter()
  const { chain, chains } = useNetwork();


  const theFlag = useMemo(() => {
    return nftInputs.name !== "";
  }, [nftInputs.name]);

  const createProductNft = (data) => {
    // const accessPageText = '\n' + `Holder Contents: https://${websiteData?.findUniqueWebsite?.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/products/${data?.slug}`;
    // const domain = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_COOKIE_DOMAIN : 'yoh.app'
    const domain = window?.location?.hostname
    const gasless = false
    if (gasless) {
      console.log(data, data?.name, data?.slug, data?.description, data?.quantity, data?.imageObj?.url, data?.price, data?.id, `https://${websiteData?.findUniqueWebsite?.slug}.${domain}/api/nft/${data.id}/contractURI`)
      const contract = new ethers.Contract(addressSmartContract(chain), NftContractCreator_ABI.abi);
      const tx = contract.populateTransaction.createEdition(
        data.name,
        data.slug,
        data.description,
        data.imageObj?.url,
        `https://${websiteData?.findUniqueWebsite?.slug}.${domain}/api/nft/${data.id}/contractURI`,
        data.quantity,
        data.creatorEarnings,
        dealWithEther(`${data?.price}`),
      ).then(async (result) => {
        const calldata = result.data;
        let signature;
        try {
          signature = await signMessage({
            message: calldata,
          });
          const body = {
            chain,
            calldata: calldata,
            sender: address!,
            sign: signature,
            productId: data?.id
          };
          await axios.post("/api/web3/createNft", body)
        } catch (er) {
          alert(er);
          return;
        }
      });
    } else {
      setProcessingTransaction(true)
      setNftInputs({
        ...nftInputs,
        name: data?.name,
        symbol: data?.slug,
        description: data?.description ? data?.description : '',
        quantity: data?.quantity,
        imageUrl: data?.imageObj?.url ? data?.imageObj?.url : '',
        // storageSize: data?.storageSize,
        salePrice: data?.price,
        // royaltyBPS: '',
        productId: data?.id,
        contractURI: `https://${websiteData?.findUniqueWebsite?.slug}.${domain}/api/nft/${data.id}/contractURI`,
      });
    }
  };


  const { config: contractConfig, refetch: polygonRefetch } = usePrepareContractWrite({
    // address: NftContractCreator_ADDRESS_POLYGON.address,
    address: addressSmartContract(chains?.find(networkValue => chain?.id === networkValue.id)),

    abi: NftContractCreator_ABI.abi,
    // abi: SingleEditionMintableCreator_ABI.abi,
    functionName: 'createEdition',
    enabled: theFlag,
    // enabled: !!editionInputs?.productId && chain?.name === 'Polygon' && websiteData?.findUniqueWebsite?.chain?.name === 'Polygon',
    args: [
      nftInputs.name,
      nftInputs.symbol,
      nftInputs.description,
      nftInputs.imageUrl,
      nftInputs.contractURI,
      nftInputs.quantity,
      nftInputs.royaltyBPS,
      dealWithEther(`${nftInputs?.salePrice}`),
    ],
    overrides: {
      gasPrice: feeData.data?.gasPrice ? feeData.data?.gasPrice.mul('11').div('10') : undefined
    },
    onSettled(data, error) {
      console.log('Settled', { data, error });
    },
    onError(error) {
      console.log('Error', error);
      setProcessingTransaction(false)
      setStep(null)
      alert(t('WebsiteAdmin.Edition.WalletBallanceAlert'))
    },
  });
  async function onSuccess(success) {
    try {
      console.log('Success', success);

      const product = await updateProduct({
        variables: {
          where: {
            id: nftInputs?.productId,
          },
          data: {
            transactionHash: { set: success?.hash },
            // editionAddress: { set: editionContractAddressEvent.value },
          },
        },
      });

      setStep(null)
      setProcessingTransaction(false)
      setCreatedProduct({
        id: nftInputs?.productId,
        name: nftInputs?.name,
      })
    } catch (error) {
      console.log(error)
      setStep(null)
      setProcessingTransaction(false)
    }

  }

  const {
    data: nftContractData,
    isError: nftContractError,
    isLoading: nftContractLoading,
    write: nftContractWrite,
  } = useContractWrite({
    ...contractConfig,
    onError(error) {
      console.log('Error', error);
      setProcessingTransaction(false)
      setStep(null)
    },
    onSuccess,
    onMutate({ args, overrides }) {
      console.log('Mutate', { args, overrides });
    },
  });

  useEffect(() => {
    if (!chain) {
      console.log('no wallet connected');
    } else {
      console.log('chain ID =', chain?.id);
    }
  }, [chain]);

  useEffect(() => {
    console.log(nftContractData, nftContractWrite, nftContractLoading)

    if (address && nftInputs?.productId && processingTransaction && !nftContractLoading && !nftContractData) {
      if (nftContractWrite) {
        nftContractWrite()
      }
    }
  }, [websiteData, nftContractWrite, nftInputs, nftContractLoading, nftContractData, nftContractData, address]);


  return (
    <NftContext.Provider
      value={{
        step,
        address,
        processingTransaction,
        setProcessingTransaction,
        createProductNft,
        website: websiteData?.findUniqueWebsite,
        chain,
        createdProduct
      }}
    >
      {children}
    </NftContext.Provider>
  );
}
const useNft = () => {
  const context = useContext(NftContext);

  if (!context) throw new Error('NftContext  must be use inside NftProvider');

  return context;
};

export { NftProvider, NftContext, useNft };