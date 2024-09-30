import { useState, ReactNode, useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// hooks
import useAuth from '../hooks/useAuth';
import Login from '../pages/auth/login';
// components
import LoadingScreen from '../components/LoadingScreen';
import { usePermissionQuery, useLogoutMutation } from 'generated';

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
};

// export default function AuthGuard({ children }: Props) {
//   const { isAuthenticated, isInitialized } = useAuth();

//   const { pathname, push } = useRouter();

//   const [requestedLocation, setRequestedLocation] = useState<string | null>(null);

//   useEffect(() => {
//     if (requestedLocation && pathname !== requestedLocation) {
//       setRequestedLocation(null);
//       push(requestedLocation);
//     }
//   }, [pathname, push, requestedLocation]);

//   if (!isInitialized) {
//     return <LoadingScreen />;
//   }

//   if (!isAuthenticated) {
//     if (pathname !== requestedLocation) {
//       setRequestedLocation(pathname);
//     }
//     return <Login />;
//   }

//   return <>{children}</>;
// }


export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isInitialized } = useAuth();
  const { push, pathname } = useRouter();
  // const [requestedLocation, setRequestedLocation] = useState<string | null>(null);
  const { data, refetch } = usePermissionQuery();

  useEffect(() => {
    if ((!isAuthenticated && isInitialized) || data?.permission?.admin !== 'Public') {
      push('/admin');
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
  }, [data, isAuthenticated, isInitialized]);
  // console.log(pathname, pathname.split('/'));


  useEffect(() => {
    refetch()
  }, [pathname])

  return <>{children}</>;
}





