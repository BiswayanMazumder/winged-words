import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";

export default function Navbar() {
    const [text, settext] = useState('');
    const getusers = () => {
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
        const analytics = getAnalytics(app);
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                // isloggedin = true;
                //   console.log(uid);
                settext(uid)

                // ...
            } else {
                // User is signed out
                // ...
                console.log('signed out')

            }
        });

    }
    const signOut = async () => {
        const auth = getAuth();
        await auth.signOut();
        window.location.replace("/")
    }
    return (
        <>
            <div className="options" onLoad={getusers()}>
                <div className="optionnames">
                    <Link to="/home" className="homelogo">
                        <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true" className="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1nao33i r-rxcuwo r-1777fci r-m327ed r-494qqr">
                            <g>
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="white"></path>
                            </g>
                        </svg>
                    </Link>
                    <Link to="/home" className="homeicon">
                        <svg viewBox="0 0 24 24" aria-hidden="true" height="30" width="30" class="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1nao33i r-lwhw9o r-cnnz9e"><g><path d="M21.591 7.146L12.52 1.157c-.316-.21-.724-.21-1.04 0l-9.071 5.99c-.26.173-.409.456-.409.757v13.183c0 .502.418.913.929.913h6.638c.511 0 .929-.41.929-.913v-7.075h3.008v7.075c0 .502.418.913.929.913h6.639c.51 0 .928-.41.928-.913V7.904c0-.301-.158-.584-.408-.758zM20 20l-4.5.01.011-7.097c0-.502-.418-.913-.928-.913H9.44c-.511 0-.929.41-.929.913L8.5 20H4V8.773l8.011-5.342L20 8.764z" fill='white'></path></g></svg>
                        <div className="othertitles">
                            Home
                        </div>
                    </Link>
                    <Link to="/Explore" className="homeicon">
                    <svg viewBox="0 0 24 24" aria-hidden="true" class="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1nao33i r-lwhw9o r-cnnz9e" width="30" height="30"><g><path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z" fill='white'></path></g></svg>
                        <div className="othertitles">
                            Explore
                        </div>
                    </Link>
                    <div className="homeicon">
                        <svg viewBox="0 0 24 24" aria-hidden="true" class="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1nao33i r-lwhw9o r-cnnz9e" width="30" height="30"><g><path d="M19.993 9.042C19.48 5.017 16.054 2 11.996 2s-7.49 3.021-7.999 7.051L2.866 18H7.1c.463 2.282 2.481 4 4.9 4s4.437-1.718 4.9-4h4.236l-1.143-8.958zM12 20c-1.306 0-2.417-.835-2.829-2h5.658c-.412 1.165-1.523 2-2.829 2zm-6.866-4l.847-6.698C6.364 6.272 8.941 4 11.996 4s5.627 2.268 6.013 5.295L18.864 16H5.134z" fill='white'></path></g></svg>
                        <div className="othertitles">
                            Notifications
                        </div>
                    </div>
                    <div className="homeicon">
                        <svg viewBox="0 0 24 24" aria-hidden="true" class="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1nao33i r-lwhw9o r-cnnz9e" width="30" height="30"><g><path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.636V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.463l-8 3.636-8-3.638V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-8.037z" fill='white'></path></g></svg>
                        <div className="othertitles">
                            Messages
                        </div>
                    </div>
                    <Link to='/AIVA' className="homeicon">
                        <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true" class="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1nao33i r-lwhw9o r-cnnz9e"><g><g clip-path="url(#6-clip0_2592_269)" clip-rule="evenodd"><path d="M18 4.1H6c-1.05 0-1.9.85-1.9 1.9v12c0 1.05.85 1.9 1.9 1.9h12c1.05 0 1.9-.85 1.9-1.9V6c0-1.05-.85-1.9-1.9-1.9zM6 2h12c2.21 0 4 1.79 4 4v12c0 2.21-1.79 4-4 4H6c-2.21 0-4-1.79-4-4V6c0-2.21 1.79-4 4-4z" fill='white'></path><path d="M6.68 17.8l8.108-11.58h2.532L9.21 17.8H6.68z" fill='white'></path></g><defs><clipPath id="6-clip0_2592_269"><rect height="20" rx="1" width="20" x="2" y="2"></rect></clipPath></defs></g></svg>
                        <div className="othertitles">
                            AIVA
                        </div>
                    </Link>
                    <Link to="/account" className="homeicon">
                        <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true" class="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1nao33i r-lwhw9o r-cnnz9e"><g><path d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z" fill='white'></path></g></svg>
                        <div className="othertitles">
                            Profile
                        </div>
                    </Link>

                    <Link className='postingbutton' to="/Post">
                    <div className="button1">
                        <div className="postbutton">
                            <div className="postbuttontext">Post</div>
                        </div>
                    </div>
                    </Link>
                    <Link className="button1" onClick={signOut}>
                        <div className="postbutton">
                            <div className="postbuttontext" >Sign out</div>
                        </div>
                    </Link>
                    <div className="buttonpost">
                        <div className="postbuttontab">
                            <div className="createaccounttext">
                                <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true" class="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1472mwg r-lrsllp"><g><path d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H16c.63-.016 1.2-.08 1.72-.188C16.95 15.24 14.68 17 12 17H8.55c.57-2.512 1.57-4.851 3-6.78 2.16-2.912 5.29-4.911 9.45-5.187C20.95 8.079 19.9 11 16 11zM4 9V6H1V4h3V1h2v3h3v2H6v3H4z" fill='white'></path></g></svg>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}
