import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Main/App';

import AuthContext from './Context/AuthContext'

ReactDOM.render(
  <React.StrictMode>
    <AuthContext>
      <App />
    </AuthContext>
  </React.StrictMode>,
  document.getElementById('root')
);