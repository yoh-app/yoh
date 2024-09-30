import OrderedProductDescription from 'ui/OrderedProduct/Forms/Description';
import OrderedProductPrice from 'ui/OrderedProduct/Forms/Price';
import OrderedProductQuantity from 'ui/OrderedProduct/Forms/Quantity';
import OrderedProductTokenId from 'ui/OrderedProduct/Forms/TokenId';
import ui from 'ui/OrderedProduct';
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
ui.listStyle = 'grid';
ui.redirectUrl = false;
ui.extraWhere = null;
ui.relationModels = {};

ui.crudIntl = {
  createTitle: 'OrderedProduct Create Title',
  createTitleId: '_Admin.Website._PageGroup.Order._Page.OrderedProduct._CreateTitle',

  createDescription: 'OrderedProduct Create Description',
  createDescriptionId: '_Admin.Website._PageGroup.Order._Page.OrderedProduct._CreateDescription',

  updateTitle: 'OrderedProduct Update Title',
  updateTitleId: '_Admin.Website._PageGroup.Order._Page.OrderedProduct._UpdateTitle',

  updateDescription: 'OrderedProduct Update Description',
  updateDescriptionId: '_Admin.Website._PageGroup.Order._Page.OrderedProduct._UpdateDescription',

  deleteTitle: 'OrderedProduct Delete Title',
  deleteTitleId: '_Admin.Website._PageGroup.Order._Page.OrderedProduct._DeleteTitle',

  deleteDescription: 'OrderedProduct Delete Description',
  deleteDescriptionId: '_Admin.Website._PageGroup.Order._Page.OrderedProduct._DeleteDescription',

  listTitle: 'OrderedProduct List Title',
  listTitleId: '_Admin.Website._PageGroup.Order._Page.OrderedProduct._ListTitle',

  listDescription: 'OrderedProduct List Description',
  listDescriptionId: '_Admin.Website._PageGroup.Order._Page.OrderedProduct._ListDescription',
};

ui.forms = [OrderedProductDescription, OrderedProductPrice, OrderedProductQuantity, OrderedProductTokenId];

const OrderedProductRoute: React.FC = () => {
  const router = useRouter();
  return (
    <AdminGuard>
      <DashboardLayout menu={WebsiteMenu}>
        <Page title="OrderedProduct">
          <Container>
            <PrismaTable
              enableBack={true}
              ui={ui}
              pagesPath="/admin/Website/Website/"
              query={router.query}
              push={router.push}
              model="OrderedProduct"
            ></PrismaTable>
          </Container>
        </Page>
      </DashboardLayout>
    </AdminGuard>
  );
};
export default OrderedProductRoute;
export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['admin', 'generated', 'validation'])),
    },
  };
};
export const OrderedProductUI = ui;
