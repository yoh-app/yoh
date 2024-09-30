import React, { useEffect, useState, useContext } from 'react';
import { useEditor } from '@craftjs/core';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import ViewCompactOutlinedIcon from '@mui/icons-material/ViewCompactOutlined';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useTranslation } from 'next-i18next';
import All from 'templates/sections/basic.json';
import { CraftContext } from '../../CraftContext';
import { addTemplate } from './utils'
import ThemeProvider from 'theme';
import ThemeColorPresets from 'components/ThemeColorPresets';
import useResponsive from 'hooks/useResponsive'
const DesignPicker = ({ onClose }) => {
  const { t } = useTranslation('design');
  const { setView, addItemIndex } = useContext(CraftContext);
  const isDesktop = useResponsive('up', 'sm');

  const {
    actions: { deserialize },
    query,
  } = useEditor();
  const [templateTab, setTemplateTab] = useState(0);

  const templateStyles = All?.reduce(
    (prev, current) => {
      if (!prev.find((addedStyle) => addedStyle === current.style)) {
        return [...prev, current.style];
      }
      return prev;
    },
    ['All']
  );
  return (
    <ThemeProvider>
      <ThemeColorPresets>
        <div className="w-full flex justify-between">
          <Typography
            sx={{
              color: '#4B5971',
              fontSize: '16px',
            }}
          >
            {t('WebsiteAdmin.DesignPage.addSection')}
          </Typography>
        </div>
        <Typography

          sx={{ margin: '20px 0 20px 0' }}
          variant="h4"
          component="h4"
        >
          <ViewCompactOutlinedIcon className="mr-1" />
          {t('WebsiteAdmin.DesignPage.topBar.template')}
        </Typography>
        <Tabs
          variant="scrollable"
          scrollButtons="auto"
          value={templateTab} onChange={(event, newValue) => setTemplateTab(newValue)}>
          {templateStyles?.map((templateType) => {
            return <Tab label={templateType} />;
          })}
        </Tabs>
        {templateStyles?.map((templateStyle, index) => {
          if (templateTab === index) {
            return (
              <Grid style={{ textAlign: '-webkit-center' }} container justifyContent="center" alignItems="center" spacing={4}>
                {All?.filter(
                  (template) => template.style === templateStyle || templateStyle === 'All'
                ).map((html, index) => {
                  return (
                    <Grid xs={12} sm={6} md={3} item key={index}>
                      <Card
                        style={{
                          maxWidth: '300px',
                          borderRadius: '10px',
                          backgroundColor: 'white',
                          boxShadow: '0 0.5rem 1rem 0 rgba(44,51,73,0.1)',
                        }}
                      >
                        <CardActionArea
                          onClick={() => {
                            const result = addTemplate({
                              addItemIndex,
                              id: html.id,
                              currentJson: query.serialize(),
                            });
                            deserialize(result)
                            setView(null);
                          }}
                        >
                          <CardContent style={{ height: '200px', overflow: 'scroll' }}>
                            {/* <div style={{
                              height: '200px',
                              width: '200px',
                              transform: 'scale(0.5)',
                              pointerEvents: 'none',
                            }}> */}
                            <div
                              style={{
                                height: '200px',
                                width: '700px',
                                transform: 'scale(0.2)',
                                transformOrigin: `${isDesktop ? 'left' : '10%'} top`,
                                pointerEvents: 'none',
                              }}
                              dangerouslySetInnerHTML={{ __html: html.html }}
                            ></div>
                            {/* </div> */}
                          </CardContent>
                          {/* <CardMedia
                            component="img"
                            height="140"
                            image={`/images/templates/craft/${html.imgSrc}`}
                            alt=""
                          /> */}
                        </CardActionArea>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            );
          }
          return null;
        })}
        <div className="bottom-6">
          <Button onClick={() => setView('add_item')}>
            &lt; {t('WebsiteAdmin.DesignPage.AddItem.block.Access.back')}
          </Button>
        </div>
      </ThemeColorPresets>
    </ThemeProvider>);
};

export default DesignPicker