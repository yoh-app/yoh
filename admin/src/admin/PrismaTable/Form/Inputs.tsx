import React, { useContext, useState, useEffect, useRef } from 'react';
import { useLazyQuery } from '@apollo/client';
import { SearchIcon, XCircleIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import Modal from '../../components/Modal';
import { useEnum } from '../useSchema';
import { getDisplayName } from '../Table/utils';
import DynamicTable from '../dynamicTable';
import { queryDocument } from '../QueryDocument';
import { TableContext } from '../Context';
import { FormInputs, ModelTableProps } from '../../types';
// import Select from '../../components/Select';
// import Checkbox from '../../components/Checkbox';
import { buttonClasses, classNames, inputClasses } from '../../components/css';
import { getDate } from './getDate';
import {
  Tooltip,
  Select,
  Switch,
  Checkbox,
  Button,
  TextField,
  Typography,
  FormHelperText,
  FormControl,
  InputLabel,
  MenuItem,
} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import { SchemaField } from '@paljs/types';
import Upload from 'components/upload/Upload';
import Preview from 'components/upload/Preview';
import HelpIcon from '@mui/icons-material/Help';
import { Controller } from 'react-hook-form';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { themes } from 'theme/client/themes'
import { themes } from 'client/src/themes'
import shouldDisable from '../../custom/shouldDisable'
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
import ClientHeader from 'components/craft/editor/CraftEditor/ClientHeader';
import {
  useFindUniqueOrganizationQuery,
  usePermissionQuery,
  useUpdateOneProductMutation,
} from 'generated';
import { useQuery, gql } from '@apollo/client';
import NormalLabel from 'components/ui/label';
import { set } from 'lodash';
import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/material/styles';


import { useTranslation } from 'next-i18next';
import { InputBase, Box } from '@mui/material';
import { useUpdateOneWebsiteMutation, } from 'generated';
import Spinner from 'admin/components/Spinner';

import { useJsApiLoader, GoogleMap, InfoWindow, Marker } from '@react-google-maps/api';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import shouldRequire from 'admin/custom/shouldRequire';
import HasVariantField from './hasVariantField'
import ValuesField from './hasVariantField/values'

const libraries = ['geometry', 'drawing', 'places'];

const mapStyles = [
  {
    featureType: 'all',
    elementType: 'all',
    stylers: [
      {
        saturation: '32',
      },
      {
        lightness: '-3',
      },
      {
        visibility: 'on',
      },
      {
        weight: '1.18',
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'landscape',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'landscape.man_made',
    elementType: 'all',
    stylers: [
      {
        saturation: '-70',
      },
      {
        lightness: '14',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'all',
    stylers: [
      {
        saturation: '100',
      },
      {
        lightness: '-14',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
      {
        lightness: '12',
      },
    ],
  },
];
const useStyles = makeStyles((theme) => ({
  // title: {
  //   display: 'none',
  //   [theme.breakpoints.up('sm')]: {
  //     display: 'block',
  //   },
  // },
  // search: {
  //   position: 'relative',
  //   borderRadius: theme.shape.borderRadius,
  //   backgroundColor: alpha(theme.palette.common.white, 0.15),
  //   '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25) },
  //   marginRight: theme.spacing(2),
  //   marginLeft: 0,
  //   width: '100%',
  // },
  // inputRoot: {
  //   color: 'inherit',
  //   width: '100%',
  // },
  // inputInput: {
  //   padding: '5px 10px',
  //   borderRadius: '8px',
  //   width: '100%',
  //   border: '1px solid #ccc',
  //   '&:hover': '1px solid #000',
  // },
  // toolbar: {
  //   display: 'flex', justifyContent: 'space-between',
  // },
  // paper: {
  //   padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100px',
  // },
  // mapContainer: {
  //   width: '100%', height: 'auto'
  // },
  // markerContainer: {
  //   position: 'absolute', transform: 'translate(-50%, -50%)', zIndex: 1, '&:hover': { zIndex: 2 },
  // },
  // pointer: {
  //   cursor: 'pointer',
  // },
}));

const Location = ({ action, register, errors, handleSubmit, onSubmit, setValue, getValues, watch, data }) => {
  const classes = useStyles();
  const { t } = useTranslation('admin');

  const [coord, setCoord] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });
  const [place, setPlace] = useState<{ lat: number; lng: number; address: string }>({ lat: 0, lng: 0, address: '' });
  const [address, setAddress] = useState('');

  const [mapRef, setMapRef] = useState(null);
  const [selected, setSelected] = useState(null);
  const mapRef2 = useRef();

  useEffect(() => {
    if (data?.locationAddress && data?.locationLat && data?.locationLng) {
      setCoord({
        lat: data?.locationLat,
        lng: data?.locationLng,
      });
      setPlace(data);
      setAddress(data?.locationAddress);
    } else {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          setCoord({
            lat: latitude,
            lng: longitude,
          });
        },
        (e) => {
          console.log(e);
        },
      );
    }
  }, [data]);

  const handleSelect = async (value: string) => {
    try {
      const results = await geocodeByAddress(value);
      const latLng = await getLatLng(results[0]);
      setAddress(value);
      setCoord(latLng);
      const locationData = {
        address: value,
        lat: latLng.lat,
        lng: latLng.lng,
      };
      setPlace(locationData);
    } catch (e) {
      console.log(e, 'error');
    }
  };

  const onMapLoad = (map) => {
    mapRef2.current = map;
    setMapRef(map);
  };

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries,
  });

  // console.log(data, place)

  return isLoaded ? (
    <>
      <Box display="flex items-end">
        <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
          {({ getInputProps, suggestions, getSuggestionItemProps }) => (
            <div className={`${classes.search} relative mb-[10px]`}>
              <NormalLabel>{t('searchLocation')}</NormalLabel>
              <InputBase
                classes={{ root: classes.inputRoot, input: classes.inputInput }}
                {...getInputProps({ placeholder: '' })}
              />
              <div className="absolute z-10 w-[100%] break-all top-[60px] text-black cursor-pointer mb-[10px]">
                {suggestions.map((suggestion) => {
                  const style = {
                    backgroundColor: suggestion.active ? '#41b6e6' : '#fff',
                  };

                  return (
                    <div
                      className="py-[10px] px-[5px]"
                      {...getSuggestionItemProps(suggestion, { style })}
                      key={`suggestion-${suggestion.description}`}
                    >
                      {suggestion.description}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
        <Button
          className="ml-[10px]"
          onClick={async () => {
            try {
              if (!place) {
                return;
              }
              setValue('locationLat', place.lat, {
                shouldValidate: true,
                shouldDirty: true,
              });
              setValue('locationLng', place.lng, {
                shouldValidate: true,
                shouldDirty: true,
              });
              setValue('locationAddress', place.address, {
                shouldValidate: true,
                shouldDirty: true,
              });
            } catch (e) {
              console.log(e);
            }
          }}
        >
          {data?.address ? t('update') : t('save')}
        </Button>
      </Box>
      <div className={`${classes.mapContainer} pt-[10px]`}>
        <GoogleMap
          zoom={14}
          center={{ lat: coord.lat, lng: coord.lng }}
          mapContainerClassName="w-[100%] h-[400px]"
          options={{
            disableDefaultUI: true,
            zoomControl: true,
            styles: mapStyles,
          }}
          onLoad={onMapLoad}
        // onDragEnd={onBoundsChanged}
        >
          {
            <Marker
              position={{
                lat: parseFloat(place.lat),
                lng: parseFloat(place.lng),
              }}
              onClick={() => {
                setSelected(place);
              }}
            />
          }
          {selected ? (
            <InfoWindow
              position={{ lat: parseFloat(selected.lat), lng: parseFloat(selected.lng) }}
              onCloseClick={() => {
                setSelected(null);
              }}
            >
              <div>
                <p>{selected.address}</p>
              </div>
            </InfoWindow>
          ) : null}
        </GoogleMap>
      </div>
    </>
  ) : (
    <Spinner />
  );
};


interface Option {
  id: any;
  name: any;
}

const getFieldValidation = (
  field: SchemaField,
  inputValidation: ModelTableProps['inputValidation']
) => {
  const modelName = field.id.split('.')[0];
  return inputValidation
    ? inputValidation[modelName]
      ? inputValidation[modelName][field.name] || {}
      : {}
    : {};
};

const SlugField = ({ tAdmin, model, action, register, errors, handleSubmit, setValue, getValues, watch, data }) => {
  const [slug, setSlug] = useState(data?.slug);
  const [search, setSearch] = useState(false);

  const { data: permissionData } = usePermissionQuery();
  const { data: existSlugData, refetch } = useQuery(gql`query findMany${model.name} ($where: ${model.name}WhereInput) {
    findMany${model.name}(where: $where) {
      id
      slug
    }
  }`, {
    variables: {
      where: {
        active: {
          equals: true,
        },
        slug: {
          equals: slug,
        },
      },
    },
    skip: !search || !slug,
  });
  useEffect(() => {
    if (search && existSlugData) {
      if (existSlugData?.[`findMany${model.name}`]?.length > 0) {
        setSlug(data?.slug);
        alert(tAdmin('slugExist'));
      } else {
        setValue('slug', slug, {
          shouldValidate: true,
          shouldDirty: true,
        });
        alert(tAdmin('slugAllowed'));
      }
      setSearch(false);
    }
  }, [existSlugData, search]);

  return (
    <div>
      <div className="p-2">
        <NormalLabel>{tAdmin('slugVerify')}</NormalLabel>
        <TextField
          onChange={(e) => setSlug(e.target.value.toLowerCase())}
          size="small"
          fullWidth
          value={slug}
        ></TextField>
      </div>
      <div className="p-2">
        <Button
          disabled={!slug?.match(/[a-zA-Z0-9 ]/g)}
          type="button"
          variant="outlined"
          color="inherit"
          onClick={async () => {
            setSearch(true);
            await refetch();
          }}
        >
          {tAdmin('verify')}
        </Button>
      </div>
    </div>
  );
};

const defaultInputs: Omit<FormInputs, 'Upload' | 'Editor'> = {
  Default({ errors,
    required,
    handleSubmit,
    setValue,
    watch, field, data, model, error, register, disabled, value, ui, custom, action, t, tAdmin, control, getValues }) {
    const { lang, inputValidation } = useContext(TableContext);
    const options: any = {
      disabled,
      defaultValue: value
        ? field.type === 'Json'
          ? JSON.stringify(value)
          : field.list
            ? value.join(',')
            : value
        : value,
    };
    if (field.list) {
      options['type'] = 'text';
    } else {
      switch (field.type) {
        case 'Int':
        case 'BigInt':
          options['type'] = 'number';
          break;
        case 'Float':
        case 'Decimal':
          options['type'] = 'number';
          options['step'] = 'any';
          break;
        case 'String':
          options['type'] = 'text';
          break;
      }
    }
    const multiline = field.type === 'String' && field.name === 'description';
    const {
      websiteData,
    } = useContext(TableContext);

    // console.log(field.name, required)
    // React.useEffect(() => {
    //   register(field.name, {
    //     required,
    //     ...getFieldValidation(field, inputValidation),
    //   });
    //   console.log(required, field)
    // }, [register, required]);

    if (field.name === 'values') {
      return <ValuesField getValues={getValues} t={t} custom={custom} ui={ui} field={field} value={value} error={error} register={register} setValue={setValue} watch={watch} control={control} disabled={disabled} />
    }

    if (field.name === 'slug') {
      return <SlugField tAdmin={tAdmin} model={model} action={action} register={register} errors={errors} handleSubmit={handleSubmit} setValue={setValue} getValues={getValues} watch={watch} data={data} />
    }
    return (
      <div className={`w-full ${!custom?.fullWidth && 'sm:w-1/2'} p-2`}>

        <div className='flex mb-1'>
          <Label t={t} custom={custom} lang={lang} field={field} />
          {field?.name === 'creatorEarnings' && <div>&nbsp;(%)</div>}
          {(field?.name === 'stripeFee' || field?.name === 'applicationFee' || field?.name === 'price' || field?.name === 'total' || field?.name === 'amount') && <div>
            {websiteData?.paymentMethod === 'crypto' ? (
              websiteData?.chain?.iconUrl ? (
                <img className='ml-2' src={websiteData?.chain?.iconUrl} alt={websiteData?.chain?.name} />
              ) : (
                websiteData?.chain?.name
              )
            ) : websiteData?.currencyCode ? (
              <>&nbsp;({websiteData?.currencyCode})</>
            ) : <>&nbsp; (usd)</>}
          </div>}

        </div>

        {/* <Input
          {...register(field.name, {
            required: field.required,
            ...getFieldValidation(field, inputValidation),
          })}
          error={t(error?.message)}
          variant="outline"
          className="mb-5"
          {...options}
        /> */}
        <Controller
          control={control}
          name={field.name}
          render={({ field }) => (<>
            <TextField
              sx={disabled ? { "& fieldset": { border: 'none' } } : undefined}
              multiline={multiline}
              rows={multiline ? 3 : 1}
              disabled={disabled || shouldDisable({ action, disableOn: custom.disableOn, record: data })}
              size="small"
              fullWidth
              type={options?.type}
              variant="outlined"
              {...field}
              required={required || shouldRequire({ action, requiredOn: custom.requiredOn, record: data })}
            />
            {field.name === 'transactionHash' && <a target='_blank' href={`https://polygonscan.com/tx/${value}`}><Button style={{ marginTop: '5px' }}> {t('verify')}</Button></a>}
            {field.name === 'walletAddress' && <a target='_blank' href={`https://polygonscan.com/address/${value}`}><Button style={{ marginTop: '5px' }}> {t('verify')}</Button></a>}
            {field.name === 'editionAddress' && !getValues()?.isExternalNft && <a target='_blank' href={`https://polygonscan.com/address/${value}`}><Button> {t('verify')}</Button></a>}
            {field.name === 'editionAddress' && getValues()?.isExternalNft && getValues()?.externalNftChain === 'Ethereum' && <a target='_blank' href={`https://etherscan.io/address/${getValues()?.editionAddress}`}><Button style={{ marginTop: '5px' }}> {t('verify')}</Button></a>}
            {field.name === 'editionAddress' && getValues()?.isExternalNft && getValues()?.externalNftChain === 'Polygon' && <a target='_blank' href={`https://polygonscan.com/address/${getValues()?.editionAddress}`}><Button style={{ marginTop: '5px' }}> {t('verify')}</Button></a>}
            {/* {field.name === 'editionAddress' && getValues()?.isExternalNft && getValues()?.externalNftChain === 'klaytn' && <a target='_blank' href={`https://scope.klaytn.com/account/${getValues()?.editionAddress}`}><Button style={{ marginTop: '5px' }}> {t('verify')}</Button></a>} */}

          </>
          )}
        />
        {/* <TextField
          fullWidth
          {...register(field.name, {
            required: field.required,
            ...getFieldValidation(field, inputValidation),
          })}
          {...options}
        /> */}
        {error && <FormHelperText error={true}>{t(`validation:${error.message}`)}</FormHelperText>}

        {/* <input
          className={classNames('w-full', inputClasses, error ? 'border-red-400' : '')}
          {...register(field.name, {
            required: field.required,
            ...getFieldValidation(field, inputValidation),
          })}
          {...options}
        /> */}
      </div>
    );
  },
  Enum({ field, value, error, register, setValue, data, control, disabled, ui, action, custom, t }) {
    const [state, setState] = useState(value);
    const enumType = useEnum(field.type);
    const { lang, dir, inputValidation } = useContext(TableContext);
    React.useEffect(() => {
      register(field.name, {
        required: field.required,
        ...getFieldValidation(field, inputValidation),
      });
    }, [register]);

    const options: Option[] = field.required ? [] : [{ id: null, name: lang.all }];
    if (enumType) {
      options.push(...enumType.fields.map((item) => ({ id: item, name: item })));
    }
    return (
      <div className={`w-full ${!custom?.fullWidth && 'sm:w-1/2'} p-2`}>
        <FormControl fullWidth>
          <Label t={t} custom={custom} lang={lang} field={field} />
          {/* <SelectInput
          name={field.name}
          control={control}
          defaultValue={custom?.enumValues.find((enumValue) => enumValue.name === state)}
          getOptionLabel={(option: any) => t(option?.intl?.titleId)}
          getOptionValue={(option: any) => option.name}
          options={custom?.enumValues}
          isLoading={null}
        /> */}
          {field.name === 'buttonColor' ? <div style={{ flexWrap: 'wrap', display: 'flex' }}>{Object.keys(themes).filter((key) => key !== 'base').map((key) => {
            return <div onClick={() => {
              setState(key);
              setValue(field.name, key, {
                shouldValidate: !!key,
                shouldDirty: true,
              });
            }} style={{ border: key === state ? '2px black solid' : '', margin: '5px', width: '20px', height: '20px', borderRadius: '20px', backgroundColor: themes?.[key]?.accent400 }}></div>
          })}</div> : <>{custom?.isEnum && custom?.enumValues && (
            <Select
              sx={disabled ? { "& fieldset": { border: 'none' } } : undefined}
              disabled={disabled || shouldDisable({ action, disableOn: custom.disableOn, record: data })}
              size="small"
              value={state}
              onChange={(e) => {
                setState(e.target.value);
                setValue(field.name, e.target.value, {
                  shouldValidate: !!e.target.value,
                  shouldDirty: true,
                });
              }}
            >
              {custom?.enumValues.map((enumValue) => {
                return (
                  <MenuItem value={enumValue.name} key={enumValue.name}>
                    {t(enumValue.intl.titleId)}
                  </MenuItem>
                );
              })}
            </Select>
          )}</>}

          {error && <FormHelperText error={true}>{t(`validation:${error.message}`)}</FormHelperText>}
        </FormControl>
      </div>
    );
  },

  Object({ field, value, error, register, setValue, disabled, ui, custom, t, tAdmin, pagesPath }) {
    const {
      schema: { models },
      lang,
    } = useContext(TableContext);
    const model = models.find((item) => item.id === field.type)!;
    const [modal, setModal] = useState(false);
    const [state, setSate] = useState(value);
    const [modelUI, setModelUI] = useState(null)
    const [getData, { data, loading }] = useLazyQuery(queryDocument(models, field.type, true));
    const result = data ? data[`findUnique${field.type}`] : {};

    if (
      state &&
      Object.keys(state).length > 0 &&
      !loading &&
      state[model.idField] !== result[model.idField]
    ) {
      getData({
        variables: {
          where: {
            [model.idField]: state[model.idField],
          },
        },
      });
    }

    React.useEffect(() => {
      register(field.name, { required: field.required });
    }, [register]);

    React.useEffect(() => {

      try {
        if (model?.id && pagesPath && !modelUI) {
          let modelUIJson = require(`pages${pagesPath}${model.name}`)?.[`${model.id}UI`]
          setModelUI(modelUIJson)
        }
      } catch (error) {
        console.log(error)
      }

    }, [model, modelUI]);

    // console.log(modelUI, 'this is modelUI')
    // const modelUI = require(`ui/${model.id}`).default;
    return (
      <div style={{ width: '100%' }}>
        {/* <div className="ml-2 mb-2">{model?.displayFields?.[0]}: {getDisplayName(state, model)}</div> */}
        <div className='mb-3'>{tAdmin('browse')}</div>
        {result && <Link href={`${pagesPath}${model.name}?${model.update ? 'update' : 'view'}=${result?.id}`}>
          <Button style={{ width: '100%', textTransform: 'none', display: 'flex', justifyContent: 'space-around' }} variant="outlined">
            {model?.fields?.find((field) => field.name === 'imageObj') && <img width='100' height='100' style={{ objectFit: 'cover' }} src={result?.imageObj?.url ? result?.imageObj?.url : '/images/placeholder.svg'} />}
            {result?.[model.displayFields[0]] ? getDisplayName(state, model) : result?.walletAddress ? result?.walletAddress : result?.id}
          </Button>
        </Link>}
        <Button onClick={() => setModal(true)}>Select</Button>
        <Modal on={modal} toggle={() => setModal(!modal)}>
          <DynamicTable
            ui={modelUI}
            model={model.id}
            inEdit
            connect={Object.keys(state).length > 0 ? result : {}}
            onConnect={(_value) => {
              setSate(_value);
              setValue(field.name, _value[model.idField], {
                shouldValidate: true,
                shouldDirty: true,
              });
              setModal(!modal);
            }}
          />
        </Modal>
      </div>
    );
    // return (
    //   <div className={`w-full p-2`}>
    //     <Modal on={modal} toggle={() => setModal(!modal)}>
    //       <DynamicTable
    //         ui={modelUI}
    //         model={model.id}
    //         inEdit
    //         connect={Object.keys(state).length > 0 ? result : {}}
    //         onConnect={(_value) => {
    //           setSate(_value);
    //           setValue(field.name, _value[model.idField], {
    //             shouldValidate: true,
    //             shouldDirty: true,
    //           });
    //           setModal(!modal);
    //         }}
    //       />
    //     </Modal>
    //     <Label t={t} custom={custom} lang={lang} field={field} />

    //     <div className="w-full relative">
    //       <button
    //         disabled={disabled}
    //         type="button"
    //         className={classNames(
    //           'absolute top-2.5 left-1',
    //           buttonClasses,
    //           'rounded-md bg-transparent text-blue-600 hover:bg-blue-100 hover:bg-opacity-25'
    //         )}
    //         onClick={() => setModal(!modal)}
    //       >
    //         <SearchIcon className="h-5 w-5" />
    //       </button>
    //       {!field.required && (
    //         <button
    //           disabled={disabled}
    //           type="button"
    //           className={classNames(
    //             'absolute top-2.5 right-1',
    //             buttonClasses,
    //             'rounded-md bg-transparent text-red-600 hover:bg-red-100 hover:bg-opacity-25'
    //           )}
    //           onClick={() => {
    //             setSate({});
    //             setValue(field.name, null, {
    //               shouldValidate: !field.required,
    //               shouldDirty: true,
    //             });
    //           }}
    //         >
    //           <XCircleIcon className="h-5 w-5" />
    //         </button>
    //       )}
    //       <input className={`px-8 ${inputClasses}`} value={getDisplayName(state, model)} disabled />
    //     </div>
    //     {error && <FormHelperText error={true}>{error.message}</FormHelperText>}
    //   </div>
    // );
  },
  Date({ field, value, setValue, error, register, disabled, ui, custom, t }) {
    const { lang, inputValidation } = useContext(TableContext);
    const [state, setState] = useState(value);
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className={`w-full ${!custom?.fullWidth && 'sm:w-1/2'} p-2`}>
          <Label t={t} custom={custom} lang={lang} field={field} />

          <DateTimePicker
            disabled={disabled || field.name === 'createdAt' || field.name === 'updatedAt'}
            value={new Date(state)}
            renderInput={(params) => <TextField size="small" {...params} />}
            onChange={(val) => {
              setState(val);
              setValue(field.name, val, {
                shouldValidate: !!val,
                shouldDirty: true,
              });
            }}
          />

          {/* {disabled ? (
          <div>{getDate(new Date(value))}</div>
        ) : (
          <input
            disabled={disabled}
            className={classNames('w-full', inputClasses, error ? 'border-red-400' : '')}
            type="datetime-local"
            disabled={disabled}
            defaultValue={value ? getDate(new Date(value)) : undefined}
            {...register(field.name, {
              required: field.required,
              ...getFieldValidation(field, inputValidation),
            })}
          />
        )} */}
          {error && <FormHelperText error={true}>{t(`validation:${error.message}`)}</FormHelperText>}
        </div>
      </LocalizationProvider>
    );
  },
  Boolean({ field, value, register, setValue, disabled, ui, custom, t, tAdmin, error, action,
    errors,
    handleSubmit,
    onSubmit,
    getValues,
    watch,
    data, control, clearErrors }) {
    const [state, setState] = useState(value);
    const { lang, inputValidation } = useContext(TableContext);


    // React.useEffect(() => {
    //   watch(field.name);
    // }, [watch]);

    React.useEffect(() => {
      register(field.name);
    }, [register]);
    // console.log('data: ', value, data, errors)
    // if (field.name === 'hasVariants') {
    //   return <HasVariantField getValues={getValues} t={t} custom={custom} ui={ui} field={field} value={value} error={error} register={register} setValue={setValue} watch={watch} control={control} disabled={disabled} />
    // }

    // useEffect(() => {
    //   setValue(field.name, state, {
    //     shouldValidate: true,
    //     shouldDirty: true,
    //   });
    //   console.log('state: ', state)
    //   console.log('value: ', value)
    // }, [state])

    return (
      <div className={`w-full ${!custom?.fullWidth && 'sm:w-1/2'} p-2`}>
        <Label error={error} t={t} custom={custom} lang={lang} field={field} />

        <FormControlLabel
          value={value ? 'yes' : 'no'}
          control={<Switch
            disabled={disabled}
            checked={value}
            onChange={(e) => {

              setValue(field.name, e.target.checked, {
                shouldValidate: true,
                shouldDirty: true,
              });
            }}
          />}
          label={state ? tAdmin('yes') : tAdmin('no')}
          labelPlacement={state ? 'end' : 'start'}
        />
        {field.name === 'hasLocation' && state && <Location action={action} register={register} errors={errors} handleSubmit={handleSubmit} onSubmit={onSubmit} setValue={setValue} getValues={getValues} watch={watch} data={data} />}
        {/* <Checkbox
          disabled={disabled}
          onChange={(e) => onChangeHandler(e.target.checked)}
          checked={!!state}
        /> */}
        {/* <Select
          size="small"
          value={state}
          onChange={(e) => {
            setState(e.target.value);
            setValue(field.name, e.target.value, {
              shouldValidate: true,
              shouldDirty: true,
            });
          }}
        >
          <MenuItem value={true}>true</MenuItem>
          <MenuItem value={false}>false</MenuItem>
        </Select> */}
        {error && <FormHelperText error={true}>{t(`validation:${error.message}`)}</FormHelperText>}
      </div>
    );
  },
  Attachment({
    field,
    value,
    register,
    setValue,
    disabled,
    ui,
    custom,
    t,
    error,
    pagesPath,
    permission,
    getValues,
    model
  }) {
    const [state, setState] = useState(value);
    const [type, setType] = useState(null)

    useEffect(() => {
      if (type && field?.name === 'attachmentObj') {
        setValue('attachmentType', type, { shouldValidate: true, shouldDirty: true });
      }
    }, [type])

    const { lang, inputValidation } = useContext(TableContext);
    let attachmentType = '';
    switch (field.name) {
      case 'gallery':
      case 'logoObj':
        attachmentType = 'image';
        break;
      case 'coverObj':
        attachmentType = 'image';
        break;
      case 'imageObj':
        attachmentType = 'image';
        break;
      case 'documentObj':
        attachmentType = 'document';
        break;
      case 'videoObj':
      case 'videoPreviewObj':
        attachmentType = 'video';
        break;
      case 'audioObj':
      case 'audioPreviewObj':
        attachmentType = 'audio';
        break;

      default:
        break;
    }
    const onChangeHandler = async (newFiles: any) => {
      if (field.name === 'gallery') {
        setState([...state ? state : [], ...newFiles]);
        setValue(field.name, [...state ? state : [], ...newFiles], {
          shouldValidate: true,
          shouldDirty: true,
        });
      } else {
        setState(newFiles[0]);
        setValue(field.name, newFiles[0], { shouldValidate: true, shouldDirty: true });
      }
    };

    React.useEffect(() => {
      register(field.name);
    }, [register]);

    React.useEffect(() => {
      if (field.name === 'imageObj' && getValues()?.imageObj?.url) {
        setState(getValues()?.imageObj)
      }
    }, [getValues()])
    const isAttachmentOrPreviewField = field.name === 'attachmentObj' || field.name === 'previewObj'

    return (
      <div className={`flex flex-wrap w-full p-2`}>
        <Label t={t} custom={custom} lang={lang} field={field} />
        <div className="w-full">
          {!disabled && (
            <Upload
              setType={setType}
              field={field}
              setState={setState}
              setValue={setValue}
              model={model}
              id={getValues()?.id ?? 'new'}
              path={permission.admin + '/' + permission[permission.admin] + `/${attachmentType}/`}
              attachmentType={attachmentType}
              maxFileSize={10000000000}
              autoProceed={false}
              maxNumberOfFiles={field.name === 'gallery' ? 5 : 1}
              onComplete={onChangeHandler}
            />
          )}
          {state && (attachmentType === 'image' || (isAttachmentOrPreviewField && getValues()?.attachmentType === 'image')) && (
            <Preview
              disabled={disabled}
              showPreview={true}
              onChange={(newValue) => {
                setState(newValue);
                setValue(field.name, newValue, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
              files={
                Array.isArray(state) ? state : state && Object.keys(state).length > 0 ? [state] : []
              }
              isMultiple={field.name === 'gallery' ? true : false}
            />
          )}
          {state?.url && (attachmentType === 'audio' || (isAttachmentOrPreviewField && getValues()?.attachmentType === 'audio')) && (
            <audio controls>
              <source src={state?.url} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          )}
          {state?.url && (attachmentType === 'video' || (isAttachmentOrPreviewField && getValues()?.attachmentType === 'video')) && (
            <video
              controls
              style={{ height: '400px', marginRight: 'auto', marginLeft: 'auto' }}
              src={state?.url}
            />
          )}
          {state?.url && (attachmentType === 'document' || (isAttachmentOrPreviewField && getValues()?.attachmentType === 'document')) && (
            <a target='_blank' href={state?.url}> <Button>Preview</Button></a>

          )}
        </div>
        {error && <FormHelperText error={true}>{t(`validation:${error.message}`)}</FormHelperText>}
      </div>
    );
  },
  Content({ field, value, register, setValue, disabled, ui, custom, t, data, model, error }) {
    const { lang, inputValidation, permissionData, websiteData } = useContext(TableContext);

    if (!data || !model) {
      return null;
    }

    return (
      <div>
        <div>
          <Label t={t} custom={custom} field={field} lang={lang} />
        </div>
        <div style={{ marginTop: '10px', marginBottom: '10px' }}>
          {websiteData?.slug && model?.name === 'Page' &&
            <a target='_blank' href={`https://${websiteData?.slug}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/pages/${data?.slug}`}>
              <Button>Preview</Button>
            </a>}
          <Link href={`/admin/Organization/Organization/DesignPage?id=${data?.id}`}>
            <Button>Edit</Button>
          </Link>

        </div>
        {data?.content && <div style={{
          width: '400px',
          height: '400px',
        }}>
          <div style={{
            transform: 'scale(0.5)',
            transformOrigin: '0 0',
            height: '800px',
            width: '800px',
            overflow: 'scroll'
          }}>
            <CraftProvider
              websiteData={websiteData}
              pageData={data}
              inEdit={true}
            >
              <Editor
                resolver={{
                  // Embed,
                  Resource,
                  HtmlTag,
                  HtmlButton,
                  HtmlText,
                  HtmlSection,
                  HtmlImg,
                  Root,
                  Collection,
                }}
                enabled={false}
                onRender={RenderNode}
              >
                <Frame data={data?.content} />
              </Editor>
            </CraftProvider>
          </div>
        </div>}
      </div >
    );
  },
  Custom({ component, ...props }) {
    const CustomComponent = component;
    return <CustomComponent {...props} />;
  },
};

export const Label = ({ t, custom, field, lang }) => {
  if (t && custom?.intl) {
    return (
      <div style={{ marginBottom: '5px' }}>
        <Typography>
          {t(custom.intl['titleId'])}
          {custom?.intl?.descriptionId && (
            <Tooltip placement="top-start" title={t(custom.intl['descriptionId'])}>
              <HelpIcon color="disabled" style={{ marginLeft: '5px', fontSize: '15px' }} />
            </Tooltip>
          )}
        </Typography>
      </div>
    );
  } else {
    return <p>{field.name}</p>;
  }
};

export const Inputs: FormInputs = {
  ...defaultInputs,
  //   Upload: defaultInputs.Default,
  // Editor: defaultInputs.Default,
};
