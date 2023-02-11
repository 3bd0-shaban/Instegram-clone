import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { Store } from './Redux/Store';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SocketProvider } from './Components/SocketContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <BrowserRouter>
        <SocketProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </SocketProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);