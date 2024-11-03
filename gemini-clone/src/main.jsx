import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import App from './App'; // Adjust this path if necessary
import ContextProvider from './context/Context'; // Adjust this path based on your folder structure

// Get the root element from the DOM
const container = document.getElementById('root');
const root = createRoot(container); // Create a root

// Render the application using the new API
root.render(
    <ContextProvider>
        <App />
    </ContextProvider>
);
