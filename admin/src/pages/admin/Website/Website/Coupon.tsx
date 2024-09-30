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
import CouponCouponType from 'ui/Coupon/Forms/CouponType';
import CouponDescription from 'ui/Coupon/Forms/Description';
import CouponTime from 'ui/Coupon/Forms/Time';
import CouponActive from 'ui/Coupon/Forms/Active';
import CouponCouponSlug from 'ui/Coupon/Forms/CouponSlug';
import ui from 'ui/Coupon';
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
ui.listStyle = 'grid';
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
      createTitle: 'Product Create Title',
      createTitleId:
        '_Admin.Website._PageGroup.Product Management._Page.Coupon._RelationModel.Coupon.Product._CreateTitle',

      createDescription: 'Product Create Description',
      createDescriptionId:
        '_Admin.Website._PageGroup.Product Management._Page.Coupon._RelationModel.Coupon.Product._CreateDescription',

      updateTitle: 'Product Update Title',
      updateTitleId:
        '_Admin.Website._PageGroup.Product Management._Page.Coupon._RelationModel.Coupon.Product._UpdateTitle',

      updateDescription: 'Product Update Description',
      updateDescriptionId:
        '_Admin.Website._PageGroup.Product Management._Page.Coupon._RelationModel.Coupon.Product._UpdateDescription',

      deleteTitle: 'Product Delete Title',
      deleteTitleId:
        '_Admin.Website._PageGroup.Product Management._Page.Coupon._RelationModel.Coupon.Product._DeleteTitle',

      deleteDescription: 'Product Delete Description',
      deleteDescriptionId:
        '_Admin.Website._PageGroup.Product Management._Page.Coupon._RelationModel.Coupon.Product._DeleteDescription',

      listTitle: 'Product List Title',
      listTitleId: '_Admin.Website._PageGroup.Product Management._Page.Coupon._RelationModel.Coupon.Product._ListTitle',

      listDescription: 'Product List Description',
      listDescriptionId:
        '_Admin.Website._PageGroup.Product Management._Page.Coupon._RelationModel.Coupon.Product._ListDescription',
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
};

ui.crudIntl = {
  createTitle: 'Coupon Create Title',
  createTitleId: '_Admin.Website._PageGroup.Product Management._Page.Coupon._CreateTitle',

  createDescription: 'Coupon Create Description',
  createDescriptionId: '_Admin.Website._PageGroup.Product Management._Page.Coupon._CreateDescription',

  updateTitle: 'Coupon Update Title',
  updateTitleId: '_Admin.Website._PageGroup.Product Management._Page.Coupon._UpdateTitle',

  updateDescription: 'Coupon Update Description',
  updateDescriptionId: '_Admin.Website._PageGroup.Product Management._Page.Coupon._UpdateDescription',

  deleteTitle: 'Coupon Delete Title',
  deleteTitleId: '_Admin.Website._PageGroup.Product Management._Page.Coupon._DeleteTitle',

  deleteDescription: 'Coupon Delete Description',
  deleteDescriptionId: '_Admin.Website._PageGroup.Product Management._Page.Coupon._DeleteDescription',

  listTitle: 'Coupon List Title',
  listTitleId: '_Admin.Website._PageGroup.Product Management._Page.Coupon._ListTitle',

  listDescription: 'Coupon List Description',
  listDescriptionId: '_Admin.Website._PageGroup.Product Management._Page.Coupon._ListDescription',
};

ui.forms = [CouponCouponType, CouponDescription, CouponTime, CouponActive, CouponCouponSlug];

const CouponRoute: React.FC = () => {
  const router = useRouter();
  return (
    <AdminGuard>
      <DashboardLayout menu={WebsiteMenu}>
        <Page title="Coupon">
          <Container>
            <PrismaTable
              enableBack={true}
              ui={ui}
              pagesPath="/admin/Website/Website/"
              query={router.query}
              push={router.push}
              model="Coupon"
            ></PrismaTable>
          </Container>
        </Page>
      </DashboardLayout>
    </AdminGuard>
  );
};
export default CouponRoute;
export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['admin', 'generated', 'validation'])),
    },
  };
};
export const CouponUI = ui;
