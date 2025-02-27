import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider,onAuthStateChanged } from "firebase/auth";
// import Signup from './Components/signup';
export default function Loginpage() {
  useEffect(() => {
    document.title = "WingedWords. It’s what’s happening / WingedWords";
  }, []);
  const googlelogin = () => {

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
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        localStorage.setItem("newuser",false);
        // IdP data available using getAdditionalUserInfo(result)
        window.location.href="/home"
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }
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
          console.log('signed in')
          window.location.replace("/home")
          // ...
        } else {
          // User is signed out
          // ...
          console.log('signed out')
          
        }
      });
    
  }
  return (
    <div className="container" onLoad={getusers()}>
      <div className="loginpage">
        <div className="logo">
          <svg viewBox="0 0 24 24" width="150" height="150" aria-hidden="true" className="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1nao33i r-rxcuwo r-1777fci r-m327ed r-494qqr">
            <g>
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="white"></path>
            </g>
          </svg>
        </div>
        <div className="loginoptions">
          Happening now<br>
          </br>
          <br>

          </br>
          <div className="join">
            Join Today.
          </div>
          <br />
          <div className="button1" onClick={googlelogin}>
            <div className="googlelogin">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="LgbsSe-Bz112c" width="20" height="20"><g><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></g></svg>
              <div className="google" onClick={googlelogin}>Sign up with Google</div>
            </div>
          </div>
          <div className="button2" >
            <div className="applelogin">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1gs4q39 r-z80fyv r-19wmn03" width="20" height="20"><g><path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z"></path></g></svg>
              <div className="google">Sign up with Apple</div>
            </div>
          </div>
          <div className="ortext">or</div>
          <Link to="/signup" className="button1">
            <div className="createaccount">
              <Link to="/signup" className="createaccounttext">Create account</Link>
            </div>
          </Link>
          <div className="consent">
            By signing up, you agree to the <a href="/" className="terms">Terms of Service</a> and <a href="/" className="terms">Privacy Policy</a>,<br></br>including <a href="/" className="terms">Cookie Use</a>.
          </div>
          <div className="accountcreated">
            Already have an account?
          </div>
          <br></br>
          <Link to="/login" className="button1">
            <div className="login">
              <Link to="/login" className="logintext">Sign in</Link>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
