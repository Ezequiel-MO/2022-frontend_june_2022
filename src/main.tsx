import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import store from './redux/store'
import './index.css'
import { ActiveTabContextProvider } from './context/ActiveTabProvider'
import { pdfjs } from 'react-pdf'

pdfjs.GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.6.172/pdf.worker.min.js'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ActiveTabContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ActiveTabContextProvider>
  </React.StrictMode>
)
