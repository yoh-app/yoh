import WebsiteDescription from 'ui/Website/Forms/Description';
import WebsiteLogo from 'ui/Website/Forms/Logo';
import WebsiteWalletAndChain from 'ui/Website/Forms/WalletAndChain';
import WebsiteSettings from 'ui/Website/Forms/Settings';
import WebsiteGasless from 'ui/Website/Forms/Gasless';
import WebsiteStripeAccount from 'ui/Website/Forms/StripeAccount';
import WebsiteActive from 'ui/Website/Forms/Active';
import WebsiteWebsiteSlug from 'ui/Website/Forms/WebsiteSlug';
import WebsiteYoutubeConnect from 'ui/Website/Forms/YoutubeConnect';
import ui from 'ui/Website';
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
ui.listStyle = 'grid';
ui.redirectUrl = false;
ui.extraWhere = null;
ui.relationModels = {};

ui.crudIntl = {
  createTitle: 'Website Create Title',
  createTitleId: '_Admin.User._PageGroup.Website._Page.Website._CreateTitle',

  createDescription: 'Website Create Description',
  createDescriptionId: '_Admin.User._PageGroup.Website._Page.Website._CreateDescription',

  updateTitle: 'Website Update Title',
  updateTitleId: '_Admin.User._PageGroup.Website._Page.Website._UpdateTitle',

  updateDescription: 'Website Update Description',
  updateDescriptionId: '_Admin.User._PageGroup.Website._Page.Website._UpdateDescription',

  deleteTitle: 'Website Delete Title',
  deleteTitleId: '_Admin.User._PageGroup.Website._Page.Website._DeleteTitle',

  deleteDescription: 'Website Delete Description',
  deleteDescriptionId: '_Admin.User._PageGroup.Website._Page.Website._DeleteDescription',

  listTitle: 'Website List Title',
  listTitleId: '_Admin.User._PageGroup.Website._Page.Website._ListTitle',

  listDescription: 'Website List Description',
  listDescriptionId: '_Admin.User._PageGroup.Website._Page.Website._ListDescription',
};

ui.forms = [
  WebsiteDescription,
  WebsiteLogo,
  WebsiteWalletAndChain,
  WebsiteSettings,
  WebsiteGasless,
  WebsiteStripeAccount,
  WebsiteActive,
  WebsiteWebsiteSlug,
  WebsiteYoutubeConnect,
];

const WebsiteRoute: React.FC = () => {
  const router = useRouter();
  return (
    <AdminGuard>
      <DashboardLayout menu={UserMenu}>
        <Page title="Website">
          <Container>
            <PrismaTable
              enableBack={true}
              ui={ui}
              pagesPath="/admin/User/Website/"
              query={router.query}
              push={router.push}
              model="Website"
            ></PrismaTable>
          </Container>
        </Page>
      </DashboardLayout>
    </AdminGuard>
  );
};
export default WebsiteRoute;
export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['admin', 'generated', 'validation'])),
    },
  };
};
export const WebsiteUI = ui;
