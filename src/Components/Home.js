import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider } from "firebase/auth";
import Navbar from './navbar';
export default function Home() {
    useEffect(() => {
        document.title = "Home";
    }, []);

    return (
        <>
            <div className="container">
            <Navbar/>

            </div>
        </>
    )
}
