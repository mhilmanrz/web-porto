import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { DataProvider } from './context/DataContext.jsx'
import { ErrorBoundary } from './components/ErrorBoundary.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <ErrorBoundary>
          <DataProvider>
            <App />
          </DataProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
)
