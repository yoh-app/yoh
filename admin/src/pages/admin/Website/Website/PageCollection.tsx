import PageIsExternal from 'ui/Page/Forms/IsExternal';
import PageBasic from 'ui/Page/Forms/Basic';
import PageMenu from 'ui/Page/Forms/Menu';
import PageImage from 'ui/Page/Forms/Image';
import PageContent from 'ui/Page/Forms/Content';
import PagePageSlug from 'ui/Page/Forms/PageSlug';
import PagePassword from 'ui/Page/Forms/Password';
import PagePageHiddenFields from 'ui/Page/Forms/PageHiddenFields';
import PageCollectionDescription from 'ui/PageCollection/Forms/Description';
import ui from 'ui/PageCollection';
import React from 'react';
import { PrismaTable } from 'admin';
import { useRouter } from 'next/router';
import BasicGrid from 'admin/custom/BasicGrid';
import BasicForm from 'admin/custom/BasicForm';
import BasicEditRecord from 'admin/custom/BasicEditRecord';
import AdminGuard from 'guards/AdminGuard';

import PageUI from 'ui/Page';

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
  Page: {
    ...PageUI,
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
      createTitle: 'Page Create Title',
      createTitleId:
        '_Admin.Website._PageGroup.Editor._Page.PageCollection._RelationModel.PageCollection.Page._CreateTitle',

      createDescription: 'Page Create Description',
      createDescriptionId:
        '_Admin.Website._PageGroup.Editor._Page.PageCollection._RelationModel.PageCollection.Page._CreateDescription',

      updateTitle: 'Page Update Title',
      updateTitleId:
        '_Admin.Website._PageGroup.Editor._Page.PageCollection._RelationModel.PageCollection.Page._UpdateTitle',

      updateDescription: 'Page Update Description',
      updateDescriptionId:
        '_Admin.Website._PageGroup.Editor._Page.PageCollection._RelationModel.PageCollection.Page._UpdateDescription',

      deleteTitle: 'Page Delete Title',
      deleteTitleId:
        '_Admin.Website._PageGroup.Editor._Page.PageCollection._RelationModel.PageCollection.Page._DeleteTitle',

      deleteDescription: 'Page Delete Description',
      deleteDescriptionId:
        '_Admin.Website._PageGroup.Editor._Page.PageCollection._RelationModel.PageCollection.Page._DeleteDescription',

      listTitle: 'Page List Title',
      listTitleId:
        '_Admin.Website._PageGroup.Editor._Page.PageCollection._RelationModel.PageCollection.Page._ListTitle',

      listDescription: 'Page List Description',
      listDescriptionId:
        '_Admin.Website._PageGroup.Editor._Page.PageCollection._RelationModel.PageCollection.Page._ListDescription',
    },
    forms: [
      PageIsExternal,
      PageBasic,
      PageMenu,
      PageImage,
      PageContent,
      PagePageSlug,
      PagePassword,
      PagePageHiddenFields,
    ],
  },
};

ui.crudIntl = {
  createTitle: 'PageCollection Create Title',
  createTitleId: '_Admin.Website._PageGroup.Editor._Page.PageCollection._CreateTitle',

  createDescription: 'PageCollection Create Description',
  createDescriptionId: '_Admin.Website._PageGroup.Editor._Page.PageCollection._CreateDescription',

  updateTitle: 'PageCollection Update Title',
  updateTitleId: '_Admin.Website._PageGroup.Editor._Page.PageCollection._UpdateTitle',

  updateDescription: 'PageCollection Update Description',
  updateDescriptionId: '_Admin.Website._PageGroup.Editor._Page.PageCollection._UpdateDescription',

  deleteTitle: 'PageCollection Delete Title',
  deleteTitleId: '_Admin.Website._PageGroup.Editor._Page.PageCollection._DeleteTitle',

  deleteDescription: 'PageCollection Delete Description',
  deleteDescriptionId: '_Admin.Website._PageGroup.Editor._Page.PageCollection._DeleteDescription',

  listTitle: 'PageCollection List Title',
  listTitleId: '_Admin.Website._PageGroup.Editor._Page.PageCollection._ListTitle',

  listDescription: 'PageCollection List Description',
  listDescriptionId: '_Admin.Website._PageGroup.Editor._Page.PageCollection._ListDescription',
};

ui.forms = [PageCollectionDescription];

const PageCollectionRoute: React.FC = () => {
  const router = useRouter();
  return (
    <AdminGuard>
      <DashboardLayout menu={WebsiteMenu}>
        <Page title="PageCollection">
          <Container>
            <PrismaTable
              enableBack={true}
              ui={ui}
              pagesPath="/admin/Website/Website/"
              query={router.query}
              push={router.push}
              model="PageCollection"
            ></PrismaTable>
          </Container>
        </Page>
      </DashboardLayout>
    </AdminGuard>
  );
};
export default PageCollectionRoute;
export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['admin', 'generated', 'validation'])),
    },
  };
};
export const PageCollectionUI = ui;
