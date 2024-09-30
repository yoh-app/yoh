import UserUserEmail from 'ui/User/Forms/UserEmail';
import React from 'react';
import { useRouter } from 'next/router';
import { UserMenu } from 'layouts/admin/menuItem';
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
import UserUI from 'ui/User';
import { usePermissionQuery } from 'generated';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import AdminGuard from 'guards/AdminGuard';

const User = ({ language, ...rest }) => {
  const { query, push } = useRouter();
  const { data, loading } = usePermissionQuery();
  const mergedLanguage = { ...defaultLanguage(), ...language };
  const ui = UserUI;

  ui.relationModels = {};

  ui.forms = [UserUserEmail];
  const model = 'User';
  if (loading) return <Spinner />;

  if (data?.permission?.User) {
    return (
      <AdminGuard>
        <DashboardLayout menu={UserMenu}>
          <Page title="User">
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
                  update={null}
                  view={data?.permission?.User}
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

export default User;
