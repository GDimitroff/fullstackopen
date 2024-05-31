import ReactDOM from 'react-dom/client'

import App from './App.jsx'
import NotificationProvider from './contexts/NotificationContext.jsx'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <NotificationProvider>
    <App />
  </NotificationProvider>,
)
