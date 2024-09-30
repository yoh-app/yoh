import React, { useEffect, useContext, useState } from 'react';
import { TableContext } from 'admin/PrismaTable';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import { useTranslation } from 'next-i18next';
import { useStripeEnabledQuery } from 'generated';
import { useStripeAccountStatusQuery, useFindManyPageQuery } from 'generated';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useNetwork, useAccount } from 'wagmi';
import NextLink from 'next/link';
import Chip from '@mui/material/Chip';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
const ExternalNftCheck = ({ action, register, errors, handleSubmit, setValue, getValues, watch, data }) => {
  const [state, setState] = useState(data?.isExternalNft ?? true);
  const { t: tAdmin } = useTranslation('admin');
  const { chain } = useNetwork()
  const { address } = useAccount();
  const { websiteData } = useContext(TableContext);
  const { data: stripeData } = useStripeAccountStatusQuery({
    skip: websiteData?.paymentMethod !== 'stripe'
  });
  const stripeSetupRequired =
    !state &&
    websiteData?.paymentMethod === 'stripe' &&
    stripeData?.stripeAccountStatus?.accountLink &&
    stripeData?.stripeAccountStatus?.accountLink !== 'access';
  const walletSetupRequired = !websiteData?.walletAddress;
  const walletConnectRequired = !address;
  const wrongWallet = websiteData?.walletAddress !== address;
  const wrongChain = websiteData?.chain?.id !== chain?.id
  useEffect(() => {
    if (state) {
      setValue('editionSize', 0, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue('price', 0, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue('creatorEarnings', 0, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [state]);

  useEffect(() => {
    if (state) {
      setValue('isExternalNft', true, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [state]);

  return (
    <div>
      {/* <FormControlLabel
      value={state ? 'yes' : 'no'}
      control={<Switch
        disabled={action !== 'create' || stripeSetupRequired || walletSetupRequired || walletConnectRequired}
        onChange={(e) => {
          setState(e.target.checked);
          setValue('isExternalNft', e.target.checked, {
            shouldValidate: true,
            shouldDirty: true,
          });
        }}
      />}
      label={state ? tAdmin('yes') : tAdmin('no')}
      labelPlacement={state ? 'end' : 'start'}
    /> */}
      <RadioGroup
        defaultValue={state ? 'external' : 'internal'}
        value={state ? 'external' : 'internal'}
        onChange={(e) => {
          const value = e.target.value === 'external' ? true : false;
          setState(value);
          setValue('isExternalNft', value, {
            shouldValidate: true,
            shouldDirty: true,
          });
        }}
      >
        <FormControlLabel
          disabled={action === 'view' || action === 'edit'}
          value={'external'}
          control={<Radio />}
          label={tAdmin('product.isExternalNFT.importNFT')}
        />
        <FormControlLabel
          disabled={
            wrongChain ||
            wrongWallet ||
            stripeSetupRequired ||
            walletSetupRequired ||
            walletConnectRequired ||
            action === 'view' ||
            action === 'edit'
          }
          value={'internal'}
          control={<Radio />}
          label={tAdmin('product.isExternalNFT.createNFT')}
        />
      </RadioGroup>
      {!state && !stripeSetupRequired && !walletSetupRequired && !walletConnectRequired && !wrongWallet && !wrongChain && (
        <div style={{ fontSize: '13px' }}>
          {tAdmin('product.isExternalNFT.deployFrom')}
          <br />
          {address}
        </div>
      )}

      {action === 'create' && (wrongChain || wrongWallet || stripeSetupRequired || walletSetupRequired || walletConnectRequired) && (
        <div>
          <div className="my-3">{tAdmin('product.isExternalNFT.createNFTSteps')}</div>
          {stripeSetupRequired && (
            <a
              style={{ display: 'block', marginBottom: '10px' }}
              target="_blank"
              href={stripeData?.stripeAccountStatus?.accountLink?.url}
            >
              <Chip style={{ width: '100%' }} color="info" onClick={() => { }} label={tAdmin('product.setupStripe')} />
            </a>
          )}
          {walletSetupRequired && (
            <div style={{ marginBottom: '10px' }}>
              <NextLink href="/admin/Website/Website/SetupWallet">
                <Chip
                  style={{ width: '100%' }}
                  color="warning"
                  onClick={() => { }}
                  label={tAdmin('product.setupWallet')}
                />
              </NextLink>
            </div>
          )}
          {!walletSetupRequired && (walletConnectRequired || wrongWallet || wrongChain) && (
            <div>
              <ConnectButton.Custom>
                {({
                  account,
                  chain,
                  openAccountModal,
                  openChainModal,
                  openConnectModal,
                  authenticationStatus,
                  mounted,
                }) => {
                  // Note: If your app doesn't use authentication, you
                  // can remove all 'authenticationStatus' checks
                  const ready = mounted && authenticationStatus !== 'loading';
                  const connected =
                    ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated');

                  return (
                    <Chip
                      style={{ width: '100%' }}
                      color="error"
                      onClick={() => {
                        if (wrongChain) {
                          openChainModal();
                        } else if (wrongWallet) {
                          openAccountModal();
                        } else if (walletConnectRequired) {
                          openConnectModal();
                        }
                        // if (address) {
                        //   openAccountModal();
                        // } else {
                        //   openConnectModal();
                        // }
                      }}
                      label={tAdmin('wrongWallet')}
                    />
                  );
                }}
              </ConnectButton.Custom>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default {
  custom: true,
  hideOn: null,
  disableOn: null,
  component: ExternalNftCheck,
  intl: {
    titleId: '_Admin.Website._PageGroup.Product Management._Page.Product._Form.ExternalNftCheck._Title',
    title: 'ExternalNftCheck',
    descriptionId: '_Admin.Website._PageGroup.Product Management._Page.Product._Form.ExternalNftCheck._Description',
    description: 'ExternalNftCheck Description',
  },
  order: 1,
};
