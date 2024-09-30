import React, { useEffect, useState } from 'react';
import { Network, Alchemy } from "alchemy-sdk";

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
const ExternalNftInfo = ({ action, register, errors, handleSubmit, setValue, getValues, watch, data }) => {
  const theme = useTheme();
  const [contractAddress, setContractAddress] = useState('');
  const [search, setSearch] = useState(false);
  const { t } = useTranslation('admin');


  useEffect(() => {

    async function fetchNft() {
      if (search && contractAddress) {
        const contractMetadata = await alchemy.nft.getContractMetadata(contractAddress);
        console.log(contractMetadata)
        setSearch(false);
      }
    }

    fetchNft()
  }, [contractAddress, search]);

  return (
    <div>
      <div className="p-2">
        <Label>{t('nftVerify')}</Label>
        <TextField
          onChange={(e) => setContractAddress(e.target.value)}
          size="small"
          fullWidth
          value={contractAddress}
        ></TextField>
      </div>
      <div className="p-2">
        <Button
          disabled={false}
          type="button"
          variant="outlined"
          color="inherit"
          style={{ borderColor: theme.palette.grey[700] }}
          startIcon={<Check />}
          onClick={async () => {
            setSearch(true);
            // await refetch();
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
  hideOn: null,
  disableOn: null,
  component: ExternalNftInfo,
  intl: {
    titleId: '_Admin.Website._PageGroup.Product Management._Page.ExternalNft._Form.ExternalNftInfo._Title',
    title: 'ExternalNftInfo',
    descriptionId: '_Admin.Website._PageGroup.Product Management._Page.ExternalNft._Form.ExternalNftInfo._Description',
    description: 'ExternalNftInfo Description',
  },
  order: 1,
};

