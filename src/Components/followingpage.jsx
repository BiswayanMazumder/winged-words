import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider } from "firebase/auth";
import Navbar from './navbar';
import Posts from './posts';
import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';
import FollowingpageUI from '../followingpageUI';
import Homepagethirdsection from './homepagethirdsection';
export default function Followingpage() {
    useEffect(() => {
        document.title = "Following - WingedWords";
    }, []);

    return (
        <>
            <div className="homebody">
                <Navbar />
                <FollowingpageUI />
                <Homepagethirdsection/>
            </div>
        </>
    )
}
