import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import Header from './components/Header';
import { LoggedStatusProvider } from './utils/Context';

const httpLink = createHttpLink({
  uri: '/graphql',
});


const authLink = setContext((_, { headers }) => {

  const token = localStorage.getItem('tokenId');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({

  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

function App() {
  return (
    <ApolloProvider client={client}>
      <LoggedStatusProvider>
        <Router>
          <Header />


          <div>
            <Routes>
              <Route
                path="/home"
                element={<Home />}
              />
              <Route
                path="/"
                element={<Login />}
              />
              <Route
                path="/signup"
                element={<SignUp />}
              />

            </Routes>
          </div>
        </Router>
      </LoggedStatusProvider>
    </ApolloProvider >
  );
}

export default App;


