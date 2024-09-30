import AdvertisementAdvertisementStatus from 'ui/Advertisement/Forms/AdvertisementStatus';
import AdvertisementCustomer from 'ui/Advertisement/Forms/Customer';
import AdvertisementAdvertisementHiddenFields from 'ui/Advertisement/Forms/AdvertisementHiddenFields';
import AdvertisementMessage from 'ui/Advertisement/Forms/Message';
import AdvertisementAdverstisement from 'ui/Advertisement/Forms/Adverstisement';
import AdvertisementTransactionHash from 'ui/Advertisement/Forms/TransactionHash';
import ui from 'ui/Advertisement';
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
ui.hideCreate = true;
ui.listStyle = 'list';
ui.redirectUrl = false;
ui.extraWhere = null;
ui.relationModels = {};

ui.crudIntl = {
  createTitle: 'Advertisement Create Title',
  createTitleId: '_Admin.Website._PageGroup.Advertisement._Page.Advertisement._CreateTitle',

  createDescription: 'Advertisement Create Description',
  createDescriptionId: '_Admin.Website._PageGroup.Advertisement._Page.Advertisement._CreateDescription',

  updateTitle: 'Advertisement Update Title',
  updateTitleId: '_Admin.Website._PageGroup.Advertisement._Page.Advertisement._UpdateTitle',

  updateDescription: 'Advertisement Update Description',
  updateDescriptionId: '_Admin.Website._PageGroup.Advertisement._Page.Advertisement._UpdateDescription',

  deleteTitle: 'Advertisement Delete Title',
  deleteTitleId: '_Admin.Website._PageGroup.Advertisement._Page.Advertisement._DeleteTitle',

  deleteDescription: 'Advertisement Delete Description',
  deleteDescriptionId: '_Admin.Website._PageGroup.Advertisement._Page.Advertisement._DeleteDescription',

  listTitle: 'Advertisement List Title',
  listTitleId: '_Admin.Website._PageGroup.Advertisement._Page.Advertisement._ListTitle',

  listDescription: 'Advertisement List Description',
  listDescriptionId: '_Admin.Website._PageGroup.Advertisement._Page.Advertisement._ListDescription',
};

ui.forms = [
  AdvertisementAdvertisementStatus,
  AdvertisementCustomer,
  AdvertisementAdvertisementHiddenFields,
  AdvertisementMessage,
  AdvertisementAdverstisement,
  AdvertisementTransactionHash,
];

const AdvertisementRoute: React.FC = () => {
  const router = useRouter();
  return (
    <AdminGuard>
      <DashboardLayout menu={WebsiteMenu}>
        <Page title="Advertisement">
          <Container>
            <PrismaTable
              enableBack={true}
              ui={ui}
              pagesPath="/admin/Website/Website/"
              query={router.query}
              push={router.push}
              model="Advertisement"
            ></PrismaTable>
          </Container>
        </Page>
      </DashboardLayout>
    </AdminGuard>
  );
};
export default AdvertisementRoute;
export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['admin', 'generated', 'validation'])),
    },
  };
};
export const AdvertisementUI = ui;
