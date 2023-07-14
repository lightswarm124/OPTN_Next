import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import Home from './app/page'
import store from './services/store';

import 'antd/dist/antd.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <Home />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
)