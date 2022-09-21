// index.js for App.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom'
import './App.css';
import App from './App';
import { AuthProvider } from './context/AuthProvider';
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
       <AuthProvider>
         <App />
       </AuthProvider>
     </BrowserRouter>
   </React.StrictMode>,
);

// # ReactDOM.render(
// #   <React.StrictMode>
// #     <App />
// #   </React.StrictMode>,
// #   document.getElementById('root')
// # );

// // ===================================================

// import React from 'react';
// // import ReactDOM from 'react-dom';
// import ReactDOM from 'react-dom/client';

// // import './index.css';
// import App from './App';
// import { AuthProvider } from './context/AuthProvider';


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
// //   <React.StrictMode>
// //      <BrowserRouter>
// //        <App />
// //      </BrowserRouter>
// //    </React.StrictMode>,
// // );
// // ReactDOM.render(
//   <React.StrictMode>
//     <AuthProvider>
//       <App />
//     </AuthProvider>
//   </React.StrictMode>,
//   // document.getElementById('root')
// );