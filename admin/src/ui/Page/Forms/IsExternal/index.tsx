import React, { useEffect, useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useTranslation } from 'next-i18next';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useTheme } from '@mui/material/styles';
import { Button, FormHelperText, TextField } from '@mui/material';
import { Check, Close } from '@mui/icons-material';
import Label from 'components/ui/label';
import { useGetMetadataMutation } from '../../../../generated';

const IsExternal = ({ action, register, errors, handleSubmit, setValue, getValues, watch, data }) => {
  const [state, setState] = useState({
    externalUrl: getValues()?.externalUrl,
    isExternalLink: getValues()?.isExternalLink ?? false,
  });
  const { t: tAdmin } = useTranslation('admin');
  const { t: tVal } = useTranslation(['validation']);

  const [loading, setLoading] = useState(false);

  const [getMetadata] = useGetMetadataMutation();

  const captureMetadata = async () => {
    setLoading(true);

    if (
      !state?.externalUrl?.match(
        /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm,
      ) ||
      state?.externalUrl?.match(
        /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm,
      )?.length === 0
    ) {
      console.log(state);
      alert(tAdmin('invalidUrl'));
    } else {
      try {
        const { data } = await getMetadata({
          variables: {
            pageUrl: state?.externalUrl,
          },
        });
        const { meta } = data?.getMetadata;
        if (meta?.title) {
          setValue('name', meta.title, {
            shouldValidate: true,
            shouldDirty: true,
          });
        }
        if (meta?.description) {
          setValue('description', meta.description, {
            shouldValidate: true,
            shouldDirty: true,
          });
        }
        if (meta?.image) {
          setValue(
            'imageObj',
            {
              url: meta?.image,
            },
            {
              shouldValidate: true,
              shouldDirty: true,
            },
          );
        }
      } catch (err) {
        alert(tAdmin('cantFetch'));
        console.log(err);
      }
    }
    setLoading(false);
  };
  useEffect(() => {
    if (state?.isExternalLink) {
      setValue('isExternalLink', state?.isExternalLink, {
        shouldValidate: true,
        shouldDirty: true,
      });
    } else {
      setValue('isExternalLink', false, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [state]);

  React.useEffect(() => {
    register('externalUrl');
  }, [register]);

  return (
    <div>
      <RadioGroup
        defaultValue={state?.isExternalLink ? 'yes' : 'no'}
        value={state?.isExternalLink ? 'yes' : 'no'}
        onChange={(e) => {
          const value = e.target.value === 'yes' ? true : false;
          setState({
            ...state,
            isExternalLink: value,
          });
          setValue('isExternalLink', value, {
            shouldValidate: true,
            shouldDirty: true,
          });

          if (!value) {
            setValue('externalUrl', null, {
              shouldValidate: true,
              shouldDirty: true,
            });
          }
        }}
      >
        <FormControlLabel
          disabled={action === 'view' || action === 'update'}
          value={'yes'}
          control={<Radio />}
          label={tAdmin('yes')}
        />
        <FormControlLabel
          disabled={action === 'view' || action === 'update'}
          value={'no'}
          control={<Radio />}
          label={tAdmin('no')}
        />
      </RadioGroup>
      {state?.isExternalLink && (
        <div className="p-2">
          <Label>{tAdmin('url')}</Label>
          <TextField
            onChange={(e) => {
              setValue('externalUrl', e.target.value, {
                shouldValidate: true,
                shouldDirty: true,
              });
              setState({
                ...state,
                externalUrl: e.target.value,
              });
            }}
            size="small"
            fullWidth
            value={state?.externalUrl}
          ></TextField>
          <Button disabled={loading} onClick={captureMetadata} style={{ marginTop: '5px' }}>
            {loading ? tAdmin('loading') : tAdmin('getMetadata')}
          </Button>
          {errors?.externalUrl && (
            <FormHelperText error={true}>{tVal(`validation:${errors?.externalUrl?.message}`)}</FormHelperText>
          )}
        </div>
      )}
    </div>
  );
};

export default {
  custom: true,
  hideOn: null,
  disableOn: null,
  component: IsExternal,
  intl: {
    titleId: '_Admin.Website._PageGroup.Media._Page.Page._Form.IsExternal._Title',
    title: 'IsExternal',
    descriptionId: '_Admin.Website._PageGroup.Media._Page.Page._Form.IsExternal._Description',
    description: 'IsExternal Description',
  },
  order: 1,
};
