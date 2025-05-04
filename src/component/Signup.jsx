import React, { useState } from 'react';
import './style_cmp/signup.css';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../firebase'; 


const initialstate = { email: '', password: '', password_confirmation: '' };

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState(initialstate);

  const handleChange = ({ target }) => {
    setInput({ ...input, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.password !== input.password_confirmation) {
      setError("Passwords do not match");
      return;
    }
    try {
      setError('');
      setLoading(true);
      await createUserWithEmailAndPassword(auth, input.email, input.password);
      setInput(initialstate);
      navigate('/news');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <Navbar keye="sin" />
      <div className="signup-box">
        <h2>Create Account</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          {error && (
            <div style={{ backgroundColor: 'rgb(240, 132, 132)', color: 'white', padding: '5px 0px', borderRadius: '5px', width: '100%' }}>
              {error}
            </div>
          )}
          <input type="email" placeholder="Email" name="email" onChange={handleChange} required />
          <input type="password" placeholder="Password" name="password" onChange={handleChange} required />
          <input type="password" placeholder="Confirm Password" name="password_confirmation" onChange={handleChange} required />
          <button type="submit" disabled={loading}>Sign Up</button>
        </form>
        <p className="login-link">
          Already have an account? <a href="./Login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;


















/*import React, { useRef, useState } from 'react';
import './style_cmp/signup.css';
import { useAuth } from '../context/AuthContext.jsx';
import { Await } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import {createUserWithEmailAndPassword} from"firebase/auth"
import auth from '../firebase'
const initialstate = { email: '', password: '',Password_confermition:'' };

const Signup = () => {
  const {signup}=useAuth
  const[error,setError]=useState("")
  const[loding,setloding]=useState(true)
  const [input, setinput] = useState(initialstate);


  
  const handelch=({target})=>{
    setinput({
      ...input,
      [target.name]:target.value
    })
  console.log(input)
  }



  const handelsub = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, input.email, input.password); 
      setinput(initialstate);
      navigate('/news');
    } catch (error) {
      setError(error.message);
    }
  };


  return (
    <div className="signup-page">
      <Navbar keye="sin"/>
      <div className="signup-box">
        <h2>Create Account</h2>
        <form className="signup-form" onSubmit={handelsub}>
        {error && (
  <div style={{ backgroundColor: 'rgb(240, 132, 132)', color: 'white', padding: '10px', borderRadius: '5px' ,width:'100%'}}>
    {error}
  </div>
)}
        <input type="email" placeholder="Email" required onChange={handelch} name='email'/>

          <input type="password" placeholder="Password" required  onChange={handelch} name='Password'/>
          <input type="password" placeholder="Password confermition" required  onChange={handelch} name='Password_confermition' />
          <button type="submit"disabled={loding}>Sign Up</button>
        {error}</form>
        <p className="login-link">
          Already have an account? <a href="./Login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;*/
