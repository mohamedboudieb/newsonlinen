import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style_cmp/home.css';
import News from './news';


const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="home-page">
  
      <nav className="navbar">
        <h1 className="logo">MyWebsite</h1>
        <div className="nav-links">
        
          {isLoggedIn ? (
            <>
            <Link to="/faver">favor</Link>
            <Link to="/news">News</Link>
              <button onClick={handleLogout} className="btn">Logout</button>
              
            </>
          ) : (
            <>
              <Link to="/login" className="btn">Login</Link>
              <Link to="/signup" className="btn">Signup</Link>
            </>
          )}
        
        
        </div>
      </nav>
      
      <div className="home-content">
        <h2>Welcome to Our Website!</h2>
       <img className='img' src="https://i.etsystatic.com/8073388/r/il/8e53f8/806908565/il_570xN.806908565_lyd0.jpg" alt="" />
      </div>
    </div>
  );
};

export default Home;


/*setIsLoggedIn(true)*/