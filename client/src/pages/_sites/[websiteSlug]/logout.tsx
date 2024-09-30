import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
// import { signOut as socialLoginSignOut } from "next-auth/client";
import { useApolloClient } from '@apollo/client';
// import { useLogoutMutation } from "@graphql/auth.graphql";
import Spinner from '@components/ui/loaders/spinner/spinner';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useLogoutMutation } from '@generated';
import { useAuth } from '@server/magic/components/AuthProvider';
import prisma from 'admin/src/server/context/prisma';
import processWebsite from '@process/website';

export default function SignOut() {
  const { t } = useTranslation('common');
  const client = useApolloClient();
  const router = useRouter();

  const [logout] = useLogoutMutation();
  const { actions } = useAuth();
  // const [signOut] = useLogoutMutation();

  useEffect(() => {
    async function exec() {
      if (process.env.NEXT_PUBLIC_AUTH === 'magic') {
        await actions.logout();
      }
      await logout();
      window.location.assign('/');
    }
    exec();
    // socialLoginSignOut({ redirect: false });
    // signOut().then(() => {
    //   client.resetStore().then(() => {
    //     Cookies.remove("auth_token");
    //     Cookies.remove("auth_permissions");
    //     router.push("/");
    //   });
    // });
  }, [router, client]);

  return (
    <div className="min-h-screen grid place-items-center">
      <div className="text-center">
        <Spinner text={t('text-signing-out')} />
      </div>
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
//       ...(await serverSideTranslations(context.locale, ['common'])),
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
