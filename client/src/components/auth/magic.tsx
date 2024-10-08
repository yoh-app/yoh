import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { signIn } from 'next-auth/client';
import { useForm } from 'react-hook-form';
import { useApolloClient } from '@apollo/client';
// import { useLoginMutation } from '@graphql/auth.graphql';
import Logo from '@components/ui/logo';
import Alert from '@components/ui/alert';
import Input from '@components/ui/input';
import PasswordInput from '@components/ui/password-input';
import Button from '@components/ui/button';
import { useUI } from '@contexts/ui.context';
import { useTranslation } from 'next-i18next';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// import { FacebookIcon } from "@components/icons/facebook";
import { GoogleIcon } from '@components/icons/google';
import { useModalAction } from '@components/ui/modal/modal.context';
import MobileOtpLogin from './mobile-otp-login/mobile-otp-login';
import { MobileIcon } from '@components/icons/mobile-icon';
import { useAuth } from '@server/magic/components/AuthProvider';
import { useLogoutMutation } from '@generated';

type FormValues = {
  email: string;
  // password: string;
};

const loginFormSchema = yup.object().shape({
  email: yup.string().email('error-email-format').required('error-email-required'),
  // password: yup.string().required('error-password-required'),
});
const LoginForm = () => {
  const [mobileLogin, setMobileLogin] = useState(false);
  const { t } = useTranslation('common');
  const client = useApolloClient();
  const { actions, isLoading, isAuthenticated } = useAuth();
  const [logout] = useLogoutMutation();

  // const [login, { loading }] = useLoginMutation({
  //   onCompleted: (data) => {
  //     if (data?.login?.token && data?.login?.permissions?.length) {
  //       Cookies.set('auth_token', data?.login?.token);
  //       Cookies.set('auth_permissions', data?.login?.permissions);
  //       authorize();
  //       closeModal();
  //     } else {
  //       setErrorMsg(t('error-credential-wrong'));
  //     }
  //   },
  //   onError: (error) => {
  //     console.log(error.message, 'error');
  //   },
  // });
  const [errorMsg, setErrorMsg] = useState('');
  const { authorize } = useUI();
  const { openModal, closeModal } = useModalAction();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(loginFormSchema),
  });
  useEffect(() => {
    if (isAuthenticated) {
      closeModal();
      authorize();
    }
  }, [isAuthenticated]);
  async function onSubmit({ email }: FormValues) {
    await logout();
    localStorage.removeItem('accessToken');

    client.resetStore();
    actions.login(email);

    // login({
    //   variables: {
    //     email,
    //     password,
    //   },
    // });
  }
  return (
    <div className="py-6 px-5 sm:p-8 bg-light w-screen min-h-screen md:min-h-0 h-full md:h-auto flex flex-col justify-center">
      <div className="flex justify-center">
        <Logo />
      </div>
      <p className="text-center text-sm md:text-base text-body mt-4 sm:mt-5 mb-8 sm:mb-10">{t('login-helper')}</p>
      {errorMsg && (
        <Alert
          variant="error"
          message={t(errorMsg)}
          className="mb-6"
          closeable={true}
          onClose={() => setErrorMsg('')}
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          label={t('text-email')}
          {...register('email')}
          type="email"
          variant="outline"
          className="mb-5"
          error={t(errors.email?.message!)}
        />
        {/* <PasswordInput
          label={t("text-password")}
          {...register("password")}
          error={t(errors.password?.message!)}
          variant="outline"
          className="mb-5"
          forgotPageRouteOnClick={() => openModal("FORGOT_VIEW")}
        /> */}
        <div className="mt-8">
          <Button className="w-full h-11 sm:h-12" loading={isLoading} disabled={isLoading}>
            {t('text-login')}
          </Button>
        </div>
      </form>
      {/* End of forgot login form */}

      {/* <div className="flex flex-col items-center justify-center relative text-sm text-heading mt-8 sm:mt-11 mb-6 sm:mb-8">
        <hr className="w-full" />
        <span className="absolute start-2/4 -top-2.5 px-2 -ms-4 bg-light">{t('text-or')}</span>
      </div> */}

      {/* <div className="grid grid-cols-1 gap-4 mt-2"> */}
      {/* Uncomment below code to use facebook login */}
      {/* <Button
          className="!bg-social-facebook hover:!bg-social-facebook-hover"
          disabled={loading}
          onClick={() => {
            signIn("facebook");
          }}
        >
          <FacebookIcon className="w-4 h-4 me-3" />
          {t("text-login-facebook")}
        </Button> */}
      {/* <Button
          className="!bg-social-google hover:!bg-social-google-hover !text-light"
          disabled={loading}
          onClick={() => {
            signIn('google');
          }}
        >
          <GoogleIcon className="w-4 h-4 me-3" />
          {t('text-login-google')}
        </Button>

        <Button
          className="w-full h-11 sm:h-12 !bg-gray-500 hover:!bg-gray-600 !text-light"
          disabled={loading}
          onClick={() => openModal('OTP_LOGIN')}
        >
          <MobileIcon className="h-5 me-2 text-light" />
          {t('text-login-mobile')}
        </Button> */}
      {/* </div> */}

      {/* <div className="flex flex-col items-center justify-center relative text-sm text-heading mt-8 sm:mt-11 mb-6 sm:mb-8">
        <hr className="w-full" />
      </div> */}
      {/* <div className="text-sm sm:text-base text-body text-center">
        {t('text-no-account')}{' '}
        <button
          onClick={() => openModal('REGISTER')}
          className="ms-1 underline text-accent font-semibold transition-colors duration-200 focus:outline-none hover:text-accent-hover focus:text-accent-hover hover:no-underline focus:no-underline"
        >
          {t('text-register')}
        </button>
      </div> */}
    </div>
  );
};

export default LoginForm;
