import * as Yup from 'yup';
import { useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, Grid, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import { useLogoutMutation } from 'generated';
import { useTranslation } from 'next-i18next';
// ----------------------------------------------------------------------

type FormValuesProps = {
  email: string;
  code: string;
  afterSubmit?: string;
};

export default function LoginForm() {
  const { t } = useTranslation('login');
  const { actions } = useAuth();
  const [isSend, setIsSend] = useState(false);
  const [loading, setLoading] = useState(false);

  const isMountedRef = useIsMountedRef();

  const [logout] = useLogoutMutation();
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    code: Yup.string().required('Email verification code is required'),
  });

  const defaultValues = {
    email: '',
    code: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    getValues,
    trigger,
    watch,
    formState: { errors, isSubmitting },
  } = methods;

  const watchCode = watch('code');

  const onSubmit = async (data: FormValuesProps) => {
    if (isSend) {
      try {
        await logout();
        localStorage.removeItem('accessToken');
        const result = await actions.login({ email: data.email, code: data.code });
        if (!result.error) {
          await actions.completeLogin();
        }
      } catch (error) {
        console.error(error);
        reset();
        if (isMountedRef.current) {
          setError('afterSubmit', error);
        }
      }
    }
  };
  const onRequestVerificationCode = async () => {
    setLoading(true);
    trigger('email').then(async (status) => {
      if (status) {
        try {
          const result = await actions.verify(getValues('email'));
          if (!result.error) {
            setIsSend(true);
          }
        } catch (error) {
          console.error(error);
          reset();
          if (isMountedRef.current) {
            setError('afterSubmit', error);
          }
        }
      }
      setLoading(false)
    })
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {!isSend && <Stack spacing={3} sx={{
        marginTop: '40px'
      }}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <RHFTextField
          name="email"
          variant="standard"
          placeholder='Email'
          sx={{
            // 'div:hover:not(.Mui-disabled):before': {
            //   borderBottom: '2px solid #6851FF',
            // },
            // 'div:after': {
            //   borderBottomColor: '#6851FF',
            // },
            'input': {
              paddingLeft: '12px',
              paddingRight: '12px'
            }
          }}
        />
      </Stack>}

      <Grid container spacing={2} alignItems="flex-end" sx={{ marginTop: '2px' }}>
        {isSend && <Grid item xs>
          <RHFTextField
            name="code"
            variant="standard"
            placeholder={t('WebsiteAdmin.Login.codePlacehoder')}
            sx={{
              // 'div:hover:not(.Mui-disabled):before': {
              //   borderBottom: '2px solid #6851FF',
              // },
              // 'div:after': {
              //   borderBottomColor: '#6851FF',
              // },
              'input': {
                paddingLeft: '12px',
                paddingRight: '12px'
              }
            }}
          />
        </Grid>}
        {!isSend && <Grid item>
          <LoadingButton
            fullWidth
            type="button"
            variant="contained"
            loading={isSubmitting || loading}
            sx={{
              // color: '#6851FF',
              // backgroundColor: '#DEDAF6',
              boxShadow: 'none',
              borderRadius: '14px',
              // '&:hover': {
              //   backgroundColor: '#DEDAF6',
              // },
            }}
            onClick={onRequestVerificationCode}
          >
            {t('WebsiteAdmin.Login.code')}
          </LoadingButton>
        </Grid>}
        {
          (isSend) ?
            (
              <Grid item xs={12}>
                <p className="text-[14px]">{t('WebsiteAdmin.Login.message')}</p>
              </Grid>
            ) : []
        }
      </Grid>

      {isSend && <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        disabled={!watchCode}
        sx={{
          marginTop: '46px',
          // backgroundColor: '#6851FF',
          boxShadow: 'none',
          borderRadius: '10px',
          // '&:hover': {
          //   backgroundColor: '#6851FF',
          // }
        }}
      >
        {t('WebsiteAdmin.Login.button')}
      </LoadingButton>}
    </FormProvider>
  );
}
