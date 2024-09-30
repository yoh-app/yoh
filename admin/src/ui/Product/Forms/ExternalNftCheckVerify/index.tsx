import React, { useEffect } from 'react';
const ExternalNftCheckVerify = ({ action, register, errors, handleSubmit, setValue, getValues, watch, data }) => {
  return null;
};

export default {
  custom: true,
  hideOn: { field: { name: 'isExternalNft', operator: '!==', value: true }, action: 'view' },
  disableOn: null,
  component: ExternalNftCheckVerify,
  intl: {
    titleId: '_Admin.Website._PageGroup.Product Management._Page.Product._Form.ExternalNftCheckVerify._Title',
    title: 'ExternalNftCheckVerify',
    descriptionId:
      '_Admin.Website._PageGroup.Product Management._Page.Product._Form.ExternalNftCheckVerify._Description',
    description: 'ExternalNftCheckVerify Description',
  },
  order: 2,
};
