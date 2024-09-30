import cronjob from 'node-cron';
import { Network, Alchemy } from "alchemy-sdk";

import prisma from '../context/prisma';

import NftContractCreator_ADDRESS_ARBITRUM from '../../contractsData/arbitrum-SingleEditionMintableCreator-address.json'
import NftContractCreator_ABI from '../../contractsData/arbitrum-SingleEditionMintable.json'

const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_API_KEY, // Replace with your Alchemy API Key.
  network: Network.ARB_MAINNET, // Replace with your network.
};
const alchemy = new Alchemy(settings);

const productAddressCron = async ({ res }) => {
  const products = await prisma.product.findMany({
    where: {
      transactionHash: {
        not: {
          equals: null
        }
      },
      contractAddress: {
        equals: null
      }
    }
  })
  if (products?.length > 0) {
    // Get logs for a certain address, with specified topics and blockHash
    const logs = await alchemy.core
      .getLogs({
        address: NftContractCreator_ADDRESS_ARBITRUM.address,
        fromBlock: 'earliest',
        toBlock: 'latest'
      })
    const abiDecoder = require('abi-decoder');
    abiDecoder.addABI(NftContractCreator_ABI.abi);

    logs.map(async (log) => {
      // console.log(log, 'log')
      const decodedLogs = abiDecoder.decodeLogs([log]);
      // console.log(JSON.stringify(decodedLogs), 'decodedLogs')

      decodedLogs.map(async (decodedLog: any) => {
        if (decodedLog.name === 'CreatedEdition') {
          const nftContractAddressEvent = decodedLog.events.find(
            (event: any) => event.name === 'editionContractAddress'
          );
          const product = products.find((product) => product.transactionHash === log.transactionHash)

          if (nftContractAddressEvent?.value && product?.id) {
            const updateProduct = await prisma.product.update({
              where: {
                id: product?.id,
              },
              data: {
                contractAddress: nftContractAddressEvent.value,
              },
            });
            // console.log(updateProduct, 'product updated', updateProduct.id, updateProduct.slug)
          }
        }
      })
    })
  }
  res?.status(200).end('productAddressCron');

}

// const scheduledJobFunction = cronjob.schedule("*/40 * * * * *", productAddressCron);


export default productAddressCron;