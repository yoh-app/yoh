import { useRouter } from 'next/router';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { ethers } from 'ethers';
import MarketplaceAbi from '@web3/contractsData/Marketplace.json';
import MarketplaceAddress from '@web3/contractsData/Marketplace-address.json';
import NFTAbi from '@web3/contractsData/NFT.json';
import NFTAddress from '@web3/contractsData/NFT-address.json';
import { create as ipfsHttpClient } from 'ipfs-http-client';
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

export interface State {}

const initialState = {};

export const Web3Context = React.createContext<State | any>(initialState);

Web3Context.displayName = 'Web3Context';

export const Web3Provider: FC = (props) => {
  const [loadContractsLoading, setLoadContractsLoading] = useState(true);
  const [loadPurchasedItemsLoading, setLoadPurchasedItemsLoading] = useState(true);
  const [loadListedItemsLoading, setLoadListedItemsLoading] = useState(true);
  const [loadMarketplaceItemsLoading, setLoadMarketplaceItemsLoading] = useState(true);

  const [account, setAccount] = useState(null);
  const [nft, setNFT] = useState(null);
  const [marketplace, setMarketplace] = useState(null);
  // MetaMask Login/Connect
  const web3Handler = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0]);
    // Get provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // Set signer
    const signer = provider.getSigner();

    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload();
    });

    window.ethereum.on('accountsChanged', async function (accounts) {
      setAccount(accounts[0]);
      await web3Handler();
    });
    loadContracts(signer);
  };
  const loadContracts = async (signer) => {
    // Get deployed copies of contracts
    const marketplace = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer);
    setMarketplace(marketplace);
    const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer);
    setNFT(nft);
    setLoadContractsLoading(false);
  };

  // Purchased Logics
  const [purchases, setPurchases] = useState([]);
  const loadPurchasedItems = async () => {
    if (nft && marketplace) {
      console.log(marketplace);
      // Fetch purchased items from marketplace by quering Offered events with the buyer set as the user
      const filter = await marketplace.filters.Bought(null, null, null, null, null, account);
      const results = await marketplace.queryFilter(filter);
      //Fetch metadata of each nft and add that to listedItem object.

      const purchases = await Promise.all(
        results.map(async (i) => {
          // fetch arguments from each result
          i = i.args;
          // get uri url from nft contract
          const uri = await nft.tokenURI(i.tokenId);
          // use uri to fetch the nft metadata stored on ipfs
          const response = await fetch(uri);
          const metadata = await response.json();
          // get total price of item (item price + fee)
          const totalPrice = await marketplace.getTotalPrice(i.itemId);
          // define listed item object
          let purchasedItem = {
            totalPrice,
            price: i.price,
            itemId: i.itemId,
            name: metadata.name,
            description: metadata.description,
            image: metadata.image,
            productId: metadata.productId,
          };
          return purchasedItem;
        }),
      );
      console.log('start', purchases);

      setLoadPurchasedItemsLoading(false);
      setPurchases(purchases);
    }
  };

  //Listed Logics
  const [listedItems, setListedItems] = useState([]);
  const [soldItems, setSoldItems] = useState([]);
  const loadListedItems = async () => {
    if (nft && marketplace) {
      // Load all sold items that the user listed
      const itemCount = await marketplace.itemCount();
      let listedItems = [];
      let soldItems = [];
      for (let indx = 1; indx <= itemCount; indx++) {
        const i = await marketplace.items(indx);
        if (i.seller.toLowerCase() === account) {
          // get uri url from nft contract
          const uri = await nft.tokenURI(i.tokenId);
          // use uri to fetch the nft metadata stored on ipfs
          const response = await fetch(uri);
          const metadata = await response.json();
          // get total price of item (item price + fee)
          const totalPrice = await marketplace.getTotalPrice(i.itemId);
          // define listed item object
          let item = {
            totalPrice,
            price: i.price,
            itemId: i.itemId,
            name: metadata.name,
            description: metadata.description,
            image: metadata.image,
          };
          listedItems.push(item);
          // Add listed item to sold items array if sold
          if (i.sold) soldItems.push(item);
        }
      }
      setLoadListedItemsLoading(false);
      setListedItems(listedItems);
      setSoldItems(soldItems);
    }
  };

  //Create Logics
  const [productId, setProductId] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const uploadToIPFS = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (typeof file !== 'undefined') {
      try {
        const result = await client.add(file);
        console.log(result);
        setImage(`https://ipfs.infura.io/ipfs/${result.path}`);
      } catch (error) {
        console.log('ipfs image upload error: ', error);
      }
    }
  };
  const createNFT = async () => {
    console.log({ image, price, name, description, productId }, 'nft details');

    if (!image || !price || !name || !description || !productId) return;
    try {
      const result = await client.add(JSON.stringify({ image, price, name, description, productId }));
      console.log(result);
      const { id } = await mintThenList(result);
      return { id };
    } catch (error) {
      console.log('ipfs uri upload error: ', error);
    }
  };
  const mintThenList = async (result) => {
    const uri = `https://ipfs.infura.io/ipfs/${result.path}`;
    // mint nft
    await (await nft.mint(uri)).wait();
    // get tokenId of new nft
    const id = await nft.tokenCount();
    // approve marketplace to spend nft
    await (await nft.setApprovalForAll(marketplace.address, true)).wait();
    // add nft to marketplace
    const listingPrice = ethers.utils.parseEther(price.toString());
    await (
      await marketplace.makeItem(nft.address, id, listingPrice, '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266')
    ).wait();
    loadMarketplaceItems();

    return { id };
  };

  // Items Logic
  const [items, setItems] = useState([]);
  const loadMarketplaceItems = async () => {
    if (nft && marketplace) {
      // Load all unsold items
      const itemCount = await marketplace.itemCount();
      let items = [];
      for (let i = 1; i <= itemCount; i++) {
        const item = await marketplace.items(i);
        if (!item.sold) {
          // get uri url from nft contract
          const uri = await nft.tokenURI(item.tokenId);
          // use uri to fetch the nft metadata stored on ipfs
          const response = await fetch(uri);
          const metadata = await response.json();

          // get total price of item (item price + fee)
          const totalPrice = await marketplace.getTotalPrice(item.itemId);
          // Add item to items array
          items.push({
            totalPrice,
            itemId: item.itemId,
            seller: item.seller,
            name: metadata.name,
            description: metadata.description,
            image: metadata.image,
            productId: metadata.productId,
          });
        }
      }
      setLoadMarketplaceItemsLoading(false);
      setItems(items);
    }
  };

  const buyMarketItem = async (item) => {
    await (await marketplace.purchaseItem(item.itemId, { value: item.totalPrice })).wait();
    loadMarketplaceItems();
    loadPurchasedItems();
  };

  return (
    <Web3Context.Provider
      value={{
        items,
        account,
        web3Handler,
        marketplace,
        nft,
        purchases,
        buyMarketItem,
        createNFT,
        mintThenList,
        setImage,
        setPrice,
        setName,
        setDescription,
        setProductId,
        loadPurchasedItems,
        loadMarketplaceItems,
      }}
      {...props}
    />
  );
};

export const useWeb3 = () => {
  const context = React.useContext(Web3Context);
  if (context === undefined) {
    throw new Error(`useWeb3 must be used within a Web3Provider`);
  }
  return context;
};
