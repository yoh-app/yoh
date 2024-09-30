import AffiliateAccepted from 'ui/Affiliate/Forms/Accepted';
import AffiliateCustomer from 'ui/Affiliate/Forms/Customer';
import AffiliateDescription from 'ui/Affiliate/Forms/Description';
import AffiliateSocial from 'ui/Affiliate/Forms/Social';
import AffiliateWalletAddress from 'ui/Affiliate/Forms/WalletAddress';
import ui from 'ui/Affiliate';
import React from 'react';
import { PrismaTable } from 'admin';
import { useRouter } from 'next/router';
import BasicGrid from 'admin/custom/BasicGrid';
import BasicForm from 'admin/custom/BasicForm';
import BasicEditRecord from 'admin/custom/BasicEditRecord';
import AdminGuard from 'guards/AdminGuard';

import DashboardLayout from 'layouts/admin';
import { WebsiteMenu } from 'layouts/admin/menuItem';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Page from 'components/Page';
import { Container } from '@mui/material';

ui.customFilter = false;
ui.hasSearch = false;
ui.hideCreate = false;
ui.listStyle = 'list';
ui.redirectUrl = false;
ui.extraWhere = null;
ui.relationModels = {};

ui.crudIntl = {
  createTitle: 'Affiliate Create Title',
  createTitleId: '_Admin.Website._PageGroup.Request._Page.Affiliate._CreateTitle',

  createDescription: 'Affiliate Create Description',
  createDescriptionId: '_Admin.Website._PageGroup.Request._Page.Affiliate._CreateDescription',

  updateTitle: 'Affiliate Update Title',
  updateTitleId: '_Admin.Website._PageGroup.Request._Page.Affiliate._UpdateTitle',

  updateDescription: 'Affiliate Update Description',
  updateDescriptionId: '_Admin.Website._PageGroup.Request._Page.Affiliate._UpdateDescription',

  deleteTitle: 'Affiliate Delete Title',
  deleteTitleId: '_Admin.Website._PageGroup.Request._Page.Affiliate._DeleteTitle',

  deleteDescription: 'Affiliate Delete Description',
  deleteDescriptionId: '_Admin.Website._PageGroup.Request._Page.Affiliate._DeleteDescription',

  listTitle: 'Affiliate List Title',
  listTitleId: '_Admin.Website._PageGroup.Request._Page.Affiliate._ListTitle',

  listDescription: 'Affiliate List Description',
  listDescriptionId: '_Admin.Website._PageGroup.Request._Page.Affiliate._ListDescription',
};

ui.forms = [AffiliateAccepted, AffiliateCustomer, AffiliateDescription, AffiliateSocial, AffiliateWalletAddress];

const AffiliateRoute: React.FC = () => {
  const router = useRouter();
  return (
    <AdminGuard>
      <DashboardLayout menu={WebsiteMenu}>
        <Page title="Affiliate">
          <Container>
            <PrismaTable
              enableBack={true}
              ui={ui}
              pagesPath="/admin/Website/Website/"
              query={router.query}
              push={router.push}
              model="Affiliate"
            ></PrismaTable>
          </Container>
        </Page>
      </DashboardLayout>
    </AdminGuard>
  );
};
export default AffiliateRoute;
export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['admin', 'generated', 'validation'])),
    },
  };
};
export const AffiliateUI = ui;
