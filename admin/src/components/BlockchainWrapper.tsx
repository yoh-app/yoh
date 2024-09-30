import React, { useEffect } from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import { darkTheme, lightTheme, getDefaultWallets, RainbowKitProvider, connectorsForWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, useAccount, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { polygon, arbitrum } from 'wagmi/chains'

import { sequenceWallet } from '@0xsequence/rainbowkit-plugin/dist/sequence-rainbowkit-plugin.mjs'
import {
  metaMaskWallet,
  injectedWallet,
  rainbowWallet,
  // walletConnectWallet
} from '@rainbow-me/rainbowkit/wallets'

function BlockchainWrapper({ children, chainData }) {



  const { chains, provider } = configureChains(
    // [klaytnChain, chain.polygon],
    [arbitrum],
    [
      // alchemyProvider({ alchemyId: process.env.NEXT_PUBLIC_ALCHMEY_ID }),
      publicProvider(),
    ]
  );

  const walletConnectProjectId = 'ecf05e6e910a7006159c69f03dafbaeb'

  let walletAppURL = 'https://sequence.app'

  const connectors = connectorsForWallets([
    {
      groupName: 'Recommended',
      wallets: [
        sequenceWallet({
          projectAccessKey: process.env.NEXT_PUBLIC_SEQUENCE_API_KEY,
          chains,

          defaultNetwork: 42161,

          connect: {
            app: 'Test Project',
          },

          // This is optional, and only used to point to a custom
          // environment for the wallet app. By default, it will
          // point to https://sequence.app/
          walletAppURL
        }),
        metaMaskWallet({ chains, projectId: walletConnectProjectId, shimDisconnect: true }),
        // rainbowWallet({ chains, projectId: walletConnectProjectId }),
        // walletConnectWallet({
        //   chains,
        //   projectId: walletConnectProjectId,
        // }),
        // injectedWallet({ chains, shimDisconnect: true })
      ]
    }
  ])


  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });


  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        initialChain={arbitrum}
        chains={chains}
        theme={lightTheme()}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default BlockchainWrapper;
