import React, { useEffect, useState } from 'react';
import { Network, Alchemy } from 'alchemy-sdk';

import { useTheme } from '@mui/material/styles';
import { Button, TextField } from '@mui/material';
import { Check, Close } from '@mui/icons-material';
import Label from 'components/ui/label';
import { useFindManyPageQuery } from 'generated';
import { useTranslation } from 'next-i18next';

const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_API_KEY, // Replace with your Alchemy API Key.
  network: Network.MATIC_MAINNET, // Replace with your network.
};

const alchemy = new Alchemy(settings);
const ExternalNftVerify = ({ action, register, errors, handleSubmit, setValue, getValues, watch, data }) => {
  const theme = useTheme();
  const { t } = useTranslation('admin');

  useEffect(() => {
    if (getValues('isExternalNft')) {
      setValue('price', 0, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue('creatorEarnings', 0, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue('editionSize', 0, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, []);

  return (
    <div>
      {/* <div className="p-2">
        <Label>{t('nftVerify')}</Label>
        <TextField
          onChange={(e) => setContractAddress(e.target.value)}
          size="small"
          fullWidth
          value={contractAddress}
        ></TextField>
      </div> */}
      <div className="p-2">
        <Label>{t('nftVerify')}</Label>

        <Button
          disabled={false}
          type="button"
          variant="outlined"
          color="inherit"
          style={{ borderColor: theme.palette.grey[700] }}
          startIcon={<Check />}
          onClick={async () => {
            if (getValues('editionAddress')) {
              const contractMetadata = await alchemy.nft.getContractMetadata(getValues('editionAddress'));
              console.log(contractMetadata);
              setValue('editionSize', contractMetadata.totalSupply, {
                shouldValidate: true,
                shouldDirty: true,
              });
              alert(`${contractMetadata.name} is verified at address ${getValues('editionAddress')}`);
            }
          }}
        >
          {t('verify')}
        </Button>
      </div>
    </div>
  );
};

export default {
  custom: true,
  hideOn: { field: { name: 'isExternalNft', operator: '!==', value: true }, action: 'view' },
  disableOn: null,
  component: ExternalNftVerify,
  intl: {
    titleId: '_Admin.Website._PageGroup.Product Management._Page.Product._Form.ExternalNftVerify._Title',
    title: 'ExternalNftVerify',
    descriptionId: '_Admin.Website._PageGroup.Product Management._Page.Product._Form.ExternalNftVerify._Description',
    description: 'ExternalNftVerify Description',
  },
  order: 3,
};
