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
import VideoCollectionDescription from 'ui/VideoCollection/Forms/Description';
import VideoBasic from 'ui/Video/Forms/Basic';
import VideoExternal from 'ui/Video/Forms/External';
import VideoImage from 'ui/Video/Forms/Image';
import VideoPreview from 'ui/Video/Forms/Preview';
import VideoVideo from 'ui/Video/Forms/Video';
import ui from 'ui/Video';
import React from 'react';
import { PrismaTable } from 'admin';
import { useRouter } from 'next/router';
import BasicGrid from 'admin/custom/BasicGrid';
import BasicForm from 'admin/custom/BasicForm';
import BasicEditRecord from 'admin/custom/BasicEditRecord';
import AdminGuard from 'guards/AdminGuard';

import ProductUI from 'ui/Product';
import VideoCollectionUI from 'ui/VideoCollection';

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
    hideOn: null,
    disableOn: null,
    app: null,
    tableComponent: BasicGrid,
    createFormComponent: BasicForm,
    icon: null,
    extraWhere: null,
    crudIntl: {
      createTitle: 'Product Create Title',
      createTitleId: '_Admin.Website._PageGroup.Media._Page.Video._RelationModel.Video.Product._CreateTitle',

      createDescription: 'Product Create Description',
      createDescriptionId:
        '_Admin.Website._PageGroup.Media._Page.Video._RelationModel.Video.Product._CreateDescription',

      updateTitle: 'Product Update Title',
      updateTitleId: '_Admin.Website._PageGroup.Media._Page.Video._RelationModel.Video.Product._UpdateTitle',

      updateDescription: 'Product Update Description',
      updateDescriptionId:
        '_Admin.Website._PageGroup.Media._Page.Video._RelationModel.Video.Product._UpdateDescription',

      deleteTitle: 'Product Delete Title',
      deleteTitleId: '_Admin.Website._PageGroup.Media._Page.Video._RelationModel.Video.Product._DeleteTitle',

      deleteDescription: 'Product Delete Description',
      deleteDescriptionId:
        '_Admin.Website._PageGroup.Media._Page.Video._RelationModel.Video.Product._DeleteDescription',

      listTitle: 'Product List Title',
      listTitleId: '_Admin.Website._PageGroup.Media._Page.Video._RelationModel.Video.Product._ListTitle',

      listDescription: 'Product List Description',
      listDescriptionId: '_Admin.Website._PageGroup.Media._Page.Video._RelationModel.Video.Product._ListDescription',
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
  VideoCollection: {
    ...VideoCollectionUI,
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
      createTitle: 'VideoCollection Create Title',
      createTitleId: '_Admin.Website._PageGroup.Media._Page.Video._RelationModel.Video.VideoCollection._CreateTitle',

      createDescription: 'VideoCollection Create Description',
      createDescriptionId:
        '_Admin.Website._PageGroup.Media._Page.Video._RelationModel.Video.VideoCollection._CreateDescription',

      updateTitle: 'VideoCollection Update Title',
      updateTitleId: '_Admin.Website._PageGroup.Media._Page.Video._RelationModel.Video.VideoCollection._UpdateTitle',

      updateDescription: 'VideoCollection Update Description',
      updateDescriptionId:
        '_Admin.Website._PageGroup.Media._Page.Video._RelationModel.Video.VideoCollection._UpdateDescription',

      deleteTitle: 'VideoCollection Delete Title',
      deleteTitleId: '_Admin.Website._PageGroup.Media._Page.Video._RelationModel.Video.VideoCollection._DeleteTitle',

      deleteDescription: 'VideoCollection Delete Description',
      deleteDescriptionId:
        '_Admin.Website._PageGroup.Media._Page.Video._RelationModel.Video.VideoCollection._DeleteDescription',

      listTitle: 'VideoCollection List Title',
      listTitleId: '_Admin.Website._PageGroup.Media._Page.Video._RelationModel.Video.VideoCollection._ListTitle',

      listDescription: 'VideoCollection List Description',
      listDescriptionId:
        '_Admin.Website._PageGroup.Media._Page.Video._RelationModel.Video.VideoCollection._ListDescription',
    },
    forms: [VideoCollectionDescription],
  },
};

ui.crudIntl = {
  createTitle: 'Video Create Title',
  createTitleId: '_Admin.Website._PageGroup.Media._Page.Video._CreateTitle',

  createDescription: 'Video Create Description',
  createDescriptionId: '_Admin.Website._PageGroup.Media._Page.Video._CreateDescription',

  updateTitle: 'Video Update Title',
  updateTitleId: '_Admin.Website._PageGroup.Media._Page.Video._UpdateTitle',

  updateDescription: 'Video Update Description',
  updateDescriptionId: '_Admin.Website._PageGroup.Media._Page.Video._UpdateDescription',

  deleteTitle: 'Video Delete Title',
  deleteTitleId: '_Admin.Website._PageGroup.Media._Page.Video._DeleteTitle',

  deleteDescription: 'Video Delete Description',
  deleteDescriptionId: '_Admin.Website._PageGroup.Media._Page.Video._DeleteDescription',

  listTitle: 'Video List Title',
  listTitleId: '_Admin.Website._PageGroup.Media._Page.Video._ListTitle',

  listDescription: 'Video List Description',
  listDescriptionId: '_Admin.Website._PageGroup.Media._Page.Video._ListDescription',
};

ui.forms = [VideoBasic, VideoExternal, VideoImage, VideoPreview, VideoVideo];

const VideoRoute: React.FC = () => {
  const router = useRouter();
  return (
    <AdminGuard>
      <DashboardLayout menu={WebsiteMenu}>
        <Page title="Video">
          <Container>
            <PrismaTable
              enableBack={true}
              ui={ui}
              pagesPath="/admin/Website/Website/"
              query={router.query}
              push={router.push}
              model="Video"
            ></PrismaTable>
          </Container>
        </Page>
      </DashboardLayout>
    </AdminGuard>
  );
};
export default VideoRoute;
export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['admin', 'generated', 'validation'])),
    },
  };
};
export const VideoUI = ui;
