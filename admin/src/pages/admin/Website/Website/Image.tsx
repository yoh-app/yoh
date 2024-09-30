import ImageDescription from 'ui/Image/Forms/Description';
import ImageImage from 'ui/Image/Forms/Image';
import ui from 'ui/Image';
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
  createTitle: 'Image Create Title',
  createTitleId: '_Admin.Website._PageGroup.Product Management._Page.Image._CreateTitle',

  createDescription: 'Image Create Description',
  createDescriptionId: '_Admin.Website._PageGroup.Product Management._Page.Image._CreateDescription',

  updateTitle: 'Image Update Title',
  updateTitleId: '_Admin.Website._PageGroup.Product Management._Page.Image._UpdateTitle',

  updateDescription: 'Image Update Description',
  updateDescriptionId: '_Admin.Website._PageGroup.Product Management._Page.Image._UpdateDescription',

  deleteTitle: 'Image Delete Title',
  deleteTitleId: '_Admin.Website._PageGroup.Product Management._Page.Image._DeleteTitle',

  deleteDescription: 'Image Delete Description',
  deleteDescriptionId: '_Admin.Website._PageGroup.Product Management._Page.Image._DeleteDescription',

  listTitle: 'Image List Title',
  listTitleId: '_Admin.Website._PageGroup.Product Management._Page.Image._ListTitle',

  listDescription: 'Image List Description',
  listDescriptionId: '_Admin.Website._PageGroup.Product Management._Page.Image._ListDescription',
};

ui.forms = [ImageDescription, ImageImage];

const ImageRoute: React.FC = () => {
  const router = useRouter();
  return (
    <AdminGuard>
      <DashboardLayout menu={WebsiteMenu}>
        <Page>
          <Container>
            <PrismaTable
              ui={ui}
              pagesPath="/admin/Website/Website/"
              query={router.query}
              push={router.push}
              model="Image"
            ></PrismaTable>
          </Container>
        </Page>
      </DashboardLayout>
    </AdminGuard>
  );
};
export default ImageRoute;
export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['admin', 'generated', 'validation'])),
    },
  };
};
export const ImageUI = ui;
