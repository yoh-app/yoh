import React, { useEffect, useState } from 'react';
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
import { useAuth } from '@contexts/session.context';
import { useCreateOneRequestMutation, useFindManyPageViewQuery } from '../../generated';
import { useRouter } from 'next/router';
import Upload from 'client/src/components/upload/Upload';
import { useSettings } from '@contexts/settings.context';
import { useCustomer } from '@contexts/customer.context';
import dynamic from 'next/dynamic';
// import BaseOptionChart from 'admin/src/components/charts/BaseOptionChart';
import { merge } from 'lodash';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

type FormValues = {
  subject: string;
  message: string;
  name: string;
  description: string;
  url: string;
  price: number;
  days: number;
  acceptBefore: any;
};

const loginFormSchema = yup.object().shape({
  subject: yup.string().required(),
  message: yup.string().required(),
  name: yup.string().required(),
  description: yup.string().required(),
  url: yup.string().required(),
  days: yup.number().required(),
  price: yup.number().required(),
  acceptBefore: yup.date().required(),
});
const RequestForm = () => {
  const { t } = useTranslation('common');
  const { t: tRequest } = useTranslation('request');
  // const client = useApolloClient();
  // const { login, isAuthenticated } = useAuth();
  const [createRequest] = useCreateOneRequestMutation();
  const [loading, setLoading] = useState(false);
  const [request, setRequest] = useState(null);
  const [image, setImage] = useState(null);
  const { customer } = useCustomer();
  const { currency, indexPageSlug } = useSettings();
  const { query } = useRouter();
  const slug = query?.slug ?? indexPageSlug;

  const { data: pageViewData } = useFindManyPageViewQuery({
    variables: {
      where: {
        page: {
          slug: {
            equals: slug,
          },
        },
      },
    },
  });

  const pageViewSeries = pageViewData?.findManyPageView?.reduce((prev, current) => {
    const orderDate = new Date(current.createdAt).getDate;
    const existItem = prev.find((item) => item.date === orderDate);
    if (!existItem) {
      prev.push({
        date: orderDate,
        amount: 1,
      });
    } else {
      existItem.amount++;
    }
    return prev;
  }, []);

  const PageViewChartOptions = {
    legend: { position: 'top', horizontalAlign: 'right' },
    xaxis: {
      categories: pageViewSeries?.map((item) => item.date),
    },
  };
  // const [login, { loading }] = useLoginMutation({
  //   onCompleted: (data) => {
  //     if (data?.login?.token && data?.login?.permissions?.length) {
  //       Cookies.set("auth_token", data?.login?.token);
  //       Cookies.set("auth_permissions", data?.login?.permissions);
  //       authorize();
  //       closeModal();
  //     } else {
  //       setErrorMsg(t("error-credential-wrong"));
  //     }
  //   },
  //   onError: (error) => {
  //     console.log(error.message, "error");
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

  async function onSubmit({ name, description, url, message, subject, price, days, acceptBefore }: FormValues) {
    if (slug) {
      setLoading(true);
      const { data } = await createRequest({
        variables: {
          data: {
            name,
            description,
            url,
            currencyCode: currency,
            message,
            subject,
            price,
            days,
            customer: {
              connect: {
                id: customer.id,
              },
            },
            acceptBefore,
            // imageObj: image,
            page: {
              connect: {
                slug,
              },
            },
          },
        },
      });
      setRequest(data?.createOneRequest);
      setLoading(false);
    }
  }
  return (
    <div className="py-6 px-5 sm:p-8 bg-light w-screen min-h-screen md:min-h-0 h-full md:h-auto flex flex-col justify-center">
      <div className="flex justify-center">
        <Logo />
      </div>

      {pageViewSeries?.length > 0 && (
        <ReactApexChart
          type="area"
          series={{
            name: 'PageView',
            data: pageViewSeries?.map((pageView) => pageView.amount),
          }}
          options={PageViewChartOptions}
          height={364}
        />
      )}
      {request ? (
        <div>
          <div className="text-sm sm:text-base text-body text-center my-5">
            {tRequest('request-invitation-form-success')}
          </div>
          <Button className="w-full h-11 sm:h-12" onClick={() => closeModal()}>
            {t('text-close')}
          </Button>
        </div>
      ) : (
        <p className="text-center text-sm md:text-base text-body mt-4 sm:mt-5 mb-8 sm:mb-10">
          {tRequest('request-invitation-form-incompleted')}
        </p>
      )}
      {errorMsg && (
        <Alert
          variant="error"
          message={t(errorMsg)}
          className="mb-6"
          closeable={true}
          onClose={() => setErrorMsg('')}
        />
      )}

      {!request && (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Input
            label={tRequest('request-label-subject')}
            {...register('subject')}
            type="text"
            variant="outline"
            className="mb-5"
            error={t(errors.subject?.message!)}
          />
          <Input
            label={tRequest('request-label-message')}
            {...register('message')}
            type="text"
            variant="outline"
            className="mb-5"
            error={t(errors.message?.message!)}
          />
          {image ? (
            <img src={image?.url} />
          ) : (
            <Upload
              id='new_ad'
              attachmentType={'image'}
              maxFileSize={10000000000}
              autoProceed={false}
              maxNumberOfFiles={1}
              onComplete={(newFile) => setImage(newFile[0])}
            />
          )}
          <Input
            label={tRequest('request-label-name')}
            {...register('name')}
            type="text"
            variant="outline"
            className="mb-5"
            error={t(errors.name?.message!)}
          />
          <Input
            label={tRequest('request-label-description')}
            {...register('description')}
            type="text"
            variant="outline"
            className="mb-5"
            error={t(errors.description?.message!)}
          />
          <Input
            label={tRequest('request-label-url')}
            {...register('url')}
            type="text"
            variant="outline"
            className="mb-5"
            error={t(errors.url?.message!)}
          />
          <Input
            label={tRequest('request-label-price')}
            {...register('price')}
            type="number"
            variant="outline"
            className="mb-5"
            error={t(errors.price?.message!)}
          />
          <Input
            label={tRequest('request-label-days')}
            {...register('days')}
            type="number"
            variant="outline"
            className="mb-5"
            error={t(errors.days?.message!)}
          />
          <Input
            label={tRequest('request-label-accept-before')}
            {...register('acceptBefore')}
            type="date"
            variant="outline"
            className="mb-5"
            error={t(errors.acceptBefore?.message!)}
          />
          {/* <PasswordInput
          label={t('text-password')}
          {...register('password')}
          error={t(errors.password?.message!)}
          variant="outline"
          className="mb-5"
          forgotPageRouteOnClick={() => openModal('FORGOT_VIEW')}
        /> */}
          <div className="mt-8">
            <Button className="w-full h-11 sm:h-12" loading={loading} disabled={loading}>
              {tRequest('request-invitation-form-request')}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default RequestForm;
