

import './assets/styles.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'


import MyRoute from './route';
import { AppContextProvider } from './context/authContext';

function App() {
  return (
    <AppContextProvider >
      <MyRoute />
    </AppContextProvider>
  )
}

export default App
