import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useInView } from 'react-intersection-observer';

export default function Homepagethirdsection() {
    const [subscribed, setsubscribed] = useState(false);
    const firebaseConfig = {
      apiKey: "AIzaSyDZ_ktB0uBgEPdU1tfaUfxWJ3sTqgEMmvs",
      authDomain: "wingedwordsadmin.firebaseapp.com",
      databaseURL: "https://wingedwordsadmin-default-rtdb.firebaseio.com",
      projectId: "wingedwordsadmin",
      storageBucket: "wingedwordsadmin.appspot.com",
      messagingSenderId: "386908666811",
      appId: "1:386908666811:web:a979774edcac6706c1229e",
      measurementId: "G-38QRTWBK7L"
    };
  
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const analytics = getAnalytics(app);
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    useEffect(() => {
        const getsubscription =(() => {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    const uid = user.uid;
                    const userDocRef = doc(db, "Premium Subscribers", uid);
                    const docSnap = await getDoc(userDocRef);
                    if (docSnap.exists()) {
                        setsubscribed(true);
                    }
                    else{
                        setsubscribed(false);
                    }
                }
            })
            console.log('Subscribed',subscribed)
        })
        getsubscription()
    })
    return (
        <>
            <div className="container">
                <div className="thidsection">
                    <input type="text" placeholder="Search" className='searchbar' />
                    <div className="susbcribe">
                        <h2>Subscribe to Premium</h2>
                        <br></br>
                        <p>Subscribe to unlock new features and if eligible, receive a share of ads revenue.</p>
                        <div className="button1">
                        <div className="postbutton">
                            <div className="postbuttontext">{subscribed ? "Subscribed" : "Subscribe"}</div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}
