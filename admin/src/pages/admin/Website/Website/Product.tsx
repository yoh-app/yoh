import VideoBasic from 'ui/Video/Forms/Basic';
import VideoExternal from 'ui/Video/Forms/External';
import VideoImage from 'ui/Video/Forms/Image';
import VideoPreview from 'ui/Video/Forms/Preview';
import VideoVideo from 'ui/Video/Forms/Video';
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
import ui from 'ui/Product';
import React from 'react';
import { PrismaTable } from 'admin';
import { useRouter } from 'next/router';
import BasicGrid from 'admin/custom/BasicGrid';
import BasicForm from 'admin/custom/BasicForm';
import BasicEditRecord from 'admin/custom/BasicEditRecord';
import AdminGuard from 'guards/AdminGuard';

import VideoUI from 'ui/Video';

import DashboardLayout from 'layouts/admin';
import { WebsiteMenu } from 'layouts/admin/menuItem';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Page from 'components/Page';
import { Container } from '@mui/material';

ui.customFilter = false;
ui.hasSearch = false;
ui.hideCreate = false;
ui.listStyle = 'grid';
ui.redirectUrl = false;
ui.extraWhere = null;
ui.relationModels = {
  Video: {
    ...VideoUI,
    customFilter: false,
    hasSearch: false,
    listStyle: 'list',
    link: null,
    readOnly: false,
    hideCreate: false,
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
      createTitle: 'Video Create Title',
      createTitleId:
        '_Admin.Website._PageGroup.Product Management._Page.Product._RelationModel.Product.Video._CreateTitle',

      createDescription: 'Video Create Description',
      createDescriptionId:
        '_Admin.Website._PageGroup.Product Management._Page.Product._RelationModel.Product.Video._CreateDescription',

      updateTitle: 'Video Update Title',
      updateTitleId:
        '_Admin.Website._PageGroup.Product Management._Page.Product._RelationModel.Product.Video._UpdateTitle',

      updateDescription: 'Video Update Description',
      updateDescriptionId:
        '_Admin.Website._PageGroup.Product Management._Page.Product._RelationModel.Product.Video._UpdateDescription',

      deleteTitle: 'Video Delete Title',
      deleteTitleId:
        '_Admin.Website._PageGroup.Product Management._Page.Product._RelationModel.Product.Video._DeleteTitle',

      deleteDescription: 'Video Delete Description',
      deleteDescriptionId:
        '_Admin.Website._PageGroup.Product Management._Page.Product._RelationModel.Product.Video._DeleteDescription',

      listTitle: 'Video List Title',
      listTitleId: '_Admin.Website._PageGroup.Product Management._Page.Product._RelationModel.Product.Video._ListTitle',

      listDescription: 'Video List Description',
      listDescriptionId:
        '_Admin.Website._PageGroup.Product Management._Page.Product._RelationModel.Product.Video._ListDescription',
    },
    forms: [VideoBasic, VideoExternal, VideoImage, VideoPreview, VideoVideo],
  },
};

ui.crudIntl = {
  createTitle: 'Product Create Title',
  createTitleId: '_Admin.Website._PageGroup.Product Management._Page.Product._CreateTitle',

  createDescription: 'Product Create Description',
  createDescriptionId: '_Admin.Website._PageGroup.Product Management._Page.Product._CreateDescription',

  updateTitle: 'Product Update Title',
  updateTitleId: '_Admin.Website._PageGroup.Product Management._Page.Product._UpdateTitle',

  updateDescription: 'Product Update Description',
  updateDescriptionId: '_Admin.Website._PageGroup.Product Management._Page.Product._UpdateDescription',

  deleteTitle: 'Product Delete Title',
  deleteTitleId: '_Admin.Website._PageGroup.Product Management._Page.Product._DeleteTitle',

  deleteDescription: 'Product Delete Description',
  deleteDescriptionId: '_Admin.Website._PageGroup.Product Management._Page.Product._DeleteDescription',

  listTitle: 'Product List Title',
  listTitleId: '_Admin.Website._PageGroup.Product Management._Page.Product._ListTitle',

  listDescription: 'Product List Description',
  listDescriptionId: '_Admin.Website._PageGroup.Product Management._Page.Product._ListDescription',
};

ui.forms = [
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
];

const ProductRoute: React.FC = () => {
  const router = useRouter();
  return (
    <AdminGuard>
      <DashboardLayout menu={WebsiteMenu}>
        <Page title="Product">
          <Container>
            <PrismaTable
              enableBack={true}
              ui={ui}
              pagesPath="/admin/Website/Website/"
              query={router.query}
              push={router.push}
              model="Product"
            ></PrismaTable>
          </Container>
        </Page>
      </DashboardLayout>
    </AdminGuard>
  );
};
export default ProductRoute;
export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['admin', 'generated', 'validation'])),
    },
  };
};
export const ProductUI = ui;
