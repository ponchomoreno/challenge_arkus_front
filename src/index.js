import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import axiosInterceptorResponse from './api/axiosInterceptorsResponse';
import axiosInterceptorRequest from './api/axiosInterceptorsRequest';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);