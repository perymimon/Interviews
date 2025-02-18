import {ThemeProvider} from "@mui/material/styles"
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import starWarsTheme from './style/starWarsTheme.js'
import './App.css'
// Create a QueryClient instance
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeProvider theme={starWarsTheme}>
            <QueryClientProvider client={queryClient}>
                <App/>
            </QueryClientProvider>
        </ThemeProvider>
    </React.StrictMode>,
)