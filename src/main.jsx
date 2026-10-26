import React from 'react';
import { createRoot } from 'react-dom/client';
import BirthdayApp from './BirthdayApp.jsx';
import './style.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BirthdayApp />
  </React.StrictMode>,
);
