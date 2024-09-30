import VideoBasic from 'ui/Video/Forms/Basic';
import VideoExternal from 'ui/Video/Forms/External';
import VideoImage from 'ui/Video/Forms/Image';
import VideoPreview from 'ui/Video/Forms/Preview';
import VideoVideo from 'ui/Video/Forms/Video';
import VideoCollectionDescription from 'ui/VideoCollection/Forms/Description';
import ui from 'ui/VideoCollection';
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
ui.listStyle = null;
ui.redirectUrl = false;
ui.extraWhere = null;
ui.relationModels = {
  Video: {
    ...VideoUI,
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
      createTitle: 'Video Create Title',
      createTitleId:
        '_Admin.Website._PageGroup.Editor._Page.VideoCollection._RelationModel.VideoCollection.Video._CreateTitle',

      createDescription: 'Video Create Description',
      createDescriptionId:
        '_Admin.Website._PageGroup.Editor._Page.VideoCollection._RelationModel.VideoCollection.Video._CreateDescription',

      updateTitle: 'Video Update Title',
      updateTitleId:
        '_Admin.Website._PageGroup.Editor._Page.VideoCollection._RelationModel.VideoCollection.Video._UpdateTitle',

      updateDescription: 'Video Update Description',
      updateDescriptionId:
        '_Admin.Website._PageGroup.Editor._Page.VideoCollection._RelationModel.VideoCollection.Video._UpdateDescription',

      deleteTitle: 'Video Delete Title',
      deleteTitleId:
        '_Admin.Website._PageGroup.Editor._Page.VideoCollection._RelationModel.VideoCollection.Video._DeleteTitle',

      deleteDescription: 'Video Delete Description',
      deleteDescriptionId:
        '_Admin.Website._PageGroup.Editor._Page.VideoCollection._RelationModel.VideoCollection.Video._DeleteDescription',

      listTitle: 'Video List Title',
      listTitleId:
        '_Admin.Website._PageGroup.Editor._Page.VideoCollection._RelationModel.VideoCollection.Video._ListTitle',

      listDescription: 'Video List Description',
      listDescriptionId:
        '_Admin.Website._PageGroup.Editor._Page.VideoCollection._RelationModel.VideoCollection.Video._ListDescription',
    },
    forms: [VideoBasic, VideoExternal, VideoImage, VideoPreview, VideoVideo],
  },
};

ui.crudIntl = {
  createTitle: 'VideoCollection Create Title',
  createTitleId: '_Admin.Website._PageGroup.Editor._Page.VideoCollection._CreateTitle',

  createDescription: 'VideoCollection Create Description',
  createDescriptionId: '_Admin.Website._PageGroup.Editor._Page.VideoCollection._CreateDescription',

  updateTitle: 'VideoCollection Update Title',
  updateTitleId: '_Admin.Website._PageGroup.Editor._Page.VideoCollection._UpdateTitle',

  updateDescription: 'VideoCollection Update Description',
  updateDescriptionId: '_Admin.Website._PageGroup.Editor._Page.VideoCollection._UpdateDescription',

  deleteTitle: 'VideoCollection Delete Title',
  deleteTitleId: '_Admin.Website._PageGroup.Editor._Page.VideoCollection._DeleteTitle',

  deleteDescription: 'VideoCollection Delete Description',
  deleteDescriptionId: '_Admin.Website._PageGroup.Editor._Page.VideoCollection._DeleteDescription',

  listTitle: 'VideoCollection List Title',
  listTitleId: '_Admin.Website._PageGroup.Editor._Page.VideoCollection._ListTitle',

  listDescription: 'VideoCollection List Description',
  listDescriptionId: '_Admin.Website._PageGroup.Editor._Page.VideoCollection._ListDescription',
};

ui.forms = [VideoCollectionDescription];

const VideoCollectionRoute: React.FC = () => {
  const router = useRouter();
  return (
    <AdminGuard>
      <DashboardLayout menu={WebsiteMenu}>
        <Page title="VideoCollection">
          <Container>
            <PrismaTable
              enableBack={true}
              ui={ui}
              pagesPath="/admin/Website/Website/"
              query={router.query}
              push={router.push}
              model="VideoCollection"
            ></PrismaTable>
          </Container>
        </Page>
      </DashboardLayout>
    </AdminGuard>
  );
};
export default VideoCollectionRoute;
export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['admin', 'generated', 'validation'])),
    },
  };
};
export const VideoCollectionUI = ui;
