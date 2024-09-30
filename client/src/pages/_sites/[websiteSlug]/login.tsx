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
import { useLogoutMutation } from '../../../generated';
import { useAuth } from '@server/magic/components/AuthProvider';
import { useUI } from '@contexts/ui.context';
import MuiInput from '@mui/material/Input';
import MuiButton from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import processWebsite from '@process/website';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type FormValues = {
  email: string;
  code: string;
};

const loginFormSchema = yup.object().shape({
  email: yup.string().email('error-email-format').required('Email is required'),
  code: yup.string().required('Email verification code is required'),
});

export default function Login({ website }) {
  const { t } = useTranslation('common');
  const router = useRouter();
  const client = useApolloClient();
  const { actions, isLoading, isAuthenticated } = useAuth();
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
    await logout();
    localStorage.removeItem('accessToken');

    client.resetStore();
    const result = await actions.login(email, code);
    if (!result.error) {
      await actions.completeLogin();
    }
  }

  const onRequestVerificationCode = async () => {
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
      router.push('/');
    }
  }, [isAuthenticated]);

  return (
    <div
      className="min-h-screen grid place-items-center relative"
      style={{ background: 'linear-gradient(159.02deg, #D7D0FF 16.43%, #F8EEE7 91.45%)' }}
    >
      <div className="text-center">
        <div className="leading-none my-7">
          {t('profile-sidebar-welcome')} <span>{website?.name}</span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Input
            {...register('email')}
            type="email"
            dimension="small"
            variant="outline"
            className="mt-9"
            placeholder="example@yoh.app"
            error={t(errors.email?.message!)}
            style={{
              border: '1px solid #A99EF0',
              borderRadius: '10px',
              fontSize: '16px',
              lineHeight: 1,
            }}
          />
          <MuiInput
            {...register('code')}
            type="text"
            className="mt-9 w-full normal-case"
            placeholder={t('placeholder-verification-code')}
            error={t(errors.code?.message!)}
            sx={{
              border: '1px solid #A99EF0',
              background: '#ffffff',
              padding: '2px 12px',
              borderRadius: '10px',
              fontSize: '16px',
              lineHeight: 1,
              '&:not(.Mui-disabled):before': {
                borderBottom: 'none',
              },
              '&:after': {
                border: 'none',
              },
              '&:hover:not(.Mui-disabled):before': {
                borderBottom: 'none',
              },
            }}
            endAdornment={
              <InputAdornment position="end">
                <MuiButton
                  variant="text"
                  sx={{
                    color: '#6851FF',
                    background: 'trnasparent',
                    textTransform: 'none',
                  }}
                  onClick={onRequestVerificationCode}
                >
                  {t('text-verify')}
                </MuiButton>
              </InputAdornment>
            }
          />
          {isSend ? <p>{t('text-verification-code')}</p> : []}
          <div className="mt-9">
            <Button
              className="py-2 px-9"
              style={{ background: '#6851FF' }}
              size="small"
              loading={isLoading}
              disabled={isLoading}
            >
              {t('text-login')}
            </Button>
          </div>
        </form>
      </div>
      {/* <DynamicModalContainer /> */}
    </div>
  );
}

// export const getServerSideProps = async (context: any) => {
//   const websiteSlug = context.req.headers.host.split('.')[0];

//   const website = await prisma.website.findUnique({
//     where: {
//       slug: websiteSlug,
//     },
//     include: {
//       pages: true,
//     },
//   });

//   return {
//     props: {
//       website: processWebsite(website),
//       ...(await serverSideTranslations(context.locale, ['common', 'order'])),
//     },
//   };
// };



export const getStaticPaths = async ({ locales }) => {
  const websites = await prisma.website.findMany({
    where: {},
  });
  const paths = websites
    .map((website) =>
      locales.map((locale) => ({
        params: { websiteSlug: website.slug },
        locale, // Pass locale here
      })),
    )
    .flat();
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps = async ({ params, locale }) => {
  if (!params) throw new Error('No path parameters found');

  const { websiteSlug } = params;
  const website = await prisma.website.findUnique({
    where: {
      slug: websiteSlug,
    },
    include: {
      pages: {
        select: {
          id: true,
          name: true,
          description: true,
          slug: true,
          imageObj: true,
          isIndex: true,
          isExternalLink: true,
          externalUrl: true
        }
      },
    },
  });

  if (!website)
    return {
      notFound: true,
      // revalidate: 10,
      props: {
        ...(await serverSideTranslations(locale!, ['common'])),
      },
    };

  return {
    props: {
      website: processWebsite(website),
      ...(await serverSideTranslations(locale!, ['common'])),
    },
    // revalidate: 20,
  };
};
