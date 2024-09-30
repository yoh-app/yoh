import { ReactNode, useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// hooks
import useAuth from '../hooks/useAuth';
// routes
import { PATH_ADMIN } from '../routes/paths';
import { useLogoutMutation, usePermissionQuery } from 'generated';

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
};

export default function GuestGuard({ children }: Props) {
  const { push } = useRouter();

  const [logout] = useLogoutMutation();
  const { isAuthenticated, isInitialized } = useAuth();

  useEffect(() => {
    async function checkAuth() {
      if (isAuthenticated) {
        window.location.assign(PATH_ADMIN.root);
      }
      // if (isInitialized && !isAuthenticated) {
      //   await logout();
      //   localStorage.removeItem('accessToken');
      // }
    }
    checkAuth();
  }, [isAuthenticated, isInitialized]);

  return <>{children}</>;
}
