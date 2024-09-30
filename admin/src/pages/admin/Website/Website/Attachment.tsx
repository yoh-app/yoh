import ProductType from 'ui/Product/Forms/Type';
import ProductDescription from 'ui/Product/Forms/Description';
import ProductEvent from 'ui/Product/Forms/Event';
import ProductNft from 'ui/Product/Forms/Nft';
import ProductExternalNft from 'ui/Product/Forms/ExternalNft';
import ProductVariants from 'ui/Product/Forms/Variants';
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
import AttachmentBasic from 'ui/Attachment/Forms/Basic';
import AttachmentAttachment from 'ui/Attachment/Forms/Attachment';
import AttachmentAttachmentType from 'ui/Attachment/Forms/AttachmentType';
import AttachmentImage from 'ui/Attachment/Forms/Image';
import AttachmentPreview from 'ui/Attachment/Forms/Preview';
import ui from 'ui/Attachment';
import React from 'react';
import { PrismaTable } from 'admin';
import { useRouter } from 'next/router';
import BasicGrid from 'admin/custom/BasicGrid';
import BasicForm from 'admin/custom/BasicForm';
import BasicEditRecord from 'admin/custom/BasicEditRecord';
import AdminGuard from 'guards/AdminGuard';

import ProductUI from 'ui/Product';

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
      createTitleId: '_Admin.Website._PageGroup.Media._Page.Attachment._RelationModel.Attachment.Product._CreateTitle',

      createDescription: 'Product Create Description',
      createDescriptionId:
        '_Admin.Website._PageGroup.Media._Page.Attachment._RelationModel.Attachment.Product._CreateDescription',

      updateTitle: 'Product Update Title',
      updateTitleId: '_Admin.Website._PageGroup.Media._Page.Attachment._RelationModel.Attachment.Product._UpdateTitle',

      updateDescription: 'Product Update Description',
      updateDescriptionId:
        '_Admin.Website._PageGroup.Media._Page.Attachment._RelationModel.Attachment.Product._UpdateDescription',

      deleteTitle: 'Product Delete Title',
      deleteTitleId: '_Admin.Website._PageGroup.Media._Page.Attachment._RelationModel.Attachment.Product._DeleteTitle',

      deleteDescription: 'Product Delete Description',
      deleteDescriptionId:
        '_Admin.Website._PageGroup.Media._Page.Attachment._RelationModel.Attachment.Product._DeleteDescription',

      listTitle: 'Product List Title',
      listTitleId: '_Admin.Website._PageGroup.Media._Page.Attachment._RelationModel.Attachment.Product._ListTitle',

      listDescription: 'Product List Description',
      listDescriptionId:
        '_Admin.Website._PageGroup.Media._Page.Attachment._RelationModel.Attachment.Product._ListDescription',
    },
    forms: [
      ProductType,
      ProductDescription,
      ProductEvent,
      ProductNft,
      ProductExternalNft,
      ProductVariants,
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
};

ui.crudIntl = {
  createTitle: 'Attachment Create Title',
  createTitleId: '_Admin.Website._PageGroup.Media._Page.Attachment._CreateTitle',

  createDescription: 'Attachment Create Description',
  createDescriptionId: '_Admin.Website._PageGroup.Media._Page.Attachment._CreateDescription',

  updateTitle: 'Attachment Update Title',
  updateTitleId: '_Admin.Website._PageGroup.Media._Page.Attachment._UpdateTitle',

  updateDescription: 'Attachment Update Description',
  updateDescriptionId: '_Admin.Website._PageGroup.Media._Page.Attachment._UpdateDescription',

  deleteTitle: 'Attachment Delete Title',
  deleteTitleId: '_Admin.Website._PageGroup.Media._Page.Attachment._DeleteTitle',

  deleteDescription: 'Attachment Delete Description',
  deleteDescriptionId: '_Admin.Website._PageGroup.Media._Page.Attachment._DeleteDescription',

  listTitle: 'Attachment List Title',
  listTitleId: '_Admin.Website._PageGroup.Media._Page.Attachment._ListTitle',

  listDescription: 'Attachment List Description',
  listDescriptionId: '_Admin.Website._PageGroup.Media._Page.Attachment._ListDescription',
};

ui.forms = [AttachmentBasic, AttachmentAttachment, AttachmentAttachmentType, AttachmentImage, AttachmentPreview];

const AttachmentRoute: React.FC = () => {
  const router = useRouter();
  return (
    <AdminGuard>
      <DashboardLayout menu={WebsiteMenu}>
        <Page title="Attachment">
          <Container>
            <PrismaTable
              enableBack={true}
              ui={ui}
              pagesPath="/admin/Website/Website/"
              query={router.query}
              push={router.push}
              model="Attachment"
            ></PrismaTable>
          </Container>
        </Page>
      </DashboardLayout>
    </AdminGuard>
  );
};
export default AttachmentRoute;
export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['admin', 'generated', 'validation'])),
    },
  };
};
export const AttachmentUI = ui;
