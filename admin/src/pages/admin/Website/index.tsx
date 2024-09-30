import WebsiteDescription from 'ui/Website/Forms/Description';
import WebsiteLogo from 'ui/Website/Forms/Logo';
import WebsiteWalletAndChain from 'ui/Website/Forms/WalletAndChain';
import WebsiteSettings from 'ui/Website/Forms/Settings';
import WebsiteGasless from 'ui/Website/Forms/Gasless';
import WebsiteLocation from 'ui/Website/Forms/Location';
import WebsiteStripeAccount from 'ui/Website/Forms/StripeAccount';
import WebsiteActive from 'ui/Website/Forms/Active';
import WebsiteWebsiteSlug from 'ui/Website/Forms/WebsiteSlug';
import WebsiteYoutubeConnect from 'ui/Website/Forms/YoutubeConnect';
import React from 'react';
import { useRouter } from 'next/router';
import { WebsiteMenu } from 'layouts/admin/menuItem';
import DashboardLayout from 'layouts/admin';
import BasicEditRecord from 'admin/custom/BasicEditRecord';
import BasicForm from 'admin/custom/BasicForm';
import BasicGrid from 'admin/custom/BasicGrid';
import EditRecord from 'admin/PrismaTable/EditRecord';
import { useQuery } from '@apollo/client';
import Page from 'components/Page';
import { Container } from '@mui/material';

import Spinner from 'admin/components/Spinner';
import DynamicTable from 'admin/PrismaTable/dynamicTable';
import { GET_SCHEMA } from 'admin/SchemaQueries';
import { ModelTableProps, ContextProps } from 'admin/types';
import { TableContext, defaultSettings } from 'admin/PrismaTable/Context';
import defaultLanguage from 'admin/PrismaTable/language';
import WebsiteUI from 'ui/Website';
import { usePermissionQuery } from 'generated';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import AdminGuard from 'guards/AdminGuard';

const Website = ({ language, ...rest }) => {
  const { query, push } = useRouter();
  const { data, loading } = usePermissionQuery();
  const mergedLanguage = { ...defaultLanguage(), ...language };
  const ui = WebsiteUI;

  ui.relationModels = {};

  ui.forms = [
    WebsiteDescription,
    WebsiteLogo,
    WebsiteWalletAndChain,
    WebsiteSettings,
    WebsiteGasless,
    WebsiteLocation,
    WebsiteStripeAccount,
    WebsiteActive,
    WebsiteWebsiteSlug,
    WebsiteYoutubeConnect,
  ];
  const model = 'Website';
  if (loading) return <Spinner />;

  if (data?.permission?.Website) {
    return (
      <AdminGuard>
        <DashboardLayout menu={WebsiteMenu}>
          <Page title="Website">
            <Container>
              <TableContext.Provider
                value={{
                  permissionData: data?.permission,
                  schema: data?.permission.schema ?? {
                    models: [],
                    enums: [],
                  },
                  ...(rest as any),
                  lang: mergedLanguage,
                  ...defaultSettings,
                  query,
                  push,
                  pagesPath: '/admin/',
                }}
              >
                <EditRecord
                  enableBack={true}
                  ui={ui}
                  model={model}
                  update={data?.permission?.Website}
                  view={null}
                  onSave={() => {
                    // window.location.reload()
                  }}
                />
              </TableContext.Provider>
            </Container>
          </Page>
        </DashboardLayout>
      </AdminGuard>
    );
  }
  return null;
};

export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['admin', 'generated', 'validation'])),
    },
  };
};

export default Website;
