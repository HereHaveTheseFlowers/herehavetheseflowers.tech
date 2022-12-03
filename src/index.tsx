//import './assets/fonts/fonts.css';
import './utils/modern-normalize.css'
import './styles.sass';
import "core-js/stable";
import React from "react";
import ReactDOM from "react-dom/client";
import App from './App';
import { BrowserRouter } from 'react-router-dom';

window.addEventListener('load', () => {
  let loader = document.querySelector('.loader');
  if(loader) loader.parentElement.removeChild(loader)
  loader = null;
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </React.StrictMode>
);
