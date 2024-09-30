import { useState, ReactNode, useEffect } from 'react';
// import { Navigate, useLocation } from 'react-router-dom';
// hooks
import useAuth from 'hooks/useAuth';

import { useRouter } from 'next/router';
import { PATH_AUTH, PATH_ADMIN, PATH_MAGIC } from 'routes/paths';
// import data from '@iconify/icons-ic/round-format-clear';
import { usePermissionQuery, useLogoutMutation, useFindUniqueWebsiteQuery } from 'generated';
// pages
// import Login from '../pages/authentication/Login';

// ----------------------------------------------------------------------

type AuthGuardProps = {
  children: ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isInitialized } = useAuth();
  const [logout] = useLogoutMutation();
  const { push, pathname, locale, asPath } = useRouter();
  // const [requestedLocation, setRequestedLocation] = useState<string | null>(null);
  const { data, refetch } = usePermissionQuery();
  const { data: websiteData } = useFindUniqueWebsiteQuery({
    variables: {
      where: {
        id: data?.permission?.Website
      }
    },
    skip: !data?.permission?.Website
  })
  useEffect(() => {
    console.log(isAuthenticated, isInitialized, data)

    // if ((!isAuthenticated && isInitialized) || data?.permission?.admin === 'Public') {
    //   // console.log(isAuthenticated, isInitialized, data)
    //   // push(PATH_MAGIC.login);
    // }
    if (data?.permission?.admin === 'Public') {
      // console.log(isAuthenticated, isInitialized, data)
      push(PATH_MAGIC.login);
    }
    // if (!isAuthenticated && isInitialized && data) {
    //   // if (pathname !== requestedLocation) {
    //   //   setRequestedLocation(pathname);
    //   // }
    //   if (process.env.NEXT_PUBLIC_AUTH === 'magic') {
    //     push(PATH_MAGIC.login);
    //   } else {
    //     push(PATH_AUTH.login);
    //   }
    //   // return <Login />;
    // }
    // if (data?.permission?.admin === 'Public' || data?.permission?.admin === 'User') {
    //   localStorage.removeItem('accessToken');
    // }
  }, [isAuthenticated, isInitialized, data]);
  // console.log(pathname, pathname.split('/'));
  useEffect(() => {
    if (
      data?.permission?.admin &&
      // pathname.split('/').length < 2 &&
      !pathname.includes('notifications') &&
      pathname.split('/')[2] !== data?.permission?.admin && data?.permission?.admin !== 'Public'
    ) {
      push(PATH_ADMIN.root);
    }
  }, [data]);

  useEffect(() => {
    refetch()
  }, [pathname])

  useEffect(() => {
    if ((websiteData?.findUniqueWebsite?.languageCode && locale) && websiteData?.findUniqueWebsite?.languageCode !== locale) {
      push(asPath, asPath, {
        locale: websiteData?.findUniqueWebsite?.languageCode,
      });
    }
  }, [locale, websiteData])


  return <>{children}</>;
}
