import React, { useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useFindUniqueWebsiteQuery } from 'generated';
const SiteName = ({ action, register, errors, handleSubmit, setValue, getValues, watch, data }) => {
  const { data: siteData, loading } = useFindUniqueWebsiteQuery({
    variables: {
      where: {
        id: data?.websiteId,
      },
    },
  });

  return (
    <a
      href={
        process.env.NODE_ENV === 'production'
          ? `https://${siteData?.findUniqueWebsite?.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/`
          : `http://www.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}:3003/`
      }
    >
      {siteData?.findUniqueWebsite?.name}
    </a>
  );
};

export default {
  custom: true,
  hideOn: null,
  component: SiteName,
  intl: {
    titleId: '_Admin.User._PageGroup.Order._Page.Order._Form.SiteName._Title',
    title: 'SiteName',
    descriptionId: '_Admin.User._PageGroup.Order._Page.Order._Form.SiteName._Description',
    description: 'SiteName Description',
  },
  order: 1,
};
