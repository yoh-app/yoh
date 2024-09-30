import { Container, Typography } from '@mui/material';
// layouts
import DashboardLayout from 'layouts/admin';
// components
// import Kanban from 'views/dashboard/Kanban';
import Menu from 'views/dashboard/Menu';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import AdminGuard from 'guards/AdminGuard';
import { WebsiteMenu } from 'layouts/admin/menuItem';

// ----------------------------------------------------------------------

export default function Design() {
  return (
    <AdminGuard>
      <DashboardLayout menu={WebsiteMenu}>
        <Menu />
      </DashboardLayout>
    </AdminGuard>
  );
}

export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['form', 'common', 'table', 'admin', 'generated', 'menu'])),
    },
  };
};
