

import './assets/styles.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import { AppContextProvider } from './context/authContext';
import AppRoute from './route/AppRoute';
import React from 'react';

function App() {
  return (
      <AppContextProvider >
        <AppRoute />
      </AppContextProvider>
  )
}

export default App
