import OrderTracking from 'ui/Order/Forms/Tracking';
import OrderAffiliate from 'ui/Order/Forms/Affiliate';
import OrderCoupon from 'ui/Order/Forms/Coupon';
import OrderCustomer from 'ui/Order/Forms/Customer';
import OrderPaymentType from 'ui/Order/Forms/PaymentType';
import OrderOrderTotal from 'ui/Order/Forms/OrderTotal';
import OrderTransaction from 'ui/Order/Forms/Transaction';
import RequestRequestStatus from 'ui/Request/Forms/RequestStatus';
import RequestCustomer from 'ui/Request/Forms/Customer';
import RequestPage from 'ui/Request/Forms/Page';
import RequestVideo from 'ui/Request/Forms/Video';
import RequestMessage from 'ui/Request/Forms/Message';
import RequestPaymentType from 'ui/Request/Forms/PaymentType';
import RequestPrice from 'ui/Request/Forms/Price';
import RequestRequestHiddenFields from 'ui/Request/Forms/RequestHiddenFields';
import RequestAdverstisement from 'ui/Request/Forms/Adverstisement';
import RequestTransactionHash from 'ui/Request/Forms/TransactionHash';
import CustomerDescription from 'ui/Customer/Forms/Description';
import ui from 'ui/Customer';
import React from 'react';
import { PrismaTable } from 'admin';
import { useRouter } from 'next/router';
import BasicGrid from 'admin/custom/BasicGrid';
import BasicForm from 'admin/custom/BasicForm';
import BasicEditRecord from 'admin/custom/BasicEditRecord';
import AdminGuard from 'guards/AdminGuard';

import OrderUI from 'ui/Order';
import RequestUI from 'ui/Request';

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
ui.relationModels = {
  Order: {
    ...OrderUI,
    customFilter: false,
    hasSearch: false,
    listStyle: 'list',
    link: null,
    readOnly: false,
    hideCreate: true,
    hideConnect: true,
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
      createTitle: 'Order Create Title',
      createTitleId: '_Admin.Website._PageGroup.Customer._Page.Customer._RelationModel.Customer.Order._CreateTitle',

      createDescription: 'Order Create Description',
      createDescriptionId:
        '_Admin.Website._PageGroup.Customer._Page.Customer._RelationModel.Customer.Order._CreateDescription',

      updateTitle: 'Order Update Title',
      updateTitleId: '_Admin.Website._PageGroup.Customer._Page.Customer._RelationModel.Customer.Order._UpdateTitle',

      updateDescription: 'Order Update Description',
      updateDescriptionId:
        '_Admin.Website._PageGroup.Customer._Page.Customer._RelationModel.Customer.Order._UpdateDescription',

      deleteTitle: 'Order Delete Title',
      deleteTitleId: '_Admin.Website._PageGroup.Customer._Page.Customer._RelationModel.Customer.Order._DeleteTitle',

      deleteDescription: 'Order Delete Description',
      deleteDescriptionId:
        '_Admin.Website._PageGroup.Customer._Page.Customer._RelationModel.Customer.Order._DeleteDescription',

      listTitle: 'Order List Title',
      listTitleId: '_Admin.Website._PageGroup.Customer._Page.Customer._RelationModel.Customer.Order._ListTitle',

      listDescription: 'Order List Description',
      listDescriptionId:
        '_Admin.Website._PageGroup.Customer._Page.Customer._RelationModel.Customer.Order._ListDescription',
    },
    forms: [
      OrderTracking,
      OrderAffiliate,
      OrderCoupon,
      OrderCustomer,
      OrderPaymentType,
      OrderOrderTotal,
      OrderTransaction,
    ],
  },
  Request: {
    ...RequestUI,
    customFilter: false,
    hasSearch: false,
    listStyle: 'list',
    link: null,
    readOnly: false,
    hideCreate: true,
    hideConnect: true,
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
      createTitle: 'Request Create Title',
      createTitleId: '_Admin.Website._PageGroup.Customer._Page.Customer._RelationModel.Customer.Request._CreateTitle',

      createDescription: 'Request Create Description',
      createDescriptionId:
        '_Admin.Website._PageGroup.Customer._Page.Customer._RelationModel.Customer.Request._CreateDescription',

      updateTitle: 'Request Update Title',
      updateTitleId: '_Admin.Website._PageGroup.Customer._Page.Customer._RelationModel.Customer.Request._UpdateTitle',

      updateDescription: 'Request Update Description',
      updateDescriptionId:
        '_Admin.Website._PageGroup.Customer._Page.Customer._RelationModel.Customer.Request._UpdateDescription',

      deleteTitle: 'Request Delete Title',
      deleteTitleId: '_Admin.Website._PageGroup.Customer._Page.Customer._RelationModel.Customer.Request._DeleteTitle',

      deleteDescription: 'Request Delete Description',
      deleteDescriptionId:
        '_Admin.Website._PageGroup.Customer._Page.Customer._RelationModel.Customer.Request._DeleteDescription',

      listTitle: 'Request List Title',
      listTitleId: '_Admin.Website._PageGroup.Customer._Page.Customer._RelationModel.Customer.Request._ListTitle',

      listDescription: 'Request List Description',
      listDescriptionId:
        '_Admin.Website._PageGroup.Customer._Page.Customer._RelationModel.Customer.Request._ListDescription',
    },
    forms: [
      RequestRequestStatus,
      RequestCustomer,
      RequestPage,
      RequestVideo,
      RequestMessage,
      RequestPaymentType,
      RequestPrice,
      RequestRequestHiddenFields,
      RequestAdverstisement,
      RequestTransactionHash,
    ],
  },
};

ui.crudIntl = {
  createTitle: 'Customer Create Title',
  createTitleId: '_Admin.Website._PageGroup.Customer._Page.Customer._CreateTitle',

  createDescription: 'Customer Create Description',
  createDescriptionId: '_Admin.Website._PageGroup.Customer._Page.Customer._CreateDescription',

  updateTitle: 'Customer Update Title',
  updateTitleId: '_Admin.Website._PageGroup.Customer._Page.Customer._UpdateTitle',

  updateDescription: 'Customer Update Description',
  updateDescriptionId: '_Admin.Website._PageGroup.Customer._Page.Customer._UpdateDescription',

  deleteTitle: 'Customer Delete Title',
  deleteTitleId: '_Admin.Website._PageGroup.Customer._Page.Customer._DeleteTitle',

  deleteDescription: 'Customer Delete Description',
  deleteDescriptionId: '_Admin.Website._PageGroup.Customer._Page.Customer._DeleteDescription',

  listTitle: 'Customer List Title',
  listTitleId: '_Admin.Website._PageGroup.Customer._Page.Customer._ListTitle',

  listDescription: 'Customer List Description',
  listDescriptionId: '_Admin.Website._PageGroup.Customer._Page.Customer._ListDescription',
};

ui.forms = [CustomerDescription];

const CustomerRoute: React.FC = () => {
  const router = useRouter();
  return (
    <AdminGuard>
      <DashboardLayout menu={WebsiteMenu}>
        <Page title="Customer">
          <Container>
            <PrismaTable
              enableBack={true}
              ui={ui}
              pagesPath="/admin/Website/Website/"
              query={router.query}
              push={router.push}
              model="Customer"
            ></PrismaTable>
          </Container>
        </Page>
      </DashboardLayout>
    </AdminGuard>
  );
};
export default CustomerRoute;
export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['admin', 'generated', 'validation'])),
    },
  };
};
export const CustomerUI = ui;
