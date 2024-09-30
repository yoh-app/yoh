import { useState } from 'react';
import dynamic from 'next/dynamic';
// const DynamicModalContainer = dynamic(() => import('@server/magic/components/Modal/ModalContainer'));
import { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import prisma from 'admin/src/server/context/prisma';
import processPage from '@process/page';
import Input from '@components/ui/input';
import Button from '@components/ui/button';
import { useForm } from 'react-hook-form';
import { useApolloClient } from '@apollo/client';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useLogoutMutation } from '@generated';
import { useAuth } from '@server/magic/components/AuthProvider';
import { useUI } from '@contexts/ui.context';
import TextField from '@mui/material/TextField';
import MuiButton from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import processWebsite from '@process/website';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSettings } from '@contexts/settings.context';
import { Typography } from '@mui/material';

type FormValues = {
  email: string;
  code: string;
};

const loginFormSchema = yup.object().shape({
  email: yup.string().email('error-email-format').required('Email is required'),
  code: yup.string().required('Email verification code is required'),
});

export default function Login() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const client = useApolloClient();
  const website = useSettings()
  const { actions, isLoading, isAuthenticated, setIsLoading } = useAuth();
  const [logout] = useLogoutMutation();
  const { authorize } = useUI();
  const {
    reset,
    register,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(loginFormSchema),
  });
  const [isSend, setIsSend] = useState(false);

  async function onSubmit({ email, code }: FormValues) {
    if (isSend) {
      try {
        setIsLoading(true)
        await logout();
        localStorage.removeItem('accessToken');

        client.resetStore();
        const result = await actions.login({ email, code });
        if (!result.error) {
          await actions.completeLogin();
        }
        setIsLoading(false)

      } catch (error) {
        console.log(error)
      }
    }
  }

  const onRequestVerificationCode = async () => {
    trigger('email').then(async (status) => {
      if (status) {
        try {
          setIsLoading(true)

          const result = await actions.verify(getValues('email'));
          if (!result.error) {
            setIsSend(true);
          }
          setIsLoading(false)

        } catch (error) {
          console.error(error);
          reset();
          // if (isMountedRef.current) {
          //   setError('afterSubmit', error);
          // }
        }
      }
    });
  };

  useEffect(() => {
    if (isAuthenticated) {
      authorize();
      window.location.reload()
      // router.push('/');
    }
  }, [isAuthenticated]);

  return (
    <div style={{ width: '400px' }} className="bg-white py-6 px-5 bg-light min-h-0 h-full h-auto flex flex-col justify-center">
      <div className="text-center">
        <div className="leading-none my-7 text-lg font-medium">
          <Typography variant='h4'>{t('profile-sidebar-welcome')} {website?.name}</Typography>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {!isSend && <div className="mt-9 p-3"><TextField
            size='small'
            {...register('email')}
            type="text"
            fullWidth
            placeholder={"example@gmail.com"}
            error={t(errors.code?.message!)}
          /></div>}
          {isSend && <div className="mt-9 p-3"><TextField
            size='small'
            {...register('code')}
            type="text"
            fullWidth
            className="mt-9 normal-case"
            placeholder={t('placeholder-verification-code')}
            error={t(errors.code?.message!)}
          /></div>}
          {!isSend && <div className="mt-9"><Button
            disabled={isLoading}
            loading={isLoading}
            onClick={onRequestVerificationCode}
          >
            {t('text-verify')}
          </Button></div>}
          {isSend ? <p>{t('text-verification-code')}</p> : []}
          {isSend && <div className="mt-9">
            <Button
              // style={{ background: '#6851FF' }}
              size="small"
              loading={isLoading}
              disabled={isLoading}
            >
              {t('text-login')}
            </Button>
          </div>}
        </form>
      </div>
      {/* <DynamicModalContainer /> */}
    </div>
  );
}