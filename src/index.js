import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';

// comps
import Layout from './layout';
import Neworder from './comps/neworder';
import Newcust from './comps/newcust';
import OrderHist from './comps/orderhistory';
import ProdPage from './comps/productpage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Neworder />} />
          <Route path="newcustomer" element={<Newcust />} />
          <Route path="orderhistory" element={<OrderHist />} />
          <Route path="productpage" element={<ProdPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
