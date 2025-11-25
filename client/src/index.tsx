import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {ApolloProvider} from "@apollo/client";
import {apolloClient} from "./graphql/apolloClient";
import {Provider} from "react-redux";
import {setupStore} from "./store/store";
import {BrowserRouter} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <BrowserRouter>
      <Provider store={setupStore()}>
        <ApolloProvider client={apolloClient}>
          <App/>
        </ApolloProvider>
      </Provider>
    </BrowserRouter>
  );
