import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App.jsx'
import { Store } from './store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
)
