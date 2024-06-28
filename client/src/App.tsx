import './App.css';

import { useEffect, useState } from 'react';

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

  useEffect(() => {
    if (loginBtn) {
      // find better way to do this later
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [loginBtn]);

  return (
    <ApolloProvider client={client}>
      <Navbar setLoginBtn={setLoginBtn} />
      {loginBtn && <Login setLoginBtn={setLoginBtn} />}
      {Auth.loggedIn() ? <Dashboard /> : <Info />}
    </ApolloProvider>
  );
}
