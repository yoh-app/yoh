/* eslint-disable @typescript-eslint/no-var-requires */
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { useMemo } from 'react';
import { setContext } from '@apollo/client/link/context';

let apolloClient: any;

// function createIsomorphLink() {
//   if (typeof window === 'undefined') {
//     const { SchemaLink } = require('@apollo/client/link/schema')
//     const { schema } = require('./nexusSchema')
//     return new SchemaLink({ schema })
//   } else {
//     const { HttpLink } = require('@apollo/client/link/http')
//     return new HttpLink({
//       uri: '/api/graphql',
//       credentials: 'same-origin',
//     })
//   }
// }
const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT,
  credentials: 'include',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('accessToken');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState: any) {
  return useMemo(() => initializeApollo(initialState), [initialState]);
}