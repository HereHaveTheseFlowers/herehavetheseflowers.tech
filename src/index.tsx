//import './assets/fonts/fonts.css';
import './utils/modern-normalize.css'
import './constants/fonts.css'
import './styles.sass';
import "core-js/stable";
import React from "react";
import ReactDOM from "react-dom/client";
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import firestoreController from './controllers/firestoreController'

const controller = firestoreController;

window.addEventListener('DOMContentLoaded', () => {
  let loader = document.querySelector('.loader') as HTMLElement;
  if(loader) {
    loader.style.opacity = '0';
    setTimeout(() => {
      if(!loader) loader =  document.querySelector('.loader') as HTMLElement;
      loader.parentElement.removeChild(loader)
    }, 200);
  }
  loader = null;
});


/* Mobile viewport height hack */
let timeoutId: NodeJS.Timeout | null = null;
const documentHeight = () => {
  if(timeoutId) clearTimeout(timeoutId); // avoid execution of previous timeouts
  timeoutId = setTimeout(() => {
    const innerHeight = window.innerHeight
    if(innerHeight > 1024) {
      const doc = document.documentElement;
      doc?.style.setProperty('--doc-height', `${innerHeight}px`);
      doc?.style.setProperty('--doc-vh', `${innerHeight / 100}px`);
    }
  }, 200);
};
documentHeight();
window.addEventListener('resize', documentHeight);

/* setTimeout(()=>{
  document.documentElement?.style.setProperty('--color-bg', '#000');
  document.documentElement?.style.setProperty('--color-main', '#fff');
}, 3000); */

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </React.StrictMode>
);
