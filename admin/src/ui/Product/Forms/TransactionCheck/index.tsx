import React, { useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { Button } from '@mui/material';
import { useEdition } from 'contexts/EditionContext';

const TransactionCheck = ({ action, register, errors, handleSubmit, setValue, getValues, watch, data }) => {
  const { t } = useTranslation('admin');
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const { createProductEdition, processingTransaction, step, address, chain, website, createdProduct } = useEdition();

  if (processingTransaction) {
    if (data?.transactionHash && !data?.editionAddress) {
      return <div>{t('transactionCheck.pending')}</div>;
    }
  }
  if (
    !data?.transactionHash ||
    (data?.transactionHash && !data?.editionAddress && new Date(data?.createdAt) < yesterday)
  ) {
    return (
      <div>
        <div>{t('transactionCheck.rerunRequired')}</div>
        <Button
          onClick={() => {
            createProductEdition(data);
          }}
        >
          {t('transactionCheck.run')}
        </Button>
      </div>
    );
  }
  if (data?.transactionHash && !data?.editionAddress) {
    return <div>{t('transactionCheck.pending')}</div>;
  }
  return <div>{t('transactionCheck.succeeded')}</div>;
};
export default {
  custom: true,
  hideOn: { action: 'create', field: { name: 'editionAddress', operator: '!==', value: null } },
  disableOn: null,
  component: TransactionCheck,
  intl: {
    titleId: '_Admin.Website._PageGroup.Product Management._Page.Product._Form.TransactionCheck._Title',
    title: 'TransactionCheck',
    descriptionId: '_Admin.Website._PageGroup.Product Management._Page.Product._Form.TransactionCheck._Description',
    description: 'TransactionCheck Description',
  },
  order: 12,
};
