import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Grid, Divider } from '@mui/material';
import { useNode } from '@craftjs/core';
import { makeStyles } from '@mui/styles';

export const ToolbarSection = ({ title, props, summary, children }: any) => {
  const { nodeProps } = useNode((node) => ({
    nodeProps:
      props &&
      props.reduce((res: any, key: any) => {
        res[key] = node.data.props[key] || null;
        return res;
      }, {}),
  }));
  return (
    <Accordion
      defaultExpanded={props.includes('text') || props.includes('imageSrc') || props.includes('meta')}
      sx={{
        backgroundColor: 'transparent',
        backgroundImage: 'none',
        boxShadow: 'none',
        borderTop: '1px solid #1B1B1B',
        '& + .MuiAccordion-root': {
          borderBottom: '1px solid #1B1B1B',
        },
        '&:before': {
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
        },
        '&.Mui-expanded': {
          margin: '0 0',
          minHeight: '40px',
          '&:before': {
            opacity: '1',
          },
          '& + .MuiExpansionPanel-root:before ': {
            display: 'block',
          },
        },
      }}
    >
      <AccordionSummary
        sx={{
          'min-height': '36px',
          padding: 0,
          '&.Mui-expanded': {
            'min-height': '36px',
          },
        }}
      >
        <div className="px-6 w-full">
          <Grid container direction="row" alignItems="center">
            {props.includes('text') ? (
              <Grid item >
                <h5 className="text-sm text-light-gray-1 text-left font-medium text-dark-gray">
                  {title}
                </h5>
              </Grid>
            ) : (
              <Grid>
                <div>
                  <h5 className="text-sm text-light-gray-1 text-left font-medium text-dark-gray">
                    {title}
                  </h5>
                </div>
                {summary && props ? (
                  <div>
                    <h5 className="text-light-gray-2 text-sm text-right text-dark-blue">
                      {summary(
                        props.reduce((acc: any, key: any) => {
                          acc[key] = nodeProps[key];
                          return acc;
                        }, {})
                      )}
                    </h5>
                  </div>
                ) : null}
              </Grid>
            )}
          </Grid>
        </div>
      </AccordionSummary>
      <AccordionDetails style={{ padding: '8px 24px 16px', backgroundColor: '#000000' }}>
        <Grid container spacing={1}>
          {children}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};
