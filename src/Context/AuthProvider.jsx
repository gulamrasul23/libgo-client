import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { auth } from '../firebase/firebase.init';
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';



const AuthProvider = ({children}) => {
    const provider = new GoogleAuthProvider();
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    const registerUser = (email,password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const loginGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth,provider);
    }

    const loginUser = (email,password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email,password);
    }

    const updateUser = (profile) => {
        return updateProfile(auth.currentUser,profile);
    }

    const logOutUser = () => {
        setLoading(true);
        return signOut(auth);
    }

    const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,(currentUser) => {
            setUser(currentUser);
            setLoading(false);
        })
        return () => {
            unsubscribe();
        };
    },[])

    const authInfo = {
        registerUser,
        loginGoogle,
        loginUser,
        updateUser,
        user,
        loading,
        logOutUser,
        resetPassword


    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;