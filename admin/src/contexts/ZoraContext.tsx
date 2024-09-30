import React, { useEffect, createContext, useState, useContext } from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import { darkTheme, getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { ConnectButton } from '@rainbow-me/rainbowkit';

import {
  chain,
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
// import ZoraNFTCreatorProxy_ABI from '@zoralabs/nft-drop-contracts/dist/artifacts/ZoraNFTCreatorV1.sol/ZoraNFTCreatorV1.json'
import abiDecoder from 'abi-decoder'

import ZoraNFTCreatorProxy_ADDRESS_RINKEBY from 'client/src/web3/contractsData/rinkeby-SingleEditionMintableCreator-address.json'
import ZoraNFTCreatorProxy_ABI from 'client/src/web3/contractsData/rinkeby-SingleEditionMintableCreator.json'
// import ZoraNFTCreatorProxy_ABI from '@zoralabs/nft-drop-contracts/dist/artifacts/ZoraNFTCreatorV1.sol/ZoraNFTCreatorV1.json'

// const ZoraNFTCreatorProxy_ADDRESS_RINKEBY = '0xeEC86248Cd908ee4F9813F46E75E7D95d5FCeCe2';
const ZoraNFTCreatorProxy_ADDRESS_MAINNET = '0xF74B146ce44CC162b601deC3BE331784DB111DC1';

const ZoraContext = createContext({});

function ZoraProvider({ children }) {
  const { address } = useAccount()
  const [processingTransaction, setProcessingTransaction] = useState(false)
  const [step, setStep] = useState(null)
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
  const [dropInputs, setDropInputs] = useState({
    contractName: 'Example Drop',
    contractSymbol: 'DROP',
    contractAdmin: '0x2344BD69D8e10CeEb80675e300ff384C54277910',
    contractMaxSupply: '100',
    secondaryRoyalties: '500',
    fundsRecipient: '0x2344BD69D8e10CeEb80675e300ff384C54277910',
    salesConfig: {
      priceEther: '0.001',
      perWalletMintCap: '5',
      publicSaleStart: '0', // makes it so edition will be live to start
      publicSaleEnd: '50000000000', // makes it so edition will be live to start
      presaleStart: '0',
      presaleEnd: '0',
      presaleMerkleRoot: '0x0000000000000000000000000000000000000000000000000000000000000000',
    },
    metadataURIBase: 'uribase/',
    metadtaContractURI: 'contracturi/',
  });

  const [editionInputs, setEditionInputs] = useState({
    contractName: 'Example Edition',
    contractSymbol: 'EDTN',
    contractMaxSupply: '100',
    secondaryRoyalties: '500',
    fundsRecipient: '0x2344BD69D8e10CeEb80675e300ff384C54277910',
    contractAdmin: '0x2344BD69D8e10CeEb80675e300ff384C54277910',
    salesConfig: {
      priceEther: '0.001',
      perWalletMintCap: '5',
      publicSaleStart: '0', // makes it so edition will be live to start
      publicSaleEnd: '50000000000', // makes it so edition will be live to start
      presaleStart: '0',
      presaleEnd: '0',
      presaleMerkleRoot: '0x0000000000000000000000000000000000000000000000000000000000000000',
    },
    editionDescription: 'description',
    metadataAnimationURI: 'animationURI/',
    metadataImageURI: 'imageURI/',
    metadataAnimationHash: 'animationHash/'
  });

  const { chain } = useNetwork();
  console.log(chain, 'chain')
  // connect to network and call create drop flow (for when no wallet previously connected)
  const { connectAsync: connectToRinkeby } = useConnect({
    connector: new InjectedConnector(),
    chainId: 4,
    onSettled(data, error, variables, context) {
      console.log('connect to polygon settled: ', data);
    },
  });

  const { connectAsync: connectToMainnet } = useConnect({
    connector: new InjectedConnector(),
    chainId: 137,
    onSettled(data, error, variables, context) {
      console.log('connect to polygon settled: ', data);
    },
  });


  const connectToRinkebyAndDrop = async () => {
    await connectToRinkeby();
    rinkebyDropWrite();
  };

  const connectToMainnetAndDrop = async () => {
    await connectToMainnet();
    polygonDropWrite();
  };

  // switch network and call create drop flow (for when wallet already connected but to incorrect network)
  const { data: rinkebyChainData, switchNetworkAsync: switchToRinkeby } = useSwitchNetwork({
    chainId: 4,
    onSuccess(rinkebyChainData) {
      console.log('Success', rinkebyChainData);
    },
  });

  const { data: polygonChainData, switchNetworkAsync: switchToMainnet } = useSwitchNetwork({
    chainId: 137,
    onSuccess(polygonChainData) {
      console.log('Success', polygonChainData);
    },
  });

  const switchToRinkebyAndDrop = async () => {
    await switchToRinkeby();
    rinkebyDropWrite();
  };

  const switchToMainnetAndDrop = async () => {
    await switchToMainnet();
    polygonDropWrite();
  };

  // createDrop function used in button
  const createDropRinkeby = () => {
    if (!chain) {
      connectToRinkebyAndDrop();
      return;
    } else if (chain && chain.id !== 4) {
      switchToRinkebyAndDrop();
      return;
    }
    rinkebyDropWrite();
  };

  const createDropMainnet = () => {
    if (!chain) {
      connectToMainnetAndDrop();
      return;
    } else if (chain && chain.id !== 1) {
      switchToMainnetAndDrop();
      return;
    }
    polygonDropWrite();
  };

  // connect to network and call create edition flow (for when no wallet previously connected)
  const connectToRinkebyAndEdition = async () => {
    await connectToRinkeby();
    rinkebyDropWrite();
  };

  const connectToMainnetAndEdition = async () => {
    await connectToMainnet();
    polygonDropWrite();
  };

  // switch network and call edition drop flow (for when wallet already connected but to incorrect network)
  const switchToRinkebyAndEdition = async () => {
    await switchToRinkeby();
    rinkebyDropWrite();
  };

  const switchToMainnetAndEdition = async () => {
    await switchToMainnet();
    polygonDropWrite();
  };

  const createProductEdition = (data) => {
    setProcessingTransaction(true)
    setEditionInputs({
      ...editionInputs,
      contractName: data?.name,
      contractSymbol: data?.id,
      editionDescription: data?.description ? data?.description : '',
      contractMaxSupply: data?.editionSize,
      // metadataImageURI: data?.imageObj?.url,
      fundsRecipient: websiteData?.findUniqueWebsite?.walletAddress,
      productId: data?.id,
    });
  };

  // createEdition function used in button
  const createEditionRinkeby = () => {
    if (!chain) {
      connectToRinkebyAndEdition();
      return;
    } else if (chain && chain.id !== 4) {
      switchToRinkebyAndEdition();
      return;
    }
    rinkebyEditionWrite();
  };

  const createEditionMainnet = () => {
    if (!chain) {
      connectToMainnetAndEdition();
      return;
    } else if (chain && chain.id !== 1) {
      switchToMainnetAndEdition();
      return;
    }
    polygonEditionWrite();
  };

  const dealWithEther = (price) => {
    if (price === '') {
      return 0;
    }
    return utils.parseEther(price);
  };

  // createDrop functions

  const {
    data: rinkebyDropData,
    isError: rinkebyDropError,
    isLoading: rinkebyDropLoading,
    write: rinkebyDropWrite,
  } = useContractWrite({
    address: ZoraNFTCreatorProxy_ADDRESS_RINKEBY,
    abi: ZoraNFTCreatorProxy_ABI.abi,
    functionName: 'createDrop',
    args: [
      dropInputs.contractName,
      dropInputs.contractSymbol,
      dropInputs.contractAdmin,
      dropInputs.contractMaxSupply,
      dropInputs.secondaryRoyalties,
      dropInputs.fundsRecipient,
      dropInputs.contractMaxSupply,
      dropInputs.secondaryRoyalties,
      websiteData?.findUniqueWebsite?.walletAddress,
      [
        dealWithEther(dropInputs.salesConfig.priceEther),
        dropInputs.salesConfig.perWalletMintCap,
        dropInputs.salesConfig.publicSaleStart,
        dropInputs.salesConfig.publicSaleEnd,
        dropInputs.salesConfig.presaleStart,
        dropInputs.salesConfig.presaleEnd,
        dropInputs.salesConfig.presaleMerkleRoot,
      ],
      dropInputs.metadataURIBase,
      dropInputs.metadtaContractURI,
    ],
  });

  const {
    data: polygonDropData,
    isError: polygonDropError,
    isLoading: polygonDropLoading,
    write: polygonDropWrite,
  } = useContractWrite({
    address: ZoraNFTCreatorProxy_ADDRESS_MAINNET,
    abi: ZoraNFTCreatorProxy_ABI.abi,
    functionName: 'createDrop',
    args: [
      dropInputs.contractName,
      dropInputs.contractSymbol,
      dropInputs.contractAdmin,
      dropInputs.contractMaxSupply,
      dropInputs.secondaryRoyalties,
      websiteData?.findUniqueWebsite?.walletAddress,
      [
        dealWithEther(dropInputs.salesConfig.priceEther),
        dropInputs.salesConfig.perWalletMintCap,
        dropInputs.salesConfig.publicSaleStart,
        dropInputs.salesConfig.publicSaleEnd,
        dropInputs.salesConfig.presaleStart,
        dropInputs.salesConfig.presaleEnd,
        dropInputs.salesConfig.presaleMerkleRoot,
      ],
      dropInputs.metadataURIBase,
      dropInputs.metadtaContractURI,
    ],
  });

  // createEdition functions

  const { config: rinkebyConfig } = usePrepareContractWrite({
    address: ZoraNFTCreatorProxy_ADDRESS_RINKEBY.address,
    abi: ZoraNFTCreatorProxy_ABI.abi,
    functionName: 'createEdition',
    // enabled: !!editionInputs?.productId && chain?.name === 'Rinkeby' && websiteData?.findUniqueWebsite?.chain?.name === 'Rinkeby',
    enabled: !!editionInputs?.productId,
    args: [
      editionInputs.contractName,
      editionInputs.contractSymbol,
      editionInputs.editionDescription,
      editionInputs.metadataImageURI,
      editionInputs.contractMaxSupply,
      editionInputs.secondaryRoyalties,
      dealWithEther('1'),
      dealWithEther('1'),
      {
        value: dealWithEther('1')
      }
    ],
    onSettled(data, error) {
      console.log('Settled', { data, error });
    },
  });

  const { config: polygonConfig } = usePrepareContractWrite({
    address: ZoraNFTCreatorProxy_ADDRESS_RINKEBY.address,
    abi: ZoraNFTCreatorProxy_ABI.abi,
    functionName: 'createEdition',
    enabled: !!editionInputs?.productId,
    // enabled: !!editionInputs?.productId && chain?.name === 'Polygon' && websiteData?.findUniqueWebsite?.chain?.name === 'Polygon',
    args: [
      editionInputs.contractName,
      editionInputs.contractSymbol,
      editionInputs.editionDescription,
      editionInputs.metadataImageURI,
      editionInputs.contractMaxSupply,
      editionInputs.secondaryRoyalties,
      dealWithEther('1'),
      dealWithEther('1')
    ],
    onSettled(data, error) {
      console.log('Settled', { data, error });
    },
  });
  async function onSuccess(success) {
    console.log('Success', success);
    setStep(1)
    const receipt = await success?.wait();
    setStep(2)
    console.log(receipt, 'receipt');
    abiDecoder.addABI(ZoraNFTCreatorProxy_ABI.abi);
    const decodedLogs = abiDecoder.decodeLogs(receipt.logs);
    console.log(decodedLogs, 'decodedLogs');

    if (decodedLogs?.length > 0) {
      const CreatedDropLog = decodedLogs.find((log) => log.name === 'CreatedDrop');
      const editionContractAddressEvent = CreatedDropLog.events.find(
        (event) => event.name === 'editionContractAddress'
      );
      console.log(editionContractAddressEvent);
      setStep(3)
      const product = await updateProduct({
        variables: {
          where: {
            id: editionInputs?.productId,
          },
          data: {
            transactionHash: { set: success?.hash },
            editionAddress: { set: editionContractAddressEvent.value },
          },
        },
      });
      setStep(null)
      console.log(product);
      setProcessingTransaction(false)
    }

  }
  const {
    data: rinkebyEditionData,
    isError: rinkebyEditionError,
    isLoading: rinkebyEditionLoading,
    write: rinkebyEditionWrite,
  } = useContractWrite({
    ...rinkebyConfig,
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

  const {
    data: polygonEditionData,
    isError: polygonEditionError,
    isLoading: polygonEditionLoading,
    write: polygonEditionWrite,
  } = useContractWrite({
    ...polygonConfig,
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
    if (editionInputs?.productId && processingTransaction) {
      console.log('here, ', websiteData)
      if (websiteData?.findUniqueWebsite?.chain?.name === 'Polygon') {
        if (polygonEditionWrite) {
          console.log('mainnnet')
          createEditionMainnet()
        }
      } else {
        if (rinkebyEditionWrite) {
          console.log('rinkeby')
          createEditionRinkeby();
        }
      }
    }
  }, [websiteData, polygonEditionWrite, editionInputs, rinkebyEditionWrite]);


  return (
    <ZoraContext.Provider
      value={{
        step,
        address,
        processingTransaction,
        setProcessingTransaction,
        createProductEdition,
        createEditionRinkeby,
        connectToRinkeby,
        connectToMainnet,
        switchToRinkeby,
        switchToMainnet,
        website: websiteData?.findUniqueWebsite,
        chain
      }}
    >
      {children}
    </ZoraContext.Provider>
  );
}
const useZora = () => {
  const context = useContext(ZoraContext);

  if (!context) throw new Error('ZoraContext  must be use inside ZoraProvider');

  return context;
};

export { ZoraProvider, ZoraContext, useZora };
