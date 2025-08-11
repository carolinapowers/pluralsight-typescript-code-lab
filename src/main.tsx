import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'

// Import styles - in a real barrel files lab, these would be messy imports initially
import './styles/global.css'   // Base CSS resets
import './styles/tokens.css'   // Generated from TypeScript tokens

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)