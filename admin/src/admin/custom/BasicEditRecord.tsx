// import { Icon } from '@iconify/react';
import { capitalCase } from 'change-case';
import { useState, useEffect } from 'react';
// material
import { Container, Tab, Box, Tabs, Button } from '@mui/material';
// redux

// routes
import { PATH_DASHBOARD } from '../routes/paths';
// components
import Page from 'components/Page';
import HeaderDashboard from 'components/HeaderDashboard';
// import roundAccountBox from '@iconify/icons-ic/round-account-box';

import DynamicTable from '../PrismaTable/dynamicTable';
import Link from 'next/link';
import useAuth from 'hooks/useAuth';
import { usePermissionQuery } from 'generated';
import { useTranslation } from 'next-i18next';
import shouldHide from './shouldHide';

import InfoIcon from '@mui/icons-material/Info';

import VideoFileIcon from '@mui/icons-material/VideoFile';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import ArticleIcon from '@mui/icons-material/Article';
import CollectionsIcon from '@mui/icons-material/Collections';
import DatasetLinkedIcon from '@mui/icons-material/DatasetLinked';
import DescriptionIcon from '@mui/icons-material/Description';
import ArtTrackIcon from '@mui/icons-material/ArtTrack';

// ----------------------------------------------------------------------

export default function EditRecord({
  pagesPath,
  model,
  models,
  modelObject,
  record,
  tabs,
  ui,
  view,
  onSave,
  onUpdateCancel,
  updateRecord,
  enableBack,
}) {
  const { t } = useTranslation(['generated', 'validation']);
  const { t: tAdmin } = useTranslation('admin')
  const [parent, setParent] = useState(null);
  const { data, loading } = usePermissionQuery();
  useEffect(() => {
    if (record && Object.keys(record).length > 0 && data?.permission?.parents) {
      const modelParent = data?.permission.parents.find((parent) => parent.model === model);
      const parentField = modelObject?.fields?.find((field) => field?.type === modelParent?.parent);
      const parentObject =
        parentField && models?.find((modelItem) => modelItem?.id === parentField?.type);
      if (
        parentObject?.name !== 'User' &&
        modelParent &&
        parentField &&
        modelParent.parent !== data?.permission.admin
      ) {
        if (record && record[parentField.name]?.__typename && record[parentField.name]?.id) {
          setParent({ ...record[parentField.name], object: parentObject, field: parentField });
        }
      }
    }
  }, [record, data]);

  const FormComponent = ui.updateFormComponent;

  const [itemTabs, setItemTabs] = useState([{
    value: 'general',
    icon: <InfoIcon />,
    component: (
      <FormComponent
        model={model}
        action={view ? 'view' : 'update'}
        data={record}
        onCancel={() => onUpdateCancel({ model })}
        onSave={onSave}
        ui={ui}
      />
    ),
  }])
  useEffect(() => {
    setItemTabs([
      {
        value: 'general',
        icon: <InfoIcon />,
        component: (
          <FormComponent
            model={model}
            action={view ? 'view' : 'update'}
            data={record}
            onCancel={() => onUpdateCancel({ model })}
            onSave={onSave}
            ui={ui}
          />
        ),
      },
      ...tabs
        .filter((field) => {

          if (ui?.relationModels && ui?.relationModels?.[field.type]) {
            if (
              ui?.relationModels[field.type]?.hideOn &&
              shouldHide({
                hideOn: ui?.relationModels[field.type]?.hideOn,
                action: 'update',
                record,
              })
            ) {
              return false;
            }
            return true;
          }
          return false;
        })
        // .filter((field) => {
        //   const relationModel = ui?.relationModels[field.type];
        //   if (relationModel?.hideOn?.field?.value !== record[relationModel?.hideOn?.field?.name]) {
        //     return true;
        //   }
        //   return false;
        // })
        .map((tab) => {
          const relationUI = ui?.relationModels?.[tab?.type];

          let icon = <VideoFileIcon />

          switch (relationUI?.name) {
            case 'Order':
              icon = <DescriptionIcon />
              break;
            case 'Request':
              icon = <ArtTrackIcon />
              break;
            case 'Video':
              icon = <VideoFileIcon />
              break;
            case 'Audio':
              icon = <AudioFileIcon />
              break;
            case 'Picture':
              icon = <CollectionsIcon />
              break;
            case 'Link':
              icon = <DatasetLinkedIcon />
              break;
            case 'Document':
              icon = <ArticleIcon />
              break;
            default:
              break;
          }
          console.log('relation: ', relationUI)
          return {
            value: tab.name,
            ui: relationUI,
            icon,
            // icon: <Icon icon={roundAccountBox} width={20} height={20} />,
            component: (
              <DynamicTable
                ui={relationUI}
                key={tab.type}
                model={tab.type}
                inEdit
                filter={{ [model]: record?.[modelObject?.idField] }}
                parent={{ name: model, value: record, field: tab.name, updateRecord }}
              />
            ),
          };
        }),
    ])
  }, [record, ui])

  // const itemTabs = [
  //   {
  //     value: 'general',
  //     icon: <InfoIcon />,
  //     component: (
  //       <FormComponent
  //         model={model}
  //         action={view ? 'view' : 'update'}
  //         data={record}
  //         onCancel={() => onUpdateCancel({ model })}
  //         onSave={onSave}
  //         ui={ui}
  //       />
  //     ),
  //   },
  //   ...tabs
  //     .filter((field) => {

  //       if (ui?.relationModels && ui?.relationModels[field.type]) {
  //         if (
  //           ui?.relationModels[field.type]?.hideOn &&
  //           shouldHide({
  //             hideOn: ui?.relationModels[field.type]?.hideOn,
  //             action: 'update',
  //             record,
  //           })
  //         ) {
  //           return false;
  //         }
  //         return true;
  //       }
  //       return false;
  //     })
  //     // .filter((field) => {
  //     //   const relationModel = ui?.relationModels[field.type];
  //     //   if (relationModel?.hideOn?.field?.value !== record[relationModel?.hideOn?.field?.name]) {
  //     //     return true;
  //     //   }
  //     //   return false;
  //     // })
  //     .map((tab) => {
  //       const relationUI = ui?.relationModels[tab.type];
  //       let icon = <VideoFileIcon />

  //       switch (relationUI?.name) {
  //         case 'Order':
  //           icon = <DescriptionIcon />
  //           break;
  //         case 'Request':
  //           icon = <ArtTrackIcon />
  //           break;
  //         case 'Video':
  //           icon = <VideoFileIcon />
  //           break;
  //         case 'Audio':
  //           icon = <AudioFileIcon />
  //           break;
  //         case 'Picture':
  //           icon = <CollectionsIcon />
  //           break;
  //         case 'Link':
  //           icon = <DatasetLinkedIcon />
  //           break;
  //         case 'Document':
  //           icon = <ArticleIcon />
  //           break;
  //         default:
  //           break;
  //       }

  //       return {
  //         value: tab.name,
  //         ui: relationUI,
  //         icon,
  //         // icon: <Icon icon={roundAccountBox} width={20} height={20} />,
  //         component: (
  //           <DynamicTable
  //             ui={relationUI}
  //             key={tab.type}
  //             model={tab.type}
  //             inEdit
  //             filter={{ [model]: record?.[modelObject?.idField] }}
  //             parent={{ name: model, value: record, field: tab.name, updateRecord }}
  //           />
  //         ),
  //       };
  //     }),
  // ];
  const [currentTab, setCurrentTab] = useState('general');

  useEffect(() => {
    if (itemTabs?.[1]?.value && (model === 'ProductCollection' || model === 'PageCollection')) {
      setCurrentTab(itemTabs?.[1]?.value)
    }
  }, [model, itemTabs])

  const links = parent
    ? [
      {
        name: data?.permission.admin,
      },
      { name: parent?.field.type, href: pagesPath + parent.field.type },
      {
        name: parent[parent?.object?.displayFields[0]],
        href: pagesPath + parent.field.type + `?update=${parent.id}`,
      },
      {
        name: t(ui.intl['titleId']),
        href: pagesPath + model + `?${parent.object.name}=${parent.id}`,
      },
      { name: record[modelObject.displayFields[0]] },
    ]
    : [
      {
        name: data?.permission.admin,
      },
      { name: t(ui.intl['titleId']), href: pagesPath + model },
      { name: record?.[modelObject?.displayFields?.[0]] },
    ];
  return (
    <div>
      <HeaderDashboard
        action={view ? 'view' : 'update'}
        model={modelObject}
        record={record}
        heading={record?.[modelObject?.displayFields?.[0]]?.length > 0 ? `${t(ui?.crudIntl ? ui.crudIntl['listTitleId'] : ui?.intl['titleId'])}: ${record?.[modelObject?.displayFields?.[0]]?.length > 0 ? record?.[modelObject?.displayFields?.[0]] : record?.id}` : ''}
        description={t(ui?.crudIntl ? ui.crudIntl['updateDescriptionId'] : ui?.intl['descriptionId'])}
        links={!ui?.admin ? links : []}
        enableBack={enableBack}
        buttons={[
          // () => {
          //   if (itemTabs?.length === 0) {
          //     return null;
          //   } else {
          //     return (
          //       <Button sx={{ mt: 3 }} variant={showMore ? 'outlined' : 'contained'} onClick={() => setShowMore(!showMore)}>
          //         {showMore ? tAdmin('basic') : tAdmin('more')}
          //       </Button>
          //     );
          //   }
          // },
        ]}
      />
      {/* <HeaderDashboard
        heading={t(ui?.crudIntl ? ui.crudIntl['updateTitleId'] : ui?.intl['titleId'])}
        description={t(
          ui?.crudIntl ? ui.crudIntl['updateDescriptionId'] : ui?.intl['descriptionId']
        )}
        links={!ui?.admin ? links : []}
        enableBack={enableBack}
        buttons={[
          () => {
            if (itemTabs?.length === 0) {
              return null;
            } else {
              return (
                <Button sx={{ mt: 3 }} variant={showMore ? 'outlined' : 'contained'} onClick={() => setShowMore(!showMore)}>
                  {showMore ? tAdmin('basic') : tAdmin('more')}
                </Button>
              );
            }
          },
        ]}
      /> */}

      <>
        <Tabs
          value={currentTab}
          scrollButtons="auto"
          variant="scrollable"
          allowScrollButtonsMobile
          onChange={(e, value) => setCurrentTab(value)}
        >
          {itemTabs.map((tab, index) => {
            return (
              <Tab
                disableRipple
                key={tab.value}
                label={index === 0 ? tAdmin('basic') : t(tab.ui.crudIntl.listTitleId)}
                icon={tab.icon}
                value={tab.value}
                style={{ paddingRight: '10px' }}
              />
            );
          })}
        </Tabs>


        {itemTabs.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <>
            {/* <Box sx={{ my: 5 }}>
                {!tab?.ui?.hideCreate && tAdmin('relationModel.newDescription')}
                {!tab?.ui?.hideCreate && !tab?.ui?.hideConnect && tAdmin('relationModel.or')}
                {!tab?.ui?.hideConnect && tAdmin('relationModel.connectDescription')}

              </Box> */}
            <Box sx={{ my: 5 }} key={tab.value}>{tab.component}</Box></>;
        })}
      </>
    </div>
  );
}
