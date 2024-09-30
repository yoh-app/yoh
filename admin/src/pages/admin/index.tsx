import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { usePermissionQuery } from 'generated';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import AdminGuard from 'guards/AdminGuard';
import { PATH_AUTH, PATH_ADMIN, PATH_MAGIC } from 'routes/paths';
import Spinner from 'admin/components/Spinner';

const AdminIndex = () => {
  const router = useRouter();
  const { data } = usePermissionQuery();

  useEffect(() => {
    if (data?.permission?.admin === 'Website') {
      router.push('/admin/Website/onboard');
    }

    if (data?.permission?.admin === 'User') {
      router.push('/admin/User/onboard');
    }
  }, [data]);

  return (
    <AdminGuard>
      <Spinner />
    </AdminGuard>
  );
};

export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['admin', 'generated'])),
    },
  };
};
export default AdminIndex;
