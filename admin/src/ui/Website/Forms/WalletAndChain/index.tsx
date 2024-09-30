import React, { useEffect, useContext, useState } from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import { chain, configureChains, createClient, useAccount, useNetwork, WagmiConfig } from 'wagmi';
import { useTranslation } from 'next-i18next';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button, Typography } from '@mui/material';
import { useUpdateOneWebsiteMutation, usePermissionQuery } from 'generated';
import Spinner from 'admin/components/Spinner';
const WalletAndChain = ({ action, register, errors, handleSubmit, onSubmit, setValue, getValues, watch, data }) => {
  const { address, isConnecting, isDisconnected } = useAccount();
  const { chain } = useNetwork();
  const { t } = useTranslation('admin');
  const [updateWebsite] = useUpdateOneWebsiteMutation();
  const [loading, setLoading] = useState(false);
  const { data: permissionData } = usePermissionQuery();

  if (data?.chain && data?.walletAddress) {
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* {data?.chain.hasIcon && (
            <div
              style={{
                background: data?.chain.iconBackground,
                width: 12,
                height: 12,
                borderRadius: 999,
                overflow: 'hidden',
                marginRight: 4,
              }}
            >
              {data?.chain.iconUrl && (
                <img
                  alt={data?.chain.name ?? 'Chain icon'}
                  src={data?.chain.iconUrl}
                  style={{ width: 12, height: 12 }}
                />
              )}
            </div>
          )} */}
          {data?.chain.name}
        </div>
        <div>
          <a target="_blank" href={`https://polygonscan.com/address/${data.walletAddress}`}>
            <Button>{data.walletAddress}</Button>
          </a>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        {loading && <Spinner />}
        {!address && (
          <Typography gutterBottom variant="body1" style={{ color: 'red' }}>
            {t('connectWallet')}
          </Typography>
        )}
        {/* {chain?.name !== 'Polygon' && (
          <Typography gutterBottom variant="body1" sx={{ color: 'red' }}>
            {t('switchChain')}
          </Typography>
        )} */}
        {/* {address && chain?.name === 'Polygon' && (
          <>
            <Typography style={{ marginTop: '5px', marginBottom: '5px' }} variant="body1">
              {t('connectedWallet')}: {address}
            </Typography>
            <Typography style={{ color: 'red' }} variant="body1">
              {t('walletSaveAgain')}
            </Typography>
          </>
        )} */}
        {address && (
          <>
            <Typography style={{ marginTop: '5px', marginBottom: '5px' }} variant="body1">
              {t('connectedWallet')}: {address}
            </Typography>
            <Typography style={{ color: 'red' }} variant="body1">
              {t('walletSaveAgain')}
            </Typography>
          </>
        )}
        <div style={{ display: 'flex', marginTop: '10px' }}>
          {address && (
            <Button
              style={{ marginLeft: '10px' }}
              onClick={async () => {
                // if (chain?.name === 'Polygon' && !chain?.iconUrl) {
                //   chain.iconUrl =
                //     'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCIgZmlsbD0ibm9uZSI+PHJlY3Qgd2lkdGg9IjI4IiBoZWlnaHQ9IjI4IiBmaWxsPSIjODI0N0U1IiByeD0iMTQiLz48cmVjdCB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIGZpbGw9InVybCgjYSkiIGZpbGwtb3BhY2l0eT0iLjMiIHJ4PSIxNCIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0xOC4yOCAxMC45MmExLjA2IDEuMDYgMCAwIDAtMS4wNiAwbC0yLjQxIDEuNDItMS42NS45My0yLjQxIDEuNDNjLS4zMS4xOS0uNzIuMTktMS4wNiAwbC0xLjkyLTEuMTJhMS4wNyAxLjA3IDAgMCAxLS41My0uOXYtMi4yYTEgMSAwIDAgMSAuNTMtLjlsMS45LTEuMDhjLjMtLjE4LjctLjE4IDEuMDQgMGwxLjkgMS4wOWMuMy4xOC41Mi41Mi41Mi45djEuNDJsMS42NC0uOTZWOS41MmExIDEgMCAwIDAtLjUyLS45bC0zLjUtMi4wNGExLjA2IDEuMDYgMCAwIDAtMS4wNiAwTDYuMTMgOC42M2ExIDEgMCAwIDAtLjUzLjl2NC4xMmExIDEgMCAwIDAgLjUzLjlsMy41NiAyLjA0Yy4zMS4xOS43MS4xOSAxLjA2IDBsMi40MS0xLjQgMS42NS0uOTUgMi40MS0xLjRjLjMxLS4xOS43Mi0uMTkgMS4wNiAwbDEuODkgMS4wOWMuMy4xOC41My41Mi41My45djIuMmExIDEgMCAwIDEtLjUzLjlsLTEuOSAxLjExYy0uMy4xOS0uNy4xOS0xLjA1IDBsLTEuODktMS4wOGExLjA3IDEuMDcgMCAwIDEtLjUyLS45di0xLjQzbC0xLjY1Ljk2djEuNDNhMSAxIDAgMCAwIC41My45bDMuNTYgMi4wNGMuMzEuMTkuNzIuMTkgMS4wNiAwbDMuNTYtMi4wNGMuMzEtLjE5LjUzLS41My41My0uOXYtNC4xM2ExIDEgMCAwIDAtLjUzLS45bC0zLjYtMi4wN1oiLz48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImEiIHgxPSIwIiB4Mj0iMTQiIHkxPSIwIiB5Mj0iMjgiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBzdG9wLWNvbG9yPSIjZmZmIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmZmIiBzdG9wLW9wYWNpdHk9IjAiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48L3N2Zz4K';
                //   chain.hasIcon = true;
                // }
                setLoading(true);
                await updateWebsite({
                  variables: {
                    where: {
                      id: permissionData?.permission?.Website,
                    },
                    data: {
                      walletAddress: { set: address },
                      chain,
                    },
                  },
                });
                setLoading(false);
                // window.location.reload()
              }}
              variant="contained"
            >
              {t('save')}
            </Button>
          )}
        </div>
      </div>
    );
  }
};

export default {
  custom: true,
  hideOn: { action: 'create' },
  disableOn: null,
  component: WalletAndChain,
  intl: {
    titleId: '_Admin.Website._PageGroup.Website._Page.Website._Form.WalletAndChain._Title',
    title: 'WalletAndChain',
    descriptionId: '_Admin.Website._PageGroup.Website._Page.Website._Form.WalletAndChain._Description',
    description: 'WalletAndChain Description',
  },
  order: 4,
};
