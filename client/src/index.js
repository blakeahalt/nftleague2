// index.js for App.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import './App.css';
import App from './App';
// import { AuthProvider } from './components/context/AuthProvider';


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
     <BrowserRouter>
       <App />
     </BrowserRouter>
   </React.StrictMode>,
);

// # ReactDOM.render(
// #   <React.StrictMode>
// #     <App />
// #   </React.StrictMode>,
// #   document.getElementById('root')
// # );