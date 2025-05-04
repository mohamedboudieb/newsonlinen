import React from 'react';
import Login from './component/Login';
import Signup from './component/Signup';
import Home from './component/Home';
import Faver from './component/Faver';
import News from './component/news';
import PrivateRoute from './context/Privateroute'; 

import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/favorites" element={ 
              <PrivateRoute>  <Faver /> </PrivateRoute>
              } />
         
          <Route
            path="/news"
            element={
              <PrivateRoute> 
                <News />
                </PrivateRoute> 
            
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
