import { useContext } from 'react';
// import { AuthContext as SessionContext } from '../contexts/SessionContext';
import { AuthContext as MagicContext } from '../server/magic/components/AuthProvider';

// import { AuthContext } from '../contexts/AwsCognitoContext';
// import { AuthContext } from '../contexts/Auth0Context';
// import { AuthContext } from '../contexts/FirebaseContext';

// ----------------------------------------------------------------------

const useAuth = () => {
  // const context = useContext(process.env.NEXT_PUBLIC_AUTH === 'magic' ? MagicContext : SessionContext);
  const context = useContext(MagicContext);

  if (!context) throw new Error('Auth context must be use inside AuthProvider');

  return context;
};

export default useAuth;
