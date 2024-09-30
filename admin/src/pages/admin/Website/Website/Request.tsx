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
import ui from 'ui/Request';
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
  createTitle: 'Request Create Title',
  createTitleId: '_Admin.Website._PageGroup.Request._Page.Request._CreateTitle',

  createDescription: 'Request Create Description',
  createDescriptionId: '_Admin.Website._PageGroup.Request._Page.Request._CreateDescription',

  updateTitle: 'Request Update Title',
  updateTitleId: '_Admin.Website._PageGroup.Request._Page.Request._UpdateTitle',

  updateDescription: 'Request Update Description',
  updateDescriptionId: '_Admin.Website._PageGroup.Request._Page.Request._UpdateDescription',

  deleteTitle: 'Request Delete Title',
  deleteTitleId: '_Admin.Website._PageGroup.Request._Page.Request._DeleteTitle',

  deleteDescription: 'Request Delete Description',
  deleteDescriptionId: '_Admin.Website._PageGroup.Request._Page.Request._DeleteDescription',

  listTitle: 'Request List Title',
  listTitleId: '_Admin.Website._PageGroup.Request._Page.Request._ListTitle',

  listDescription: 'Request List Description',
  listDescriptionId: '_Admin.Website._PageGroup.Request._Page.Request._ListDescription',
};

ui.forms = [
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
];

const RequestRoute: React.FC = () => {
  const router = useRouter();
  return (
    <AdminGuard>
      <DashboardLayout menu={WebsiteMenu}>
        <Page title="Request">
          <Container>
            <PrismaTable
              enableBack={true}
              ui={ui}
              pagesPath="/admin/Website/Website/"
              query={router.query}
              push={router.push}
              model="Request"
            ></PrismaTable>
          </Container>
        </Page>
      </DashboardLayout>
    </AdminGuard>
  );
};
export default RequestRoute;
export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['admin', 'generated', 'validation'])),
    },
  };
};
export const RequestUI = ui;
