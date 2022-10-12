import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import PPQLandingPage from './pages/PPQPage'
import './sass/index.scss'
import './sass/common.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="ppq" element={<PPQLandingPage />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
)
