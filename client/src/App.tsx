import './App.css';

import { useState } from 'react';

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';
import Navbar from './components/navbar/Navbar';
import Auth from './utils/auth';
import Dashboard from './components/dashboard/Dashboard';
import Info from './components/info/Info';
import Login from './components/login/Login';

// creates a link for graphql query operations
const httpLink = createHttpLink({
  uri: '/graphql',
});

// gets the token from local storage and authorizes it with graphql
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// instantiate ApolloClient w/ link and cache
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

export default function App() {
  const [loginBtn, setLoginBtn] = useState(false);

  return (
    <ApolloProvider client={client}>
      <Navbar setLoginBtn={setLoginBtn} />
      {loginBtn && <Login setLoginBtn={setLoginBtn} />}
      {Auth.loggedIn() ? <Dashboard /> : <Info />}
    </ApolloProvider>
  );
}
