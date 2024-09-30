import Confirm from '@server/magic/components/Confirm';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import prisma from 'admin/src/server/context/prisma';
import processWebsite from '@process/website';

export default function LoginConfirm() {
  return <Confirm />;
}

export const getServerSideProps = async ({ locale, req }) => {
  const websiteSlug = req.headers.host.split('.')[0];

  const website = await prisma.website.findUnique({
    where: {
      slug: websiteSlug,
    },
    include: {
      pages: true,
    },
  });

  return {
    props: {
      website: processWebsite(website),
      ...(await serverSideTranslations(context.locale, ['common'])),
    },
  };
};
