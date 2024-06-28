import React , { useEffect } from 'react'
import {Link} from 'react-router-dom'
export default function Signup() {
  useEffect(() => {
    document.title = "Sign Up for WingedWords";
  }, []);
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
            Create your account.
          </div>
          <br />
          <div className="button1">
          <input type="text" placeholder="Name" className='nameinput' />
          </div>
          <div className="button2">
          <input type="text" placeholder="Email Address" className='nameinput' />
          </div>
          <div className="button1">
          <input type="password" placeholder="Password" className='nameinput' />
          </div>
          <br/>
          <a href="/" className="button1">
            <div className="createaccountbtn">
              <a href="/" className="createaccounttext">Create account</a>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
