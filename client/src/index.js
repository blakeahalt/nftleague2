// index.js for App.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

// import { AuthProvider } from './components/context/AuthProvider';

const clientId =
    '1077671935526-r9547hfdu1l45omb8s10jjehbv309rki.apps.googleusercontent.com';

// const root = ReactDOM.createRoot(
//   );
//   ReactDOM.render(
//     <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>,
//   document.getElementById("root")
// );
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={clientId}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </GoogleOAuthProvider>
    </React.StrictMode>
);

// # ReactDOM.render(
// #   <React.StrictMode>
// #     <App />
// #   </React.StrictMode>,
// #   document.getElementById('root')
// # );
