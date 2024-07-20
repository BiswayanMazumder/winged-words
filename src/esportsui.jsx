
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
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
const provider = new GoogleAuthProvider();
export default function Esportsui() {
    const getesportsdetails = () => {
        var tweets = document.querySelector('.tweets')
        var result = localStorage.getItem('Details')
        tweets.innerHTML = result
    }
    const [pfp,setpfp]=useState('https://images.pexels.com/photos/27200209/pexels-photo-27200209/free-photo-of-a-street-with-a-tree-in-bloom-and-people-walking.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
    const getuserdp = async() => {
        console.log('loaded')
        onAuthStateChanged(auth, async (user) => {
            if (user) {
              const uid = user.uid; // <-- Get UID of logged-in user
              const userDocRef = doc(db, "User Details", uid); //change UID here for tweets from other users
              const docSnap = await getDoc(userDocRef);
              if (docSnap.exists()) {
                setpfp(docSnap.data()["Profile Pic"])
              }
              else{
                setpfp('https://images.pexels.com/photos/21430948/pexels-photo-21430948/free-photo-of-a-man-holding-a-camera.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')
              }
            } else {
              // console.log('signed out');
              window.location.replace("/");
            }
          });
          console.log('pfp',pfp);
    }
    const getdocument=()=>{
        document.title='Esports World Cup 2024 - WingedWords'
    }
    return (
        <div className="posts" onLoad={getdocument()}>
            <div className="logomobile">
                <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true" className="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1nao33i r-rxcuwo r-1777fci r-m327ed r-494qqr">
                    <g>
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="white"></path>
                    </g>
                </svg>
            </div>
            <video className='videoplayer' src="https://emkldzxxityxmjkxiggw.supabase.co/storage/v1/object/public/Netfly%20Storage/esports.mp4" autoPlay muted></video>
            <div className="tweets">
                <h1>Esports World Cup 2024
                </h1>
                <br />
                <h5>
                Watch the Esports World Cup 2024 from July 3rd through August 25th!
                </h5>
                <br />
                <div className="tweetsection">
                    <div className="pfp">
                        <img src={pfp} alt="error" className='profileimg'/>
                        <Link to={"/Post"}>
                        <input type="text" className='tweetinput' placeholder='Type About #ESports 2024'/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    )
}
