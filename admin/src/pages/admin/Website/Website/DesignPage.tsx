import React, { useState, useEffect } from 'react';
// import { NextSeo } from 'next-seo';
import { Editor, Frame, Element } from '@craftjs/core';
// import { Container, Text } from 'components/craft/selectors';
import { createTheme } from '@mui/material/styles';

// import { Custom1, OnlyButtons } from 'components/craft/selectors/Custom1';
// import { Custom2, Custom2VideoDrop } from 'components/craft/selectors/Custom2';
// import { Custom3, Custom3BtnDrop } from 'components/craft/selectors/Custom3';
// import { Button } from 'components/craft/selectors/Button';
// import { Video } from 'components/craft/selectors/Video';
import { RenderNode } from 'components/craft/editor';
import { CraftProvider } from 'components/craft/editor/CraftContext';

import { Resource } from 'components/craft/selectors/Resource';
import { HtmlTag } from 'components/craft/selectors/HtmlTag';
import { HtmlButton } from 'components/craft/selectors/HtmlButton';
import { HtmlSection } from 'components/craft/selectors/HtmlSection';
import { HtmlImg } from 'components/craft/selectors/HtmlImg';
import { Collection } from 'components/craft/selectors/Collection';
import { Embed } from 'components/craft/selectors/Embed';
import { HtmlText } from 'components/craft/selectors/HtmlText';
import { Root } from 'components/craft/selectors/Root';

import { CraftEditor } from 'components/craft/editor/CraftEditor';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import AdminGuard from 'guards/AdminGuard';
import { useQuery, useMutation, gql } from '@apollo/client';
import {
  useFindUniquePageQuery,
  useUpdateOnePageMutation,
  useFindUniqueWebsiteQuery,
  usePermissionQuery,
} from 'generated';
import { applyTheme } from 'client/src/themes/utils';
import Spinner from 'admin/components/Spinner'
const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: ['acumin-pro', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
  },
});

function App() {
  const [enabled] = useState(true);
  const router = useRouter();
  const [id, setId] = useState(router?.query?.id)
  const { data: permissionData } = usePermissionQuery();
  const { data: websiteData, refetch: refetchWebsite } = useQuery(
    gql`
      query findUniqueWebsite($where: WebsiteWhereUniqueInput!) {
        findUniqueWebsite(where: $where) {
          id
          name
          slug
          menu
          description
          imageObj
          themeColor
          pages {
            id
            name
            slug
            navColor
            isIndex
            isExternalLink
            externalUrl
          }
        }
      }
    `,
    {
      variables: {
        where: {
          id: permissionData?.permission?.Website,
        },
      },
      skip: !permissionData?.permission?.Website,
    },
  );
  useEffect(() => {
    if (websiteData?.findUniqueWebsite && !router?.query?.id) {
      const indexPage = websiteData?.findUniqueWebsite?.pages?.find((page) => {
        if (page?.isIndex) {
          return true
        }
      })
      if (indexPage) {
        setId(indexPage?.id)
      }
    }
  }, [websiteData, router])
  const { data: pageData, refetch } = useFindUniquePageQuery({
    variables: {
      where: {
        id,
      },
    },
    skip: !id,
  });
  const [updatePage] = useUpdateOnePageMutation();

  const homeLink = '/admin/Website/Website/Onboard';

  useEffect(() => {
    if (websiteData?.findUniqueWebsite?.themeColor) {
      applyTheme(websiteData?.findUniqueWebsite?.themeColor);
    } else {
      applyTheme('base');
    }
  }, [websiteData?.findUniqueWebsite?.themeColor]);
  return <AdminGuard>{pageData?.findUniquePage?.content ? <CraftProvider
    refetchWebsite={refetchWebsite}
    permissionData={permissionData?.permission}
    websiteData={websiteData?.findUniqueWebsite}
    pageData={pageData?.findUniquePage}
    refetchPage={refetch}
    inEdit={true}
  >
    <Editor
      resolver={{
        Embed,
        Resource,
        HtmlTag,
        HtmlButton,
        HtmlText,
        HtmlSection,
        HtmlImg,
        Root,
        Collection,
      }}
      enabled={enabled}
      onRender={RenderNode}
    >
      <CraftEditor
        homeLink={homeLink}
        onSave={async (newContent) => {
          await updatePage({
            variables: {
              where: {
                id,
              },
              data: {
                content: newContent,
              },
            },
          });
          await refetch();
        }}
      >
        <Frame data={pageData?.findUniquePage?.content} />
      </CraftEditor>
    </Editor>
  </CraftProvider> : <Spinner />}</AdminGuard >;
}

export const getServerSideProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'menu',
        'design',
        'generated',
        'admin',
        'validation'
        // need to remove this
      ])),
    },
  };
};

export default App;
