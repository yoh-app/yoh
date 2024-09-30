import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

import Spinner from '../../components/Spinner';
import DynamicTable from '../dynamicTable';
import { GET_SCHEMA } from '../../SchemaQueries';
import { ModelTableProps, ContextProps } from '../../index';
import { TableContext, defaultSettings } from '../Context';
import defaultLanguage from '../language';
import { useEnterAdminMutation, useInstallTemplateMutation, useCreateOnePageMutation, usePermissionQuery, useUpdateOneNftMutation, useUpdateOneOrganizationMutation, useUpdateOnePageGroupMutation } from 'generated';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Iconify from 'components/Iconify';
import { alpha, styled } from '@mui/material/styles';
import {
  Container,
  Stack,
  Grid,
  Fade,
  Backdrop,
  TextField,
  List,
  ListItemButton,
  ListItemText,
  Card,
  CardContent,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import singlenft from 'templates/defaultContents/singlenft.json';
import portfolio from 'templates/defaultContents/portfolio.json';
import linktree from 'templates/defaultContents/linktree.json';
import fullfeature from 'templates/defaultContents/full-feature.json';
import Upload from 'components/upload/Upload';
import { addTemplate } from 'components/craft/editor/CraftEditor/Modals/utils'
import All from 'templates/sections/basic.json'

import { useFindManyPageQuery } from 'generated'

import { RenderNode } from 'components/craft/editor';
import { CraftProvider } from 'components/craft/editor/CraftContext';
import { Resource } from 'components/craft/selectors/Resource';
import { HtmlTag } from 'components/craft/selectors/HtmlTag';
import { HtmlButton } from 'components/craft/selectors/HtmlButton';
import { HtmlSection } from 'components/craft/selectors/HtmlSection';
import { HtmlImg } from 'components/craft/selectors/HtmlImg';
import { Collection } from 'components/craft/selectors/Collection';
// import { Embed } from 'components/craft/selectors/Embed';
import { HtmlText } from 'components/craft/selectors/HtmlText';
import { Root } from 'components/craft/selectors/Root';
import { Editor, Frame, Element } from '@craftjs/core';
import useResponsive from 'hooks/useResponsive'

const TitleStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  height: 44,
  fontSize: '20px',
  color: 'inherit',
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}));
const CardMediaStyle = styled('div')(({ theme }) => ({
  position: 'relative',
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  '&:disabled': {
    color: 'white',
    background: '#B8B8B8',
  },
}));

const CoverImgStyle = styled('img')(({ theme }) => ({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
}));

// const Template = ({ enterAdmin, website, templateView, setTemplateView, setTemplate, updateWebsite }) => {
//   const [selected, setSelected] = useState(null);
//   const [createPage] = useCreateOnePageMutation();
//   const router = useRouter()
//   const isDesktop = useResponsive('up', 'sm');

//   const mdUp = useResponsive('up', 'md');
//   const xsUp = useResponsive('up', 'xs');

//   const { data: pageData } = useQuery(gql`query findManyPage($where: PageWhereInput, $orderBy: [PageOrderByWithRelationInput!], $cursor: PageWhereUniqueInput, $skip: Int, $take: Int) {
//     findManyPage(where: $where, orderBy: $orderBy, cursor: $cursor, skip: $skip, take: $take) {
//       id
//       name
//       description
//       content
//       website {
//         id
//         name
//         slug
//       }
//     }
//   }`, {
//     variables: {
//       where: {
//         active: {
//           equals: true
//         },
//         isIndex: {
//           equals: true
//         },
//         website: {
//           isTemplate: {
//             equals: true
//           }
//         }
//       }
//     }
//   })

//   const { data, loading } = useQuery(gql`query findManyWebsite($where: WebsiteWhereInput, $orderBy: [WebsiteOrderByWithRelationInput!], $cursor: WebsiteWhereUniqueInput, $skip: Int, $take: Int) {
//     findManyWebsite(where: $where, orderBy: $orderBy, cursor: $cursor, skip: $skip, take: $take) {
//       id
//       name
//       description
//       menu
//       imageObj
//       slug
//     }
//   }`, {
//     variables: {
//       where: {
//         isTemplate: {
//           equals: true
//         },
//         active: {
//           equals: true
//         }
//       }
//     }
//   })
//   const { t } = useTranslation('admin');
//   return (
//     <Modal
//       open={templateView}
//     >
//       <Box
//         sx={{
//           height: '100%',
//           width: '100%',
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           // maxWidth: getViewWidth(),
//           bgcolor: 'background.paper',
//           // borderRadius: '10px',
//           boxShadow: 24,
//           p: 3,
//           outline: 'none',
//         }}
//       >
//         <div className="flex flex-col max-h-[80vh]">
//           <div className="flex align-center mb-4">
//             <Iconify icon={'lucide:layout'} width={20} height={20} />
//             <Typography sx={{ flexGrow: 1, marginLeft: 1.5, marginRight: 1.5, color: '#4B5971' }}>
//               {t('website.selectTemplate')}
//             </Typography>
//             {/* <Button sx={{ minWidth: 'unset' }} onClick={closeModal}>
//           <Iconify icon={'la:times'} sx={{ width: 20, height: 20 }} />
//         </Button> */}
//           </div>
//           {/* <Box sx={{ overflow: 'auto' }}>
//             {website?.id && <Upload
//               id={'new'}
//               path={'/Website/' + website?.id + `/image/`}
//               attachmentType={'image'}
//               maxFileSize={10000000000}
//               autoProceed={false}
//               maxNumberOfFiles={10}
//               onComplete={async (newFiles) => {
//                 console.log(newFiles)
//                 const callToActionTemplates = All.filter((_item) => _item.style === 'call-to-action')
//                 const blogTemplates = All.filter((_item) => _item.style === 'blog')
//                 const applicationsTemplates = All.filter((_item) => _item.style === 'applications')

//                 let changeImage = (obj, newFile) => {
//                   for (let i in obj) {
//                     if (typeof obj?.[i] === 'string' && (obj[i].includes("/mockup-assets/images/gray-500-square.png") || obj[i].includes("/mockup-assets/images/gray-500-horizontal.png"))) {
//                       obj[i].replace("/mockup-assets/images/gray-500-square.png", newFile.url).replace("/mockup-assets/images/gray-500-horizontal.png", newFile.url);
//                     } else {
//                       changeImage(obj[i], newFile);
//                     }
//                   }
//                 };

//                 const newPageContent = {
//                   "ROOT": { "id": "ROOT", "type": "Root", "displayName": "Root", "props": {}, "custom": {}, "parent": null, "nodes": [], "linkedNodes": {}, "hidden": false, "isCanvas": true }
//                 }
//                 const withBlock1 = addTemplate({
//                   addItemIndex: 0,
//                   id: callToActionTemplates[Math.floor(Math.random() * callToActionTemplates.length)].id,
//                   currentJson: JSON.stringify(newPageContent),
//                 })
//                 const withBlock2 = addTemplate({
//                   addItemIndex: 1,
//                   id: blogTemplates[Math.floor(Math.random() * blogTemplates.length)].id,
//                   currentJson: JSON.stringify(withBlock1),
//                 })

//                 const withBlock3 = addTemplate({
//                   addItemIndex: 2,
//                   id: applicationsTemplates[Math.floor(Math.random() * applicationsTemplates.length)].id,
//                   currentJson: JSON.stringify(withBlock2),
//                 })

//                 let finalString = JSON.stringify(withBlock3)

//                 newFiles.map((newFile) => {
//                   finalString = finalString.replace('/mockup-assets/images/gray-500-square.png', newFile.url).replace("/mockup-assets/images/gray-500-horizontal.png", newFile.url)
//                 })
//                 console.log(website, 'this is website')
//                 updateWebsite({
//                   variables: {
//                     where: {
//                       id: website?.id,
//                     },
//                     data: {
//                       pages: {
//                         create: [{
//                           name: 'home',
//                           isIndex: true,
//                           content: finalString
//                         }]
//                       }
//                     }
//                   }
//                 }).then(() => {
//                   return enterAdmin({
//                     variables: {
//                       admin: 'Website',
//                       id: website?.id,
//                     },
//                   })
//                 }).then((result) => {
//                   if (result?.data?.enterAdmin?.token) {
//                     // setCreatingWebsite(false)
//                     localStorage.setItem('accessToken', result?.data?.enterAdmin?.token);
//                     window.location.assign(`/${router.locale}/admin`);
//                   }
//                 });
//               }}
//             />}
//           </Box> */}

//           <Box sx={{ overflow: 'auto' }}>
//             <Grid
//               container
//               rowSpacing={3}
//               columnSpacing={3}
//               sx={{
//                 overflow: 'auto',
//               }}
//             >
//               {pageData?.findManyPage?.map((template, index) => (
//                 <Grid key={index} item xs={6} sm={4} md={3}>
//                   <Card
//                     className={selected?.id === template.id ? 'card-select' : ''}
//                     sx={{
//                       '&.card-select': {
//                         border: '4px solid #212B36',
//                         '& .pictute': {
//                           filter: 'unset',
//                         },
//                         '& .card-selectedTag': {
//                           opacity: 1,
//                         },
//                       },
//                       border: '4px solid transparent',
//                       position: 'relative',
//                       ':hover .pictute:after': {
//                         bgcolor: (theme) => alpha(theme.palette.grey[900], 0),
//                       },
//                     }}
//                     onClick={() => setSelected(template)}
//                   >
//                     {/*<div style={{ height: '300px' }}>
//                       <iframe style={{
//                         // height: '200px',
//                         width: mdUp ? '1200px' : xsUp ? '960px' : '600px',
//                         height: '1280px',
//                         transform: 'scale(0.3)',
//                         transformOrigin: `left top`,
//                         // transformOrigin: `${isDesktop ? 'left' : '10%'} top`,
//                         // pointerEvents: 'none',
//                       }} src={process.env.NODE_ENV === 'production' ? `https://${template.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}` : 'http://www.awkns.local:3003'} /> 
//                     </div>*/}
//                     <div style={{
//                       height: '300px',
//                       width: '1024px',
//                       transform: 'scale(0.4)',
//                       transformOrigin: `${isDesktop ? 'left' : '10%'} top`,
//                       pointerEvents: 'none',
//                     }}>
//                       <CraftProvider
//                         websiteData={null}
//                         pageData={template}
//                         inEdit={false}
//                       >
//                         <Editor
//                           resolver={{
//                             // Embed,
//                             Resource,
//                             HtmlTag,
//                             HtmlButton,
//                             HtmlText,
//                             HtmlSection,
//                             HtmlImg,
//                             Root,
//                             Collection,
//                           }}
//                           enabled={false}
//                           onRender={RenderNode}
//                         >
//                           <Frame data={template?.content} />
//                         </Editor>
//                       </CraftProvider>
//                     </div>
//                     <CardContent
//                       sx={{
//                         // py: 1,
//                         // px: 2,
//                         padding: 0,
//                         bottom: 0,
//                         width: '100%',
//                         height: '100%',
//                         position: 'absolute',
//                         cursor: 'pointer',
//                         display: 'flex',
//                         flexDirection: 'row',
//                         alignItems: 'self-end',
//                         background: 'linear-gradient(0deg, grey, transparent)',
//                         // bgcolor: (theme) => alpha(theme.palette.grey[900], 0.4),
//                         // '&:last-child': {},
//                       }}
//                     >
//                       <TitleStyle
//                         sx={{
//                           padding: '10px',
//                           color: 'common.white',
//                         }}
//                       >
//                         {template?.website?.name}
//                       </TitleStyle>
//                     </CardContent>

//                     <Box
//                       className="card-selectedTag"
//                       sx={{
//                         opacity: 0,
//                         position: 'absolute',
//                         top: '50%',
//                         left: '50%',
//                         transform: 'translate(-50%, -100%)',
//                         transition: 'opacity 0.3s ease 0s',
//                         margin: 'auto',
//                         display: 'flex',
//                         background: '#212B36',
//                         color: '#ffffff',
//                         borderRadius: '10px',
//                         padding: '2px 16px',
//                         alignItems: 'center',
//                       }}
//                     >
//                       <Iconify icon={'eva:checkmark-circle-outline'} width={20} height={20} />
//                       <Typography sx={{ flexGrow: 1, marginLeft: 1 }}>
//                         {t('website.selected')}
//                       </Typography>
//                     </Box>
//                   </Card>
//                   <a target='_blank' href={process.env.NODE_ENV === 'production' ? `https://${template?.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}` : 'http://www.awkns.local:3003'}>Preview</a>
//                 </Grid>
//               ))}
//             </Grid>
//           </Box>
//           <div className="text-center mt-8">
//             <SubmitButton
//               variant="contained"
//               disabled={!selected}
//               onClick={() => {
//                 setTemplate(selected.website)
//                 setTemplateView(false)
//               }}
//             >
//               <Iconify icon={'eva:checkmark-fill'} width={20} height={20} />
//               {t('website.create')}
//             </SubmitButton>
//           </div>
//         </div>
//       </Box>
//     </Modal>
//   );
// };
const templates = [singlenft, portfolio, fullfeature, linktree]

const PrismaTable: React.FC<ModelTableProps> = ({ children, organizationData, permissionData, language, model, ui, ...rest }) => {
  // const { data, loading } = useQuery<{ getSchema: ContextProps['schema'] }>(GET_SCHEMA);

  const [creatingOrganization, setCreatingOrganization] = useState(false)
  const mergedLanguage = { ...defaultLanguage(), ...language };
  const router = useRouter()
  const [templateView, setTemplateView] = useState(false)
  const [enterAdmin] = useEnterAdminMutation()
  const [createPage] = useCreateOnePageMutation()
  const [updateOrganization] = useUpdateOneOrganizationMutation()

  const { t } = useTranslation(['admin'])
  const [createdOrganization, setCreatedOrganization] = useState(null)
  const [template, setTemplate] = useState(null)
  // const [installTemplate] = useInstallTemplateMutation()
  // useEffect(() => {
  //   if (template?.id) {
  //     setCreatingOrganization(true)

  //     installTemplate({
  //       variables: {
  //         templateId: template?.id,
  //         organizationId: createdOrganization?.id
  //       }
  //     }).then(() => {
  //       return enterAdmin({
  //         variables: {
  //           admin: 'Organization',
  //           id: createdOrganization?.id,
  //         },
  //       })
  //     }).then((result) => {
  //       if (result?.data?.enterAdmin?.token) {
  //         setCreatingOrganization(false)
  //         localStorage.setItem('accessToken', result?.data?.enterAdmin?.token);
  //         window.location.assign(`/${router.locale}/admin`);
  //       }
  //     });
  //   }
  // }, [template])

  // const onSaveCreate = ({ model, data, setCreateModal, refetchTable, getData, parent }) => {
  //   if (model === 'Website') {
  //     setTemplateView(true)
  //     console.log('this is data', data)
  //     setCreatedWebsite(data)
  //     setCreateModal(false);
  //     parent?.updateRecord && parent.updateRecord();
  //     getData();
  //   };
  // }


  const onSaveCreate = ({ model, data, setCreateModal, refetchTable, getData, parent }) => {
    if (model === 'Organization') {
      // setTemplateView(true)
      console.log('this is data', data)
      // setCreatedOrganization(data)
      // setCreateModal(false);
      // parent?.updateRecord && parent.updateRecord();
      // getData();
      enterAdmin({
        variables: {
          admin: 'Organization',
          id: data?.id,
        },
      }).then((result) => {
        if (result?.data?.enterAdmin?.token) {
          setCreatingOrganization(false)
          localStorage.setItem('accessToken', result?.data?.enterAdmin?.token);
          window.location.assign(`/${router.locale}/admin`);
        }
      });
    };
  }
  return (
    <TableContext.Provider
      value={{
        organizationData,
        permissionData,
        schema: permissionData?.schema ?? {
          models: [],
          enums: [],
        },
        ...(rest as any),
        lang: mergedLanguage,
        onSaveCreate,
      }}
    >
      <DynamicTable enableBack={false} ui={ui} model={model}>
        {children}
      </DynamicTable>
      <Modal
        open={creatingOrganization}
      >
        <Box sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: '20px',
          // border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography variant="h6" component="h2">
            {t('website.creatingWebsiteTitle')}
          </Typography>
          <Typography sx={{ mt: 2 }}>
            {t('website.creatingWebsiteDescription')}
          </Typography>
        </Box>
      </Modal>
      {/* <Template enterAdmin={enterAdmin} setTemplateView={setTemplateView} updateOrganization={updateOrganization} organization={createdOrganization} templateView={templateView} setTemplate={setTemplate} /> */}
    </TableContext.Provider>
  );
};

PrismaTable.defaultProps = defaultSettings;

export default PrismaTable