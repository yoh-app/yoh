import React, { useEffect, useState, useContext } from 'react';
import { Grid, Box, Button, Slider, RadioGroup, Tooltip, Checkbox, FormControlLabel, Tabs, Tab } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNode } from '@craftjs/core';
import { ToolbarTextInput } from './ToolbarTextInput';
import { ToolbarDropdown } from './ToolbarDropdown';
import { ToolbarUpload } from './ToolbarUpload';
import Upload from '../../../../components/upload/Upload';
import { withStyles } from '@mui/styles';
import { useTranslation } from 'next-i18next';
import { CraftContext } from '../CraftContext';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';

import { useGetMetadataMutation, useFindManyPageQuery, useFindManyProductQuery } from '../../../../generated';

const iOSBoxShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

const SliderStyled = withStyles({
  root: {
    // color: '#3880ff',
    height: 2,
    padding: '5px 0',
    width: '100%',
  },
  thumb: {
    height: 14,
    width: 14,
    backgroundColor: '#fff',
    boxShadow: iOSBoxShadow,
    // marginTop: -7,
    // marginLeft: -7,
    '&:focus,&:hover,&$active': {
      boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: iOSBoxShadow,
      },
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 11px)',
    top: -22,
    '& *': {
      background: 'transparent',
      color: '#000',
    },
  },
  track: {
    height: 2,
  },
  rail: {
    height: 2,
    opacity: 0.5,
    backgroundColor: '#bfbfbf',
  },
  mark: {
    backgroundColor: '#bfbfbf',
    height: 8,
    width: 1,
    marginTop: -3,
  },
  markActive: {
    opacity: 1,
    backgroundColor: 'currentColor',
  },
})(Slider);

export type ToolbarItem = {
  prefix?: string;
  label?: string;
  full?: boolean;
  propKey?: string;
  index?: number;
  children?: React.ReactNode;
  type: string;
  onChange?: (value: any) => any;
};
export const ToolbarItem = ({
  full = false,
  propKey,
  type,
  onChange,
  index,
  ...props
}: ToolbarItem) => {
  const {
    actions: { setProp },
    propValue,
    customValue,
    node
  } = useNode((node) => ({
    propValue: node.data.props[propKey],
    customValue: node.data.custom,
    node
  }));
  const { websiteData } = useContext(CraftContext)
  const { t } = useTranslation('design');
  const [loading, setLoading] = useState(false);
  const [isCaptured, setIsCaptured] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedSiteOption, setSelectedSiteOption] = useState('');

  const [metaOptions, setMetaOptions] = useState([]);
  const [siteMetaOptions, setSiteMetaOptions] = useState([]);

  const [getMetadata] = useGetMetadataMutation();
  const { data: productData } = useFindManyProductQuery()
  const { data: pageData } = useFindManyPageQuery()
  const [urlTab, setUrlTab] = React.useState(0);

  const value = Array.isArray(propValue) ? propValue[index] : propValue;
  const isValidUrl = urlString => {
    var urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // validate fragment locator
    return !!urlPattern.test(urlString);
  }
  const captureMetadata = async () => {
    console.log(propValue, 'propvalue')
    setLoading(true);
    let options: any[] = [];

    if (urlTab === 1 || urlTab === 2) {
      console.log(siteMetaOptions, selectedSiteOption)
      siteMetaOptions.filter((op) => op.value === selectedSiteOption).map((siteMetaOption) => {
        options.push({
          key: 'name',
          value: siteMetaOption.name,
          url: siteMetaOption.value
        })
        options.push({
          key: 'description',
          value: siteMetaOption.description,
          url: siteMetaOption.value
        })
      })
      setIsCaptured(true);
      console.log(options)
      setMetaOptions(options);
    } else {
      if (isValidUrl(value)) {
        try {
          const { data } = await getMetadata({
            variables: {
              pageUrl: value,
            },
          });
          const { meta } = data.getMetadata;
          Object.keys(meta).forEach((key) => {
            options.push({
              key,
              value: meta[key],
            });
          });
          setSelectedOption('')
          setIsCaptured(true);
          console.log(options)
          setMetaOptions(options);
        } catch (err) {
          console.log(err)
        }
      } else {
        alert(
          t('WebsiteAdmin.DesignPage.customizePanel.meta.capture.invaludUrl')
        )
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    let options = []
    if (urlTab === 1 && pageData) {
      setSiteMetaOptions(pageData?.findManyPage?.map((page) => {
        return {
          key: page.name,
          name: page.name,
          description: page.description,
          value: process.env.NODE_ENV === 'production' ? `https://${websiteData?.slug}.yoh.app/pages/${page.slug}` : `http://www.pixite.io:3003/pages/${page.slug}`,
        }
      }))
    } else if (urlTab === 2 && productData) {
      setSiteMetaOptions(productData?.findManyProduct?.map((product) => {
        return {
          key: product.name,
          name: product.name,
          description: product.description,
          value: process.env.NODE_ENV === 'production' ? `https://${websiteData?.slug}.yoh.app/products/${product.slug}` : `http://www.pixite.io:3003/products/${product.slug}`,
        }
      }))
    }
  }, [pageData, productData, urlTab])

  // useEffect(() => {
  //   if (urlTab === 1 || urlTab === 2) {
  //     const selectedSiteMetaOption = siteMetaOptions?.find((siteMetaOption) => siteMetaOption?.value === value)
  //     console.log(urlTab, value, selectedSiteMetaOption)

  //     if (selectedSiteMetaOption) {
  //       console.log('hh', urlTab, value, selectedSiteMetaOption)

  //       setSelectedSiteOption(selectedSiteMetaOption.value)
  //     }
  //   }
  // }, [siteMetaOptions, urlTab])

  return (
    <Grid item xs={full ? 12 : 6}>
      <div className="mb-2">
        {['text', 'color', 'bg', 'number'].includes(type) ? (
          <ToolbarTextInput
            {...props}
            type={type}
            value={value || customValue.defaultText}
            onChange={(value) => {
              setProp((props: any) => {
                if (Array.isArray(propValue)) {
                  props[propKey][index] = onChange ? onChange(value) : value;
                } else {
                  props[propKey] = onChange ? onChange(value) : value;
                }
                if (propKey === 'backgroundImage' || propKey === 'backgroundColor') {
                  props['backgroundSet'] = true;
                }
              }, 500);
            }}
          />
        ) : type == 'url' ? (
          <>
            <Tabs value={urlTab} onChange={(e, newValue) => {
              setSelectedOption('')
              setSelectedSiteOption('')
              setMetaOptions([])
              setUrlTab(newValue);
              setLoading(false)
              setIsCaptured(false)
            }}>
              <Tab label={t('WebsiteAdmin.DesignPage.customizePanel.meta.url')} />
              <Tab label={t('WebsiteAdmin.DesignPage.customizePanel.meta.page')} />
              <Tab label={t('WebsiteAdmin.DesignPage.customizePanel.meta.product')} />
            </Tabs>
            {(urlTab === 1 || urlTab === 2) && <ToolbarDropdown
              value={selectedSiteOption}
              {...props}
              onChange={(value) => {
                setProp((props: any) => {
                  const context = siteMetaOptions.find((option) => {
                    return option['value'] === value;
                  });
                  if (context) {
                    setSelectedSiteOption(value);
                    props['url'] = onChange ? onChange(value) : value;
                    // if (Array.isArray(propValue)) {
                    //   props[propKey][index] = onChange ? onChange(value) : value;
                    // } else {
                    //   props[propKey] = onChange ? onChange(value) : value;
                    // }
                  }
                });
              }}
            >
              <option disabled value="">
                {siteMetaOptions.length
                  ? t('WebsiteAdmin.DesignPage.customizePanel.meta.capture.placeholder')
                  : t('WebsiteAdmin.DesignPage.customizePanel.meta.capture.empty')}
              </option>
              {siteMetaOptions.map((option) => {
                return (
                  <option
                    value={option['value']}
                  >{`${option['key']} - ${option['value']}`}</option>
                );
              })}
            </ToolbarDropdown>}
            {urlTab === 0 && <ToolbarTextInput
              {...props}
              minRows={1}
              type={type}
              value={value}
              onChange={(value) => {
                setProp((props: any) => {
                  props['url'] = onChange ? onChange(value) : value;
                  // if (Array.isArray(propValue)) {
                  //   props[propKey][index] = onChange ? onChange(value) : value;
                  // } else {
                  //   props[propKey] = onChange ? onChange(value) : value;
                  // }
                });
              }}
            />}
            <Grid
              container
              alignContent="center"
              sx={{
                marginTop: '16px',
              }}
            >
              <Grid item xs>
                <LoadingButton
                  variant="contained"
                  onClick={captureMetadata}
                  loading={loading}
                  disabled={!value}
                  sx={{
                    textTransform: 'unset',
                    borderRadius: '8px',
                    color: '#ffffff',
                    background: '#6851FF',
                  }}
                >
                  {t('WebsiteAdmin.DesignPage.customizePanel.meta.capture.button')}
                </LoadingButton>
              </Grid>
              <Grid
                item
                flexShrink={1}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
              >
                <Tooltip title={t('WebsiteAdmin.DesignPage.customizePanel.meta.link.hint')}>
                  <div className="rounded-full text-white font-bold flex items-center justify-center">
                    ?
                  </div>
                </Tooltip>
              </Grid>

            </Grid>
            <div style={{
              marginTop: '10px',
              wordBreak: 'break-word'
            }}><a href={value}>{value}</a></div>
            {isCaptured ? (
              <>
                <div className="mt-4">
                  <ToolbarDropdown
                    value={selectedOption}
                    {...props}
                    onChange={(value) => {
                      setProp((props: any) => {
                        // if (urlTab === 0) {
                        const context = metaOptions.find((option) => {
                          return option['key'] === value;
                        });
                        console.log(context, 'this is metaOptions context')
                        if (context) {
                          setSelectedOption(value);
                          props['text'] = onChange ? onChange(context['value']) : context['value'];
                          // props['url'] = onChange ? onChange(propValue) : propValue;
                        }
                        // } else {
                        //   const context = metaOptions.find((option) => {
                        //     return option['key'] === value;
                        //   });
                        //   props['text'] = onChange ? onChange(context['value']) : context['value']
                        //   props['url'] = onChange ? onChange(propValue) : propValue;
                        //   setSelectedOption(value);
                        // }
                      });
                    }}
                  >
                    <option disabled value="">
                      {metaOptions.length
                        ? t('WebsiteAdmin.DesignPage.customizePanel.meta.capture.placeholder')
                        : t('WebsiteAdmin.DesignPage.customizePanel.meta.capture.empty')}
                    </option>
                    {metaOptions.map((option) => {
                      return (
                        <option
                          value={option['key']}
                        >{`${option['key']} - ${option['value']}`}</option>
                      );
                    })}
                  </ToolbarDropdown>
                </div>
                {/* <p className="mt-4 whitespace-wrap">
                  {t('WebsiteAdmin.DesignPage.customizePanel.meta.capture.hint')}
                </p> */}

              </>
            ) : (
              []
            )}
          </>
        ) : type == 'meta' ? (
          <>
            {isCaptured ? (
              <>
                <div className="mt-4">
                  <ToolbarDropdown
                    value={selectedOption}
                    {...props}
                    onChange={(value) => {
                      setProp((props: any) => {
                        // if (urlTab === 0) {
                        const context = metaOptions.find((option) => {
                          return option['key'] === value;
                        });
                        console.log(context, 'this is metaOptions context')
                        if (context) {
                          setSelectedOption(value);
                          props['text'] = onChange ? onChange(context['value']) : context['value'];
                          // props['url'] = onChange ? onChange(propValue) : propValue;
                        }
                        // } else {
                        //   const context = metaOptions.find((option) => {
                        //     return option['key'] === value;
                        //   });
                        //   props['text'] = onChange ? onChange(context['value']) : context['value']
                        //   props['url'] = onChange ? onChange(propValue) : propValue;
                        //   setSelectedOption(value);
                        // }
                      }, 500);
                    }}
                  >
                    <option disabled value="">
                      {metaOptions.length
                        ? t('WebsiteAdmin.DesignPage.customizePanel.meta.capture.placeholder')
                        : t('WebsiteAdmin.DesignPage.customizePanel.meta.capture.empty')}
                    </option>
                    {metaOptions.map((option) => {
                      return (
                        <option
                          value={option['key']}
                        >{`${option['key']} - ${option['value']}`}</option>
                      );
                    })}
                  </ToolbarDropdown>
                </div>
                {/* <p className="mt-4 whitespace-wrap">
                  {t('WebsiteAdmin.DesignPage.customizePanel.meta.capture.hint')}
                </p> */}
              </>
            ) : (
              []
            )}
            {/* <Grid style={{
              marginTop: '10px',
              wordBreak: 'break-word'
            }}><a href={value}>{value}</a></Grid> */}
          </>

        ) : type == 'slider' ? (
          <>
            {props.label ? <h4 className="text-sm text-light-gray-2">{props.label}</h4> : null}
            <SliderStyled
              color='secondary'
              max={200}
              value={parseInt(value) || 0}
              onChange={
                ((_, value: number) => {
                  setProp((props: any) => {
                    if (Array.isArray(propValue)) {
                      props[propKey][index] = onChange ? onChange(value) : value;
                    } else {
                      props[propKey] = onChange ? onChange(value) : value;
                    }
                  }, 1000);
                }) as any
              }
            />
          </>
        ) : type == 'displayStyle' ? (
          <>
            {props.label ? <h4 className="text-sm text-light-gray-2">{props.label}</h4> : null}
            <RadioGroup
              defaultValue='row'
              value={value}
              onChange={(e) => {
                const value = e.target.value;
                setProp((props: any) => {
                  props[propKey] = onChange ? onChange(value) : value;
                });
              }}
            >
              {props.children}
            </RadioGroup>
          </>
        ) : type == 'radio' ? (
          <>
            {props.label ? <h4 className="text-sm text-light-gray-2">{props.label}</h4> : null}
            <RadioGroup
              value={value || 0}
              onChange={(e) => {
                const value = e.target.value;
                setProp((props: any) => {
                  props[propKey] = onChange ? onChange(value) : value;
                });
              }}
            >
              {props.children}
            </RadioGroup>
          </>
        ) : type == 'select' ? (
          <ToolbarDropdown
            value={value || ''}
            onChange={(value) =>
              setProp((props: any) => (props[propKey] = onChange ? onChange(value) : value))
            }
            {...props}
          />
        ) : type == 'imageSrc' ? (
          <>
            {value?.[0]?.url}
            <Box sx={{ borderRadius: '5px', marginBottom: '16px', overflow: 'hidden' }}>
              <img style={{ height: '100px', maxWidth: '200px' }} src={value || customValue.src} />
            </Box>
            <Upload
              id={node?.id ?? 'new'}
              height={400}
              attachmentType={'image'}
              maxFileSize={10000000000}
              autoProceed={false}
              maxNumberOfFiles={1}
              onComplete={(value) =>
                setProp(
                  (props: any) =>
                    (props[propKey] = onChange ? onChange(value[0]?.url) : value[0]?.url)
                )
              }
            />
            <Button onClick={() =>
              setProp(
                (props: any) =>
                  (props[propKey] = onChange ? onChange('/images/placeholder.svg') : '/images/placeholder.svg')
              )
            } style={{ marginBottom: '10px' }} variant='contained'>
              {t('WebsiteAdmin.DesignPage.customizePanel.removeImage')}
            </Button>
          </>
        ) : null}
      </div>
    </Grid >
  );
};
