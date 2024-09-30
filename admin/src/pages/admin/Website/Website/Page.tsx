import ProductDescription from 'ui/Product/Forms/Description';
import ProductNft from 'ui/Product/Forms/Nft';
import ProductExternalUrl from 'ui/Product/Forms/ExternalUrl';
import ProductPrice from 'ui/Product/Forms/Price';
import ProductQuantity from 'ui/Product/Forms/Quantity';
import ProductRoyalty from 'ui/Product/Forms/Royalty';
import ProductCommission from 'ui/Product/Forms/Commission';
import ProductImage from 'ui/Product/Forms/Image';
import ProductGallery from 'ui/Product/Forms/Gallery';
import ProductActive from 'ui/Product/Forms/Active';
import ProductNftInformation from 'ui/Product/Forms/NftInformation';
import ProductProductSlug from 'ui/Product/Forms/ProductSlug';
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
import PageIsExternal from 'ui/Page/Forms/IsExternal';
import PageBasic from 'ui/Page/Forms/Basic';
import PageMenu from 'ui/Page/Forms/Menu';
import PageImage from 'ui/Page/Forms/Image';
import PageContent from 'ui/Page/Forms/Content';
import PagePageSlug from 'ui/Page/Forms/PageSlug';
import PagePassword from 'ui/Page/Forms/Password';
import PagePageHiddenFields from 'ui/Page/Forms/PageHiddenFields';
import ui from 'ui/Page';
import React from 'react';
import { PrismaTable } from 'admin';
import { useRouter } from 'next/router';
import BasicGrid from 'admin/custom/BasicGrid';
import BasicForm from 'admin/custom/BasicForm';
import BasicEditRecord from 'admin/custom/BasicEditRecord';
import AdminGuard from 'guards/AdminGuard';

import ProductUI from 'ui/Product';
import RequestUI from 'ui/Request';

import DashboardLayout from 'layouts/admin';
import { WebsiteMenu } from 'layouts/admin/menuItem';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Page from 'components/Page';
import { Container } from '@mui/material';

ui.customFilter = false;
ui.hasSearch = false;
ui.hideCreate = false;
ui.listStyle = null;
ui.redirectUrl = false;
ui.extraWhere = null;
ui.relationModels = {
  Product: {
    ...ProductUI,
    customFilter: false,
    hasSearch: false,
    listStyle: 'grid',
    link: null,
    readOnly: false,
    hideCreate: true,
    hideConnect: false,
    list: false,
    redirectUrl: false,
    hideOn: {
      or: [
        { field: { name: 'isExternalLink', operator: '===', value: true } },
        { field: { name: 'isIndex', operator: '===', value: true } },
      ],
    },
    disableOn: null,
    app: null,
    tableComponent: BasicGrid,
    createFormComponent: BasicForm,
    icon: null,
    extraWhere: null,
    crudIntl: {
      createTitle: 'Product Create Title',
      createTitleId: '_Admin.Website._PageGroup.Media._Page.Page._RelationModel.Page.Product._CreateTitle',

      createDescription: 'Product Create Description',
      createDescriptionId: '_Admin.Website._PageGroup.Media._Page.Page._RelationModel.Page.Product._CreateDescription',

      updateTitle: 'Product Update Title',
      updateTitleId: '_Admin.Website._PageGroup.Media._Page.Page._RelationModel.Page.Product._UpdateTitle',

      updateDescription: 'Product Update Description',
      updateDescriptionId: '_Admin.Website._PageGroup.Media._Page.Page._RelationModel.Page.Product._UpdateDescription',

      deleteTitle: 'Product Delete Title',
      deleteTitleId: '_Admin.Website._PageGroup.Media._Page.Page._RelationModel.Page.Product._DeleteTitle',

      deleteDescription: 'Product Delete Description',
      deleteDescriptionId: '_Admin.Website._PageGroup.Media._Page.Page._RelationModel.Page.Product._DeleteDescription',

      listTitle: 'Product List Title',
      listTitleId: '_Admin.Website._PageGroup.Media._Page.Page._RelationModel.Page.Product._ListTitle',

      listDescription: 'Product List Description',
      listDescriptionId: '_Admin.Website._PageGroup.Media._Page.Page._RelationModel.Page.Product._ListDescription',
    },
    forms: [
      ProductDescription,
      ProductNft,
      ProductExternalUrl,
      ProductPrice,
      ProductQuantity,
      ProductRoyalty,
      ProductCommission,
      ProductImage,
      ProductGallery,
      ProductActive,
      ProductNftInformation,
      ProductProductSlug,
    ],
  },
  Request: {
    ...RequestUI,
    customFilter: false,
    hasSearch: false,
    listStyle: 'grid',
    link: null,
    readOnly: false,
    hideCreate: true,
    hideConnect: true,
    list: false,
    redirectUrl: false,
    hideOn: { field: { name: 'isExternalLink', operator: '===', value: true } },
    disableOn: null,
    app: null,
    tableComponent: BasicGrid,
    createFormComponent: BasicForm,
    icon: null,
    extraWhere: null,
    crudIntl: {
      createTitle: 'Request Create Title',
      createTitleId: '_Admin.Website._PageGroup.Media._Page.Page._RelationModel.Page.Request._CreateTitle',

      createDescription: 'Request Create Description',
      createDescriptionId: '_Admin.Website._PageGroup.Media._Page.Page._RelationModel.Page.Request._CreateDescription',

      updateTitle: 'Request Update Title',
      updateTitleId: '_Admin.Website._PageGroup.Media._Page.Page._RelationModel.Page.Request._UpdateTitle',

      updateDescription: 'Request Update Description',
      updateDescriptionId: '_Admin.Website._PageGroup.Media._Page.Page._RelationModel.Page.Request._UpdateDescription',

      deleteTitle: 'Request Delete Title',
      deleteTitleId: '_Admin.Website._PageGroup.Media._Page.Page._RelationModel.Page.Request._DeleteTitle',

      deleteDescription: 'Request Delete Description',
      deleteDescriptionId: '_Admin.Website._PageGroup.Media._Page.Page._RelationModel.Page.Request._DeleteDescription',

      listTitle: 'Request List Title',
      listTitleId: '_Admin.Website._PageGroup.Media._Page.Page._RelationModel.Page.Request._ListTitle',

      listDescription: 'Request List Description',
      listDescriptionId: '_Admin.Website._PageGroup.Media._Page.Page._RelationModel.Page.Request._ListDescription',
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
  createTitle: 'Page Create Title',
  createTitleId: '_Admin.Website._PageGroup.Media._Page.Page._CreateTitle',

  createDescription: 'Page Create Description',
  createDescriptionId: '_Admin.Website._PageGroup.Media._Page.Page._CreateDescription',

  updateTitle: 'Page Update Title',
  updateTitleId: '_Admin.Website._PageGroup.Media._Page.Page._UpdateTitle',

  updateDescription: 'Page Update Description',
  updateDescriptionId: '_Admin.Website._PageGroup.Media._Page.Page._UpdateDescription',

  deleteTitle: 'Page Delete Title',
  deleteTitleId: '_Admin.Website._PageGroup.Media._Page.Page._DeleteTitle',

  deleteDescription: 'Page Delete Description',
  deleteDescriptionId: '_Admin.Website._PageGroup.Media._Page.Page._DeleteDescription',

  listTitle: 'Page List Title',
  listTitleId: '_Admin.Website._PageGroup.Media._Page.Page._ListTitle',

  listDescription: 'Page List Description',
  listDescriptionId: '_Admin.Website._PageGroup.Media._Page.Page._ListDescription',
};

ui.forms = [
  PageIsExternal,
  PageBasic,
  PageMenu,
  PageImage,
  PageContent,
  PagePageSlug,
  PagePassword,
  PagePageHiddenFields,
];

const PageRoute: React.FC = () => {
  const router = useRouter();
  return (
    <AdminGuard>
      <DashboardLayout menu={WebsiteMenu}>
        <Page title="Page">
          <Container>
            <PrismaTable
              enableBack={true}
              ui={ui}
              pagesPath="/admin/Website/Website/"
              query={router.query}
              push={router.push}
              model="Page"
            ></PrismaTable>
          </Container>
        </Page>
      </DashboardLayout>
    </AdminGuard>
  );
};
export default PageRoute;
export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['admin', 'generated', 'validation'])),
    },
  };
};
export const PageUI = ui;
