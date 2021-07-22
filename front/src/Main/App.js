import './App.css';
import React from 'react'
import { Router } from 'react-router-dom'

import history from './history'
import Routes from './Routes'

import Menu from '../components/Menu/Menu'


function App() {
  return (
    <Router history={history}>
        <Menu/>
      <Routes>
      </Routes>
    </Router>
  );
}

export default App;
