import React from 'react';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom/client';
import Calculate from './Calculate';
import {BrowserRouter,Routes,Route} from "react-router-dom"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path = '/' element={<App/>}></Route>
      <Route path = '/cal' element={<Calculate/>}></Route>
    </Routes>
  </BrowserRouter>
);


reportWebVitals();
