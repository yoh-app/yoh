import React, { useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
// import { useFindUniqueWebsiteQuery } from 'generated';
const SiteName = ({ action, register, errors, handleSubmit, setValue, getValues, watch, data }) => {
  const { data: requestData, loading } = useQuery(
    gql`
      query findUniqueRequest($where: RequestWhereUniqueInput!) {
        findUniqueRequest(where: $where) {
          id
          page {
            id
            website {
              id
              name
              slug
            }
          }
        }
      }
    `,
    {
      variables: {
        where: {
          id: data?.id,
        },
      },
    },
  );

  return (
    <a
      href={
        process.env.NODE_ENV === 'production'
          ? `https://${requestData?.findUniqueRequest?.page?.website?.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/`
          : `http://www.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}:3003/`
      }
    >
      {requestData?.findUniqueRequest?.page?.website?.name}
    </a>
  );
};

export default {
  custom: true,
  hideOn: null,
  component: SiteName,
  intl: {
    titleId: '_Admin.User._PageGroup.Request._Page.Request._Form.SiteName._Title',
    title: 'SiteName',
    descriptionId: '_Admin.User._PageGroup.Request._Page.Request._Form.SiteName._Description',
    description: 'SiteName Description',
  },
  order: 1,
};
