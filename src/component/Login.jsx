
import React, { useState } from 'react';
import './style_cmp/login.css';
import { Link, useNavigate } from 'react-router-dom'; 
import Navbar from './Navbar';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase'; 


const initialstate = { email: '', password: '' };

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [input, setinput] = useState(initialstate);

  const handelsub = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, input.email, input.password); 
      setinput(initialstate);
      navigate('/news');
    } catch (error) {
      setError(error.message);
    }
  };

  const handelinp = ({ target }) => {
    setError("")
    setinput({
      ...input,
      [target.name]: target.value
    });
  };

  return (
    <div className="login-page">
      <Navbar keye="log" />
      <div className="login-box">
        <h2>Welcome Back</h2>
        <form className="login-form" onSubmit={handelsub}>
          <input type="text" placeholder="Username" required onChange={handelinp} name="email" />
          <input type="password" placeholder="Password" required onChange={handelinp} name="password" />
          <button type="submit">Sign In</button>
          {error && <p className="error">{error}</p>}
        </form>
        <p className="signup-link">
          Don't have an account? <Link to="/Signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;



















/*import React, { useState } from 'react';
import './style_cmp/login.css';
import { Link } from 'react-router-dom'; 
import Navbar from './Navbar';
import {signInWithEmailAndPassword} from 'firebase/auth'
import { useNavigate } from "react-router-dom";


const initialstate={email:'',password:''};

const Login = () => {
  const navigate = useNavigate();
  const [error,setError]=useState();
  const[input,setinput]=useState(initialstate);
  const handelsub= async (e)=>{
    e.preventDefault();

    try{
      await signInWithEmailAndPassword(input.email,input.password)
      setinput(initialstate)
      navigate('/news');



    }catch(error){
      setError(error.message)

    }
    

  }  
  const handelinp=({target})=>{
    setinput({
      ...input,
      [target.name]:target.value}
    )
    
    
  }  
  
  
  return (


    <div className="login-page">
      <Navbar keye="log"/>
      <div className="login-box">
        <h2>Welcome Back</h2>



        <form className="login-form" onSubmit={handelsub} >
          <input type="text" placeholder="Username" required onChange={handelinp} name='email' />
          <input type="password" placeholder="Password" required   onChange={handelinp} name='password' />
          <button type="submit">Sign In</button>
          {error}
        </form>
        <p className="signup-link">
          Don't have an account?    <a href="./Signup">Sign up</a> 
        </p>
      </div>
    </div>
  );
};

export default Login;
*/