import React, { useEffect, useRef, useState } from 'react';
import './style_cmp/Navbar.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase'; 

import { doc, setDoc } from "firebase/firestore";
import { useAuth } from '../context/AuthContext';

const Navbar = ({keye}) => {
  const navigate = useNavigate();
 // const { currentUsr } = useAuth();
  const [isOpen, setIsOpen] = useState(false);


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
const logout=()=>{
 auth.signOut();
}


  return (
    <div>
      
      <button className="menu-btn" onClick={toggleMenu}>
        ☰
      </button>

      <div className={`side-nav ${isOpen ? 'open' : ''}`}>
        <ul>
        { keye=="log"||keye=="sin" ? <li id="home" ><Link to="/" className='li' >Home</Link></li> : <div className="p"></div> }
        { keye=="fav" ? <li  id="news"><Link to="/news" className='li' >News</Link></li> : <div className="p"></div>  }
        { keye=="news" ?  <li  id="faver"><Link to="/favorites" className='li' >Favorites</Link></li>: <div className="p"></div>  }
        { keye=="news"||keye=="fav" ? <li  id="logout"><Link   className='li' onClick={logout} >  Logout</Link></li>: <div className="p"></div> }
        </ul>
      
      </div>
    </div>
  );
};

export default Navbar;
