import React, { useEffect, useContext, useState } from 'react';
import { useNode, useEditor } from '@craftjs/core';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { RenderEdit } from '../../editor/RenderEdit';
import styled from 'styled-components';
import { useQuery, gql } from '@apollo/client';
import { CraftContext } from '../../editor/CraftContext';
import Iconify from '../../../../components/Iconify';
import { themes } from '../../../../assets/client_themes_map';
import { useFindManyEmbedQuery } from '../../../../generated';

export const Embed = (props: any) => {
  const {
    connectors: { connect },
    node,
  } = useNode((node) => ({
    node,
  }));
  const { embedUpdated, setEmbedUpdated } = useContext(CraftContext);
  const [iframeAttributes, setIframeAttributes] = useState(null);
  const { data, refetch } = useFindManyEmbedQuery({
    variables: {
      where: {
        id: {
          equals: props?.id,
        },
        active: {
          equals: true,
        },
      },
    },
    skip: !props?.id,
  });
  useEffect(() => {
    if (embedUpdated === props?.id) {
      refetch();
    }
  }, [embedUpdated]);

  useEffect(() => {
    if (data?.findManyEmbed?.[0]?.embedCode) {
      let template = document.createElement('template');

      template.innerHTML = data?.findManyEmbed?.[0]?.embedCode;
      const attrs = template?.content?.firstChild?.getAttributeNames()?.reduce((acc, name) => {
        return { ...acc, [name]: template.content.firstChild.getAttribute(name) };
      }, {});
      setIframeAttributes(attrs);
    }
  }, [data]);

  return (
    <div ref={connect}>
      <Grid style={{ margin: '40px' }} container>
        <Grid xs={12} md={6} item>
          <Typography
            variant="h3"
            sx={{
              flexGrow: 1,
              color: '#4B5971',
              padding: '0px 12px 4px',
              fontSize: '20px',
              lineHeight: '30px',
            }}
          >
            {data?.findManyEmbed?.[0]?.name}
          </Typography>
          <Typography
            variant="h4"
            sx={{
              flexGrow: 1,
              color: '#4B5971',
              padding: '4px 12px 20px',
              fontSize: '16px',
              lineHeight: '16px',
            }}
          >
            {data?.findManyEmbed?.[0]?.description}
          </Typography>
        </Grid>
        <Grid xs={12} md={6} item>
          {iframeAttributes && <iframe {...iframeAttributes} />}
        </Grid>
      </Grid>

      {/* <EmbedModal refetch={props?.type === 'page' ? refetchPage : refetchProduct} /> */}
      <RenderEdit />
    </div>
  );
};

Embed.craft = {
  displayName: 'Embed',
  rules: {},
  props: {},
  custom: {
    src: '',
    className: '',
    htmlElement: 'div',
  },
};
