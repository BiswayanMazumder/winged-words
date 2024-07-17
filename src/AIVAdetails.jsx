import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
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
  const auth = getAuth();
export default function AIVAdetails() {
    const getdocumentitle = () => {
        document.title ='AIVA'
    }
    const provider = new GoogleAuthProvider();
    const [subs,setsubs]=useState(false)
    const getsusbstatus = async() => {
        const user = auth.currentUser;
        if (user) {
            const uid = user.uid;
            const userDocRef = doc(db, "Premium Subscribers", uid);
            try {
              const docSnap = await getDoc(userDocRef);
              if (docSnap.exists()) {
                const followersData = docSnap.data()["Premium"];
                setsubs(followersData);
              }else{
                setsubs(false);
              }
            } catch (error) {
              console.error("Error fetching followers:", error);
            }
          }
        //   console.log('prem',subs)
    }
    return (
        <>
            <div className="posts" onLoad={getdocumentitle()}>
                <div className="videoplayer">
                    <video src="https://firebasestorage.googleapis.com/v0/b/wingedwordsadmin.appspot.com/o/aiva.mp4?alt=media&token=06d49060-e40e-411f-a10b-3a47ea8c2989" autoPlay muted loop></video>
                </div>
                <div className="bottomtext">
                    <h1>
                        AIVA something

                    </h1>
                </div>
                <Link className="aivadetails" onClick={getsusbstatus}>
                <div >
                    <div className="aivasubs">
                        <div className="postbuttontext">Subscribe</div>
                    </div>
                </div>
                </Link>
            </div>
        </>
    )
}
