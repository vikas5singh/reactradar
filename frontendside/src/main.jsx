import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { AuthProvider } from "./context/auth";
ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <App />
 </AuthProvider>
)
