import { createContext, ReactNode, useEffect, useReducer, useContext, useState } from 'react';
// utils
// import axios from '../utils/axios';
import { setSession } from 'admin/src/utils/jwt';
// @types
import { ActionMap, AuthState, AuthUser, JWTContextType } from 'admin/src/@types/authentication';
import { useLogoutMutation, useSignupMutation, useLoginMutation, useMeQuery } from '../generated';
// ----------------------------------------------------------------------

enum Types {
  Initial = 'INITIALIZE',
  Login = 'LOGIN',
  Logout = 'LOGOUT',
  Register = 'REGISTER',
}

type JWTAuthPayload = {
  [Types.Initial]: {
    isAuthenticated: boolean;
    user: AuthUser;
  };
  [Types.Login]: {
    user: AuthUser;
  };
  [Types.Logout]: undefined;
  [Types.Register]: {
    user: AuthUser;
  };
};

export type JWTActions = ActionMap<JWTAuthPayload>[keyof ActionMap<JWTAuthPayload>];

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const JWTReducer = (state: AuthState, action: JWTActions) => {
  switch (action.type) {
    case 'INITIALIZE':
      return {
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user,
      };
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    case 'REGISTER':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };

    default:
      return state;
  }
};

const AuthContext = createContext<JWTContextType | null>(null);

function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(JWTReducer, initialState);
  const [logoutMutation] = useLogoutMutation();
  const [loginMutation] = useLoginMutation();
  const [signupMutation] = useSignupMutation();
  const { data, loading } = useMeQuery();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (data?.me?.id) {
      dispatch({
        type: Types.Initial,
        payload: {
          isAuthenticated: true,
          user: data.me,
        },
      });
    } else if (data && !loading) {
      dispatch({
        type: Types.Initial,
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, [data]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    const response = await loginMutation({
      variables: {
        email,
        password,
      },
    });

    dispatch({
      type: Types.Login,
      payload: {
        user: response.data,
      },
    });
    setIsLoading(false);
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    const response = await signupMutation({
      variables: {
        email,
        password,
        name,
      },
    });

    dispatch({
      type: Types.Register,
      payload: {
        user: response.data,
      },
    });
    setIsLoading(false);
  };

  const logout = async () => {
    await logoutMutation();
    setSession(null);
    dispatch({ type: Types.Logout });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'session',
        isLoading,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error('Auth context must be use inside AuthProvider');

  return context;
};

export { AuthContext, AuthProvider, useAuth };
