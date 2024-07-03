import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
export default function Login() {
  useEffect(() => {
    document.title = "Welcome To WingedWords";
  }, []);
  const enablesignin = () => {
    var email = document.querySelector('#email').value
    var password = document.querySelector('#password').value
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
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // console.log('loggedin')
        window.location.href="/home"
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
      });
  }
  return (
    <div className="container">
      <div className="loginpage">
        <div className="logo">
          <Link to="/">
            <svg viewBox="0 0 24 24" width="150" height="150" aria-hidden="true" className="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1nao33i r-rxcuwo r-1777fci r-m327ed r-494qqr">
              <g>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="white"></path>
              </g>
            </svg>
          </Link>
        </div>
        <div className="loginoptions">
          Happening now<br>
          </br>
          <br>

          </br>
          <div className="join">
            Welcome To WingedWords.
          </div>
          <br />
          <div className="button2">
            <input type="text" placeholder="Email Address" className='nameinput' id='email' />
          </div>
          <div className="button1">
            <input type="password" placeholder="Password" className='nameinput' id='password' />
          </div>
          <br />
          
          <div className="button1" onClick={enablesignin}>
            <div className="createaccountbtn" onClick={enablesignin}>
              <Link className="createaccounttext" >Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
