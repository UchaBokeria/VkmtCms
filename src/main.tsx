import './style.scss';
import App from './App/App';
import Login from './App/Auth/Login';
import { Auth } from './Services/Auth';

import ReactDOM from 'react-dom/client';
import { StrictMode, Suspense } from 'react';
import { BrowserRouter } from "react-router-dom";
  
ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
).render(
    <StrictMode>
        <BrowserRouter>
        <Suspense>
        { Auth.Check ? <App/> : <Login/> }
        </Suspense>
        </BrowserRouter>
    </StrictMode>
);