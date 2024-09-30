import MarketingLocationDescription from 'ui/MarketingLocation/Forms/Description';
import MarketingLocationImage from 'ui/MarketingLocation/Forms/Image';
import MarketingLocationLocation from 'ui/MarketingLocation/Forms/Location';
import ui from 'ui/MarketingLocation';
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
ui.relationModels = {
  MarketingLocation: ui,
  MarketingLocation: ui,
};

ui.crudIntl = {
  createTitle: 'MarketingLocation Create Title',
  createTitleId: '_Admin.Website._PageGroup.MarketingLocation._Page.MarketingLocation._CreateTitle',

  createDescription: 'MarketingLocation Create Description',
  createDescriptionId: '_Admin.Website._PageGroup.MarketingLocation._Page.MarketingLocation._CreateDescription',

  updateTitle: 'MarketingLocation Update Title',
  updateTitleId: '_Admin.Website._PageGroup.MarketingLocation._Page.MarketingLocation._UpdateTitle',

  updateDescription: 'MarketingLocation Update Description',
  updateDescriptionId: '_Admin.Website._PageGroup.MarketingLocation._Page.MarketingLocation._UpdateDescription',

  deleteTitle: 'MarketingLocation Delete Title',
  deleteTitleId: '_Admin.Website._PageGroup.MarketingLocation._Page.MarketingLocation._DeleteTitle',

  deleteDescription: 'MarketingLocation Delete Description',
  deleteDescriptionId: '_Admin.Website._PageGroup.MarketingLocation._Page.MarketingLocation._DeleteDescription',

  listTitle: 'MarketingLocation List Title',
  listTitleId: '_Admin.Website._PageGroup.MarketingLocation._Page.MarketingLocation._ListTitle',

  listDescription: 'MarketingLocation List Description',
  listDescriptionId: '_Admin.Website._PageGroup.MarketingLocation._Page.MarketingLocation._ListDescription',
};

ui.forms = [MarketingLocationDescription, MarketingLocationImage, MarketingLocationLocation];

const MarketingLocationRoute: React.FC = () => {
  const router = useRouter();
  return (
    <AdminGuard>
      <DashboardLayout menu={WebsiteMenu}>
        <Page title="MarketingLocation">
          <Container>
            <PrismaTable
              enableBack={true}
              ui={ui}
              pagesPath="/admin/Website/Website/"
              query={router.query}
              push={router.push}
              model="MarketingLocation"
            ></PrismaTable>
          </Container>
        </Page>
      </DashboardLayout>
    </AdminGuard>
  );
};
export default MarketingLocationRoute;
export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['admin', 'generated', 'validation'])),
    },
  };
};
export const MarketingLocationUI = ui;
