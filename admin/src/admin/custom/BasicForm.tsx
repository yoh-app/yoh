import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Spinner from '../components/Spinner';
import { Inputs } from '../PrismaTable/Form/Inputs';
import useActions from '../PrismaTable/Form/useActions';
import { TableContext } from '../PrismaTable/Context';
import { SchemaModel } from '../types';
import { buttonClasses, classNames } from '../components/css';
import { getDate } from '../PrismaTable/Form/getDate';
import shouldHide from './shouldHide';
import shouldRequire from './shouldRequire';
import shouldDisable from './shouldDisable';

import {
  Box,
  Button,
  TextField,
  Typography,
  FormHelperText,
  Container,
  CardContent,
  Card,
  IconButton,
  CardMedia,
  Grid,
  FormControlLabel,
  Switch,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { UploadAvatar } from 'components/upload';

import HeaderDashboard from 'components/HeaderDashboard';
import { useTranslation } from 'next-i18next';

import Tooltip from '@mui/material/Tooltip';
import HelpIcon from '@mui/icons-material/Help';
import Masonry from '@mui/lab/Masonry';
import { usePermissionQuery } from 'generated';
export interface FormProps {
  action: 'update' | 'create' | 'view';
  model: string;
  data: any;
  onCancel: () => void;
  onSave: () => void;
}

const getDefaultValues = (
  action: FormProps['action'],
  model: SchemaModel,
  data: any,
  models: SchemaModel[]
) => {
  const defaultValues: any = {};
  model.fields
    .filter(
      (field) =>
        (((field.update || field.read) && action !== 'create') ||
          (action === 'create' && field.create) ||
          (field.list && field.kind === 'object' && data[field.name])) &&
        !(
          field.list &&
          field.kind === 'object' &&
          (!data?.[field.name] || data[field.name]?.length === 0)
        ) &&
        !field.relationField
    )
    .slice()
    .sort((a, b) => a.order - b.order)
    .forEach((field) => {
      if (field.list && field.kind === 'object') {
        defaultValues[field.name] = data[field.name];
      } else if (!data?.[field.name]) {
        if (field.type === 'Json') {
          if (field.list) {
            defaultValues[field.name] = [];
          } else {
            defaultValues[field.name] = {};
          }
        } else {
          defaultValues[field.name] = data?.[field.name];
        }
      } else {
        const valueHandler = () => {
          if (field.type === 'DateTime') {
            return getDate(new Date(data[field.name]));
          } else if (field.type === 'Json') {
            return data[field.name];
          } else if (field.list) {
            return data[field.name].join(',');
          } else if (field.kind === 'object') {
            const fieldModel = models.find((item) => item.id === field.type)!;
            return data[field.name][fieldModel?.idField];
          } else {
            return data[field.name];
          }
        };

        defaultValues[field.name] = valueHandler();
      }
    });
  if (model.name === 'Organization') {
    // defaultValues.host = window.location.host
  }
  // if (model.name === 'Product') {
  //   if (window.location.pathname.toLowerCase().includes('item')) {
  //     defaultValues.productType = 'item'
  //   } else if (window.location.pathname.toLowerCase().includes('booking')) {
  //     defaultValues.productType = 'booking'
  //   } else if (window.location.pathname.toLowerCase().includes('nft')) {
  //     defaultValues.productType = 'nft'
  //   } else {
  //     defaultValues.productType = 'nft'
  //   }
  // } else if (model.name === 'Website') {
  //   if (window.location.origin.includes('pounds')) {
  //     defaultValues.app = 'pounds'
  //   } else if (window.location.origin.includes('nakama')) {
  //     defaultValues.app = 'nakama'
  //   } else if (window.location.origin.includes('dlbs')) {
  //     defaultValues.app = 'dlbs'
  //   } else if (window.location.origin.includes('yoh')) {
  //     defaultValues.app = 'yoh'
  //   } else {
  //     defaultValues.app = 'yoh'
  //   }
  // }
  return defaultValues;
};

const Form: React.FC<FormProps> = ({ action, model: modelName, data, onCancel, onSave, ui }) => {
  const {
    schema: { models },
    formInputs,
    lang,
    pagesPath,
    permissionData
  } = useContext(TableContext);
  const model = models.find((item) => item.id === modelName)!;
  const { onSubmit, loading } = useActions(model, data, action, onSave);
  const { t } = useTranslation(['generated', 'validation']);
  const { t: tAdmin } = useTranslation('admin')
  const { register, handleSubmit, setValue, getValues, watch, control, formState, getFieldState } = useForm({
    defaultValues: getDefaultValues(action, model, data, models),
    ...(ui?.yupSchema
      ? {
        resolver: yupResolver(ui?.yupSchema),
      }
      : undefined),
  });
  const { errors, isDirty } = formState;

  const InputComponents = formInputs
    ? {
      ...Inputs,
      ...formInputs,
    }
    : Inputs;

  const activeField = ui?.forms?.find((form) => {
    const activeFormField = form?.formFields?.find((formField) => {
      if (formField.name === 'active') {
        return true;
      }
    });
    return !!activeFormField;
  });


  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : '';
  // const origin = 'http://www.mzyme.com'
  // exist represents whether to show image, imageField represents whether its editable
  const imageFieldExist = model.fields.find((field) => field.name === 'imageObj');
  const descriptionFieldExist = model.fields.find((field) => field.name === 'description');
  return (
    <Container style={{ padding: 0 }}>
      {action === 'create' && (
        <div>
          {onCancel && <div style={{ float: 'right' }}>
            <IconButton
              onClick={onCancel}
              color="primary"
              component="span"
            >
              <CloseIcon />
            </IconButton>
          </div>}

          {/* <div>
            <Typography gutterBottom variant="h4" sx={{ color: 'text.primary' }}>
              {t(ui?.crudIntl ? ui.crudIntl['createTitleId'] : ui?.intl['titleId'])}
            </Typography>
            <Typography gutterBottom variant="body1" sx={{ color: 'text.secondary' }}>
              {t(ui?.crudIntl ? ui.crudIntl['createDescriptionId'] : ui?.intl['descriptionId'])}
            </Typography>
          </div> */}
          <HeaderDashboard
            heading={t(ui?.crudIntl ? ui.crudIntl['createTitleId'] : ui?.intl['titleId'])}
            links={[]}
            buttons={[]}
          />
          {/* <HeaderDashboard
            heading={t(ui?.crudIntl ? ui.crudIntl['createTitleId'] : ui?.intl['titleId'])}
            description={t(ui?.crudIntl ? ui.crudIntl['createDescriptionId'] : ui?.intl['descriptionId'])}
            links={[]}
            buttons={[]}
          /> */}

          {/* <HeaderDashboard
            action={action}
            heading={t(ui?.crudIntl ? ui.crudIntl['createTitleId'] : ui?.intl['titleId'])}
            description={t(ui?.crudIntl ? ui.crudIntl['createDescriptionId'] : ui?.intl['descriptionId'])}
            links={[]}
          /> */}
        </div>
      )}
      {/* <Grid className="px-5 mb-3" container>
        <Grid item xs={12} md={4}>
          <Typography gutterBottom variant="h6">
            {getValues(model.displayFields[0])}
          </Typography>
          {descriptionFieldExist && <Typography gutterBottom>{getValues('description')}</Typography>}
        </Grid>
        <Grid item xs={12} md={8}>
          {imageFieldExist && getValues('imageObj')?.url && (
            <img style={{ maxHeight: '400px' }} src={getValues('imageObj')?.url} />
          )}
        </Grid>
      </Grid> */}
      <form onSubmit={handleSubmit(onSubmit)} style={{ overflow: 'auto' }}>
        <div
          style={{ width: '500px', minHeight: '500px' }}
          className={`relative py-4 flex-auto overflow-auto`}
          style={{ overflow: 'visible' }}
        >
          {loading && <Spinner />}
          <Masonry columns={{ xs: 1, md: ui.forms?.length > 1 ? 2 : 1 }} spacing={{ xs: 0, md: 3 }}>
            {ui?.forms?.filter((_form) => {
              if (_form.app) {
                if (_form.app.filter((_app) =>
                  origin.includes(_app)
                )?.length > 0) {

                  return true
                } else {

                  return false
                }
              }
              return true
            }).map((form, index) => {
              const formFields = model.fields.filter((field) =>
                form?.formFields?.find((formField) => formField.name === field.name)
              );

              if (form?.custom) {
                if (
                  form?.hideOn &&
                  shouldHide({ hideOn: form?.hideOn, record: getValues(), action })
                ) {
                  return null;
                }
                const Component = form.component;
                return (
                  <div>
                    {form?.intl && (
                      <div>
                        <Typography gutterBottom variant="subtitle1" sx={{ color: 'text.primary' }}>
                          {t(form.intl['titleId'])}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="body1"
                          sx={{ color: 'text.secondary' }}
                        >
                          {t(form.intl['descriptionId'])}
                        </Typography>
                      </div>
                    )}
                    <Card style={{ position: 'static' }} key={index} className="mb-4">
                      <CardContent>
                        <Component
                          getFieldState={getFieldState}
                          action={action}
                          register={register}
                          errors={errors}
                          handleSubmit={handleSubmit}
                          setValue={setValue}
                          getValues={getValues}
                          watch={watch}
                          data={data}
                        />
                      </CardContent>
                    </Card>
                  </div>
                );
              }

              if (
                form?.hideOn &&
                shouldHide({ hideOn: form?.hideOn, record: getValues(), action })
              ) {
                return null;
                // return (
                //   <>
                //     {form.formFields.map((formField, index) => {
                //       return (
                //         <input
                //           key={index}
                //           hidden
                //           {...register(formField.name, {
                //             shouldUnregister: true,
                //           })}
                //         />
                //       );
                //     })}
                //   </>
                // );
              }
              return (
                <div>
                  {form?.intl && (
                    <div>
                      <Typography gutterBottom variant="subtitle1" sx={{ color: 'text.primary' }}>
                        {t(form.intl['titleId'])}
                      </Typography>
                      <Typography gutterBottom variant="body1" sx={{ color: 'text.secondary' }}>
                        {t(form.intl['descriptionId'])}
                      </Typography>
                    </div>
                  )}
                  <Card style={{ position: 'static' }} key={index} className="mb-4">
                    <CardContent>
                      <div className="flex flex-wrap w-full mb-8">
                        {formFields
                          .filter(
                            (field) =>
                              ((action !== 'view' && field[action]) ||
                                (['update', 'view'].includes(action) &&
                                  (field.read || field.update))) &&
                              !(field.list && field.kind === 'object') &&
                              !field.relationField
                          )
                          .slice()
                          .sort((a, b) => {
                            const fieldA = form?.formFields?.find(
                              (formField) => formField.name === a.name
                            );
                            const fieldB = form?.formFields?.find(
                              (formField) => formField.name === b.name
                            );

                            return fieldA?.order - fieldB?.order;
                          })
                          .map((field) => {
                            const existField = form?.formFields?.find(
                              (formField) => formField.name === field.name
                            );

                            const options = {
                              // required: shouldRequire({ action, requiredOn: existField.requiredOn, record: data }),
                              getFieldState,
                              onSubmit,
                              handleSubmit,
                              permission: permissionData,
                              pagesPath,
                              t,
                              tAdmin,
                              model,
                              custom: {
                                ...existField,
                                required: shouldRequire({ action, requiredOn: existField.requiredOn, record: data })
                              },
                              key: field.id,
                              data,
                              // required: shouldRequire({ action, requiredOn: existField.requiredOn, record: data }),
                              field: {
                                ...field,
                              },
                              value: data?.[field.name],
                              error: errors[field.name],
                              errors,
                              register,
                              setValue,
                              getValues,
                              watch,
                              control,
                              action,
                              disabled: (action === 'update' && !field.update) || action === 'view',
                            };
                            if (
                              (existField?.hideOn &&
                                shouldHide({
                                  record: getValues(),
                                  action,
                                  hideOn: existField.hideOn,
                                }))
                              //   ||
                              // (existField?.hideOn && existField?.hideOn?.field?.name && !getValues()[existField.hideOn.field.name])
                            ) {
                              return null;
                            }

                            if (existField.custom) {
                              return (
                                <InputComponents.Custom
                                  component={existField.custom}
                                  {...options}
                                />
                              );
                            }
                            if (field.name === 'content')
                              return <InputComponents.Content {...options} />;
                            if (
                              field.name === 'attachmentObj' ||
                              field.name === 'previewObj' ||
                              field.name === 'imageObj' ||
                              field.name === 'logoObj' ||
                              field.name === 'coverObj' ||
                              field.name === 'audioObj' ||
                              field.name === 'videoObj' ||
                              field.name === 'videoPreviewObj' ||
                              field.name === 'audioPreviewObj' ||
                              field.name === 'documentObj' ||
                              field.name === 'gallery'
                            )
                              return <InputComponents.Attachment {...options} />;
                            if (field.kind === 'enum') return <InputComponents.Enum {...options} />;
                            if (field.kind === 'object')
                              return (
                                <InputComponents.Object
                                  {...options}
                                  value={data?.[field.name] ? data[field.name] : {}}
                                />
                              );
                            if (field.editor) return <InputComponents.Editor {...options} />;
                            if (field.upload) return <InputComponents.Upload {...options} />;
                            switch (field.type) {
                              case 'Boolean':
                                return <InputComponents.Boolean {...options} />;
                              case 'DateTime':
                                return <InputComponents.Date {...options} />;
                              default:
                                return <InputComponents.Default {...options} />;
                            }
                            if (field.list) {
                              return <InputComponents.Default {...options} />;
                            }
                          })}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </Masonry>
        </div>
        {/* <div className="flex justify-end py-4 px-5 rounded-b border-t border-gray-100">
          {action === 'create' && (
            <button
              className={classNames(
                buttonClasses,
                'rounded-md py-2 px-4 bg-transparent text-red-600 hover:bg-red-100 hover:bg-opacity-25',
              )}
              type="button"
              onClick={onCancel}
            >
              {action !== 'view' ? lang.cancel : lang.close}
            </button>
          )}
          {action !== 'view' && (
            <button
              className={classNames(
                buttonClasses,
                'rounded-md py-2 px-4 bg-green-500 text-white active:bg-green-600 shadow hover:bg-green-800',
              )}
              type="submit"
              disabled={Object.keys(errors).length !== 0 || !isDirty}
            >
              {lang.save}
            </button>
          )}
        </div> */}

        {action !== 'view' && (
          <div className="text-center">
            <Button
              type="submit"
            >
              {lang.save}
            </Button>
          </div>
        )}
        {/* {action === 'update' && (
          <div
            style={{
              cursor: 'pointer',
              position: 'fixed',
              bottom: 0,
              background: 'black',
              width: '100%',
              color: 'white',
              height: '50px',
              lineHeight: '50px',
              textAlign: 'center',
              left: 0,
            }}
            className="text-center"
          >
            {lang.save}
          </div>
        )} */}
      </form>
    </Container>
  );
};
export default Form;