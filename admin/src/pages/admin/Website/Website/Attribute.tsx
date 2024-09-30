import AttributeDescription from 'ui/Attribute/Forms/Description';
import AttributeValues from 'ui/Attribute/Forms/Values';
import ui from 'ui/Attribute';
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
ui.hideCreate = false;
ui.listStyle = 'list';
ui.redirectUrl = false;
ui.extraWhere = null;
ui.relationModels = {};

ui.crudIntl = {
  createTitle: 'Attribute Create Title',
  createTitleId: '_Admin.Website._PageGroup.Product Management._Page.Attribute._CreateTitle',

  createDescription: 'Attribute Create Description',
  createDescriptionId: '_Admin.Website._PageGroup.Product Management._Page.Attribute._CreateDescription',

  updateTitle: 'Attribute Update Title',
  updateTitleId: '_Admin.Website._PageGroup.Product Management._Page.Attribute._UpdateTitle',

  updateDescription: 'Attribute Update Description',
  updateDescriptionId: '_Admin.Website._PageGroup.Product Management._Page.Attribute._UpdateDescription',

  deleteTitle: 'Attribute Delete Title',
  deleteTitleId: '_Admin.Website._PageGroup.Product Management._Page.Attribute._DeleteTitle',

  deleteDescription: 'Attribute Delete Description',
  deleteDescriptionId: '_Admin.Website._PageGroup.Product Management._Page.Attribute._DeleteDescription',

  listTitle: 'Attribute List Title',
  listTitleId: '_Admin.Website._PageGroup.Product Management._Page.Attribute._ListTitle',

  listDescription: 'Attribute List Description',
  listDescriptionId: '_Admin.Website._PageGroup.Product Management._Page.Attribute._ListDescription',
};

ui.forms = [AttributeDescription, AttributeValues];

const AttributeRoute: React.FC = () => {
  const router = useRouter();
  return (
    <AdminGuard>
      <DashboardLayout menu={WebsiteMenu}>
        <Page title="Attribute">
          <Container>
            <PrismaTable
              enableBack={true}
              ui={ui}
              pagesPath="/admin/Website/Website/"
              query={router.query}
              push={router.push}
              model="Attribute"
            ></PrismaTable>
          </Container>
        </Page>
      </DashboardLayout>
    </AdminGuard>
  );
};
export default AttributeRoute;
export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['admin', 'generated', 'validation'])),
    },
  };
};
export const AttributeUI = ui;
