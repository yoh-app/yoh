import React, { useEffect, createContext, useState, useContext } from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import { darkTheme, getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { ConnectButton } from '@rainbow-me/rainbowkit';

import {
  // chain,
  configureChains,
  createClient,
  useContractWrite,
  usePrepareContractWrite,
  useSwitchNetwork,
  useNetwork,
  useAccount,
  useConnect,
  WagmiConfig,
} from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { utils } from 'ethers';
import {
  useFindUniqueWebsiteQuery,
  usePermissionQuery,
  useUpdateOneProductMutation,
} from 'generated';
import abiDecoder from 'abi-decoder'
import { useRouter } from 'next/router'
import SingleEditionMintableCreator_ADDRESS_POLYGON from 'client/src/web3/contractsData/polygon-SingleEditionMintableCreator-address.json'
import SingleEditionMintableCreator_ADDRESS_ARBITRUM from 'client/src/web3/contractsData/arbitrum-SingleEditionMintableCreator-address.json'


// import SingleEditionMintableCreator_ADDRESS_KLAYTN from 'client/src/web3/contractsData/klaytn-SingleEditionMintableCreator-address.json'
import SingleEditionMintableCreator_ABI from 'client/src/web3/contractsData/arbitrum-SingleEditionMintableCreator.json'
import { useTranslation } from 'next-i18next'
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from '@rainbow-me/rainbowkit';


function addressSmartContract(chain) {
  switch (chain?.id) {
    case 137:
      return SingleEditionMintableCreator_ADDRESS_POLYGON.address;
    case 42161:
      return SingleEditionMintableCreator_ADDRESS_ARBITRUM.address;
    default:
      return 0;
  }
}


const EditionContext = createContext({});
const dealWithEther = (price) => {
  if (isNaN(price) || !price || price === '') {
    return 0;
  }
  return utils.parseEther(price);
};
function EditionProvider({ children }) {
  const { t } = useTranslation(['design'])
  const { address } = useAccount()
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

  const [editionInputs, setEditionInputs] = useState({
    name: '',
    symbol: '',
    description: '',
    imageUrl: '',
    editionSize: 1,
    royaltyBPS: '0',
    salePrice: '0',
    contractURI: ''
  });

  const router = useRouter()
  const { chain } = useNetwork();

  const createProductEdition = (data) => {
    const domain = window.location.hostname
    setProcessingTransaction(true)
    setEditionInputs({
      ...editionInputs,
      name: data?.name,
      description: data?.description ? data?.description : '',
      editionSize: data?.useQuantity && data?.quantity > 0 ? data?.quantity : 10000000,
      // imageUrl: data?.imageObj?.url ? data?.imageObj?.url : '',
      salePrice: data?.price,
      // royaltyBPS: data?.royaltyFee,
      productId: data?.id,
      // contractURI: `https://${domain}/api/nft/${data.id}/contractURI`,
    });
  };


  const { config: editionConfig, refetch } = usePrepareContractWrite({
    address: addressSmartContract(chain),
    abi: SingleEditionMintableCreator_ABI.abi,
    functionName: 'createEdition',
    enabled: !!editionInputs?.productId,
    args: [
      editionInputs.name,
      editionInputs.symbol,
      editionInputs.description,
      editionInputs.imageUrl,
      editionInputs.contractURI,
      editionInputs.editionSize,
      editionInputs.royaltyBPS,
      editionInputs?.salePrice
      // dealWithEther(`${editionInputs?.salePrice}`),
    ],
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
            id: editionInputs?.productId,
          },
          data: {
            transactionHash: { set: success?.hash },
          },
        },
      });

      setStep(null)
      setProcessingTransaction(false)
      setCreatedProduct({
        id: editionInputs?.productId,
        name: editionInputs?.name,
      })

    } catch (error) {
      console.log(error)
      setStep(null)
      setProcessingTransaction(false)
    }

  }


  const {
    data: editionData,
    isError: editionError,
    isLoading: editionLoading,
    write: editionWrite,
  } = useContractWrite({
    ...editionConfig,
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
      console.log('chain ID =', chain.id);
    }
  }, [chain]);

  useEffect(() => {
    if (address && editionInputs?.productId && processingTransaction && !editionLoading && !editionData) {
      if (editionWrite) {
        editionWrite()
      }
    }
  }, [websiteData, editionWrite, editionInputs, editionLoading, editionData, editionData, address]);


  return (
    <EditionContext.Provider
      value={{
        step,
        address,
        processingTransaction,
        setProcessingTransaction,
        createProductEdition,
        website: websiteData?.findUniqueWebsite,
        chain,
        createdProduct
        // switchToKlaytn,
        // switchToPolygon,
        // connectToKlaytn,
        // connectToPolygon
      }}
    >
      {children}
    </EditionContext.Provider>
  );
}
const useEdition = () => {
  const context = useContext(EditionContext);

  if (!context) throw new Error('EditionContext  must be use inside EditionProvider');

  return context;
};

export { EditionProvider, EditionContext, useEdition };
