import React from 'react';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import './index.css';

import { RouterProvider } from 'react-router-dom';
import { router } from './router.jsx'; // assuming your router is exported from App.js

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
