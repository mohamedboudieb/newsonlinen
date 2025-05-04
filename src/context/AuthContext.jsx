


import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);


export const AuthProvider = ({ children }) => {
  const [currentUsr, setCurrentUsr] = useState(null);
  const [loading, setLoading] = useState(true);


  const signup = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);


  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);


  const logout = () => signOut(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUsr(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  
  if (loading) {
    return <p className="loading_">Loading…</p>;
  }

  return (
    <AuthContext.Provider value={{ currentUsr, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;





/*
import { EmailAuthProvider, updatePassword } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import React from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

import { auth, db } from '../firebase'; 



export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUsr, setCurrentUsr] = useState(null);
    const [loading, setLoading] = useState(true);

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUsr(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) return <p className="loding_"> loading ..</p>;

    return (
        <AuthContext.Provider value={{ currentUsr, signup }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider;

*/




