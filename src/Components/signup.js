import React from 'react'
export default function signup() {
    const applelogin = () => {
        console.log('apple')
    }
  return (
    <div className="container">
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
          {/* <div className="consent">
            By signing up, you agree to the <a href="/" className="terms">Terms of Service</a> and <a href="/" className="terms">Privacy Policy</a>,<br></br>including <a href="/" className="terms">Cookie Use</a>.
          </div> */}
          <br/>
          <a href="/" className="button1">
            <div className="createaccountbtn">
              <a href="/" className="createaccounttext">Create account</a>
            </div>
          </a>
          {/* <div className="accountcreated">
            Already have an account?
          </div>
          <br></br>
          <a href="" className="button1">
            <div className="login">
              <a href="/" className="logintext">Sign in</a>
            </div>
          </a> */}
        </div>
      </div>
    </div>
  )
}
