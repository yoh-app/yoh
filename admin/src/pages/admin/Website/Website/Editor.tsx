import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';
import { usePermissionQuery, useFindManyPageQuery, useUpdateOnePageMutation } from 'generated';
import { applyTheme } from 'client/src/themes/utils';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import AdminGuard from 'guards/AdminGuard';
import DashboardLayout from 'layouts/admin';
import { WebsiteMenu } from 'layouts/admin/menuItem';
import Page from 'components/Page';
import Spinner from 'admin/components/Spinner';

import {
  Typography,
  Card,
  Box,
  Button,
  Container
} from '@mui/material';
import Link from 'next/link';


function App() {
  const router = useRouter();
  const { data: permissionData } = usePermissionQuery();
  const { t } = useTranslation('design');

  const { data: websiteData } = useQuery(/* ... 保留現有的 GraphQL 查詢 ... */);
  
  const { data: pageData, refetch } = useFindManyPageQuery({
    variables: {
      where: {
        website: { id: { equals: permissionData?.permission?.Website } },
        isIndex: { equals: true }
      },
    },
    skip: !permissionData?.permission?.Website,
  });
  
  const page = pageData?.findManyPage?.[0];
  const [updatePage] = useUpdateOnePageMutation();

  useEffect(() => {
    if (websiteData?.findUniqueWebsite?.themeColor) {
      applyTheme(websiteData.findUniqueWebsite.themeColor);
    } else {
      applyTheme('base');
    }
  }, [websiteData?.findUniqueWebsite?.themeColor]);

  // ... 其餘代碼保持不變 ...

  return (
    <AdminGuard>
      {!page?.content && <Spinner />}
      <DashboardLayout menu={WebsiteMenu}>
        <Page title="Analytics | yoh.app">
          <Container>
            {/* ... 保留現有的 JSX ... */}
          </Container>
        </Page>
      </DashboardLayout>
    </AdminGuard>
  );
}

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['admin', 'design', 'generated'])),
  },
});

export default App;
