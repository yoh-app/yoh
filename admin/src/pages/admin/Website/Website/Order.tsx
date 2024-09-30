import OrderedProductDescription from 'ui/OrderedProduct/Forms/Description';
import OrderedProductPrice from 'ui/OrderedProduct/Forms/Price';
import OrderedProductQuantity from 'ui/OrderedProduct/Forms/Quantity';
import OrderedProductTokenId from 'ui/OrderedProduct/Forms/TokenId';
import OrderTracking from 'ui/Order/Forms/Tracking';
import OrderAffiliate from 'ui/Order/Forms/Affiliate';
import OrderCoupon from 'ui/Order/Forms/Coupon';
import OrderCustomer from 'ui/Order/Forms/Customer';
import OrderPaymentType from 'ui/Order/Forms/PaymentType';
import OrderOrderTotal from 'ui/Order/Forms/OrderTotal';
import OrderTransaction from 'ui/Order/Forms/Transaction';
import ui from 'ui/Order';
import React from 'react';
import { PrismaTable } from 'admin';
import { useRouter } from 'next/router';
import BasicGrid from 'admin/custom/BasicGrid';
import BasicForm from 'admin/custom/BasicForm';
import BasicEditRecord from 'admin/custom/BasicEditRecord';
import AdminGuard from 'guards/AdminGuard';

import OrderedProductUI from 'ui/OrderedProduct';

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
ui.extraWhere = { paid: { equals: true } };
ui.relationModels = {
  OrderedProduct: {
    ...OrderedProductUI,
    customFilter: false,
    hasSearch: false,
    listStyle: 'grid',
    link: null,
    readOnly: false,
    hideCreate: true,
    hideConnect: false,
    list: false,
    redirectUrl: false,
    hideOn: null,
    disableOn: null,
    app: null,
    tableComponent: BasicGrid,
    createFormComponent: BasicForm,
    icon: null,
    extraWhere: null,
    crudIntl: {
      createTitle: 'OrderedProduct Create Title',
      createTitleId: '_Admin.Website._PageGroup.Order._Page.Order._RelationModel.Order.OrderedProduct._CreateTitle',

      createDescription: 'OrderedProduct Create Description',
      createDescriptionId:
        '_Admin.Website._PageGroup.Order._Page.Order._RelationModel.Order.OrderedProduct._CreateDescription',

      updateTitle: 'OrderedProduct Update Title',
      updateTitleId: '_Admin.Website._PageGroup.Order._Page.Order._RelationModel.Order.OrderedProduct._UpdateTitle',

      updateDescription: 'OrderedProduct Update Description',
      updateDescriptionId:
        '_Admin.Website._PageGroup.Order._Page.Order._RelationModel.Order.OrderedProduct._UpdateDescription',

      deleteTitle: 'OrderedProduct Delete Title',
      deleteTitleId: '_Admin.Website._PageGroup.Order._Page.Order._RelationModel.Order.OrderedProduct._DeleteTitle',

      deleteDescription: 'OrderedProduct Delete Description',
      deleteDescriptionId:
        '_Admin.Website._PageGroup.Order._Page.Order._RelationModel.Order.OrderedProduct._DeleteDescription',

      listTitle: 'OrderedProduct List Title',
      listTitleId: '_Admin.Website._PageGroup.Order._Page.Order._RelationModel.Order.OrderedProduct._ListTitle',

      listDescription: 'OrderedProduct List Description',
      listDescriptionId:
        '_Admin.Website._PageGroup.Order._Page.Order._RelationModel.Order.OrderedProduct._ListDescription',
    },
    forms: [OrderedProductDescription, OrderedProductPrice, OrderedProductQuantity, OrderedProductTokenId],
  },
};

ui.crudIntl = {
  createTitle: 'Order Create Title',
  createTitleId: '_Admin.Website._PageGroup.Order._Page.Order._CreateTitle',

  createDescription: 'Order Create Description',
  createDescriptionId: '_Admin.Website._PageGroup.Order._Page.Order._CreateDescription',

  updateTitle: 'Order Update Title',
  updateTitleId: '_Admin.Website._PageGroup.Order._Page.Order._UpdateTitle',

  updateDescription: 'Order Update Description',
  updateDescriptionId: '_Admin.Website._PageGroup.Order._Page.Order._UpdateDescription',

  deleteTitle: 'Order Delete Title',
  deleteTitleId: '_Admin.Website._PageGroup.Order._Page.Order._DeleteTitle',

  deleteDescription: 'Order Delete Description',
  deleteDescriptionId: '_Admin.Website._PageGroup.Order._Page.Order._DeleteDescription',

  listTitle: 'Order List Title',
  listTitleId: '_Admin.Website._PageGroup.Order._Page.Order._ListTitle',

  listDescription: 'Order List Description',
  listDescriptionId: '_Admin.Website._PageGroup.Order._Page.Order._ListDescription',
};

ui.forms = [
  OrderTracking,
  OrderAffiliate,
  OrderCoupon,
  OrderCustomer,
  OrderPaymentType,
  OrderOrderTotal,
  OrderTransaction,
];

const OrderRoute: React.FC = () => {
  const router = useRouter();
  return (
    <AdminGuard>
      <DashboardLayout menu={WebsiteMenu}>
        <Page title="Order">
          <Container>
            <PrismaTable
              enableBack={true}
              ui={ui}
              pagesPath="/admin/Website/Website/"
              query={router.query}
              push={router.push}
              model="Order"
            ></PrismaTable>
          </Container>
        </Page>
      </DashboardLayout>
    </AdminGuard>
  );
};
export default OrderRoute;
export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['admin', 'generated', 'validation'])),
    },
  };
};
export const OrderUI = ui;
