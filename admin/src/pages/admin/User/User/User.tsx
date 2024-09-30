import UserUserEmail from 'ui/User/Forms/UserEmail';
import ui from 'ui/User';
import React from 'react';
import { PrismaTable } from 'admin';
import { useRouter } from 'next/router';
import BasicGrid from 'admin/custom/BasicGrid';
import BasicForm from 'admin/custom/BasicForm';
import BasicEditRecord from 'admin/custom/BasicEditRecord';
import AdminGuard from 'guards/AdminGuard';

import DashboardLayout from 'layouts/admin';
import { UserMenu } from 'layouts/admin/menuItem';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Page from 'components/Page';
import { Container } from '@mui/material';

ui.customFilter = false;
ui.hasSearch = false;
ui.hideCreate = false;
ui.listStyle = null;
ui.redirectUrl = false;
ui.extraWhere = null;
ui.relationModels = {};

ui.crudIntl = {
  createTitle: 'User Create Title',
  createTitleId: '_Admin.User._PageGroup.User._Page.User._CreateTitle',

  createDescription: 'User Create Description',
  createDescriptionId: '_Admin.User._PageGroup.User._Page.User._CreateDescription',

  updateTitle: 'User Update Title',
  updateTitleId: '_Admin.User._PageGroup.User._Page.User._UpdateTitle',

  updateDescription: 'User Update Description',
  updateDescriptionId: '_Admin.User._PageGroup.User._Page.User._UpdateDescription',

  deleteTitle: 'User Delete Title',
  deleteTitleId: '_Admin.User._PageGroup.User._Page.User._DeleteTitle',

  deleteDescription: 'User Delete Description',
  deleteDescriptionId: '_Admin.User._PageGroup.User._Page.User._DeleteDescription',

  listTitle: 'User List Title',
  listTitleId: '_Admin.User._PageGroup.User._Page.User._ListTitle',

  listDescription: 'User List Description',
  listDescriptionId: '_Admin.User._PageGroup.User._Page.User._ListDescription',
};

ui.forms = [UserUserEmail];

const UserRoute: React.FC = () => {
  const router = useRouter();
  return (
    <AdminGuard>
      <DashboardLayout menu={UserMenu}>
        <Page title="User">
          <Container>
            <PrismaTable
              enableBack={true}
              ui={ui}
              pagesPath="/admin/User/User/"
              query={router.query}
              push={router.push}
              model="User"
            ></PrismaTable>
          </Container>
        </Page>
      </DashboardLayout>
    </AdminGuard>
  );
};
export default UserRoute;
export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['admin', 'generated', 'validation'])),
    },
  };
};
export const UserUI = ui;
