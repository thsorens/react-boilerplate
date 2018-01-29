import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import Layout from 'pages/layout';
import store from 'store';

render(
    <Provider store={store}>
      <div>
      <Layout />
      </div>
    </Provider>,
  document.querySelector("#pageContainer")
);