import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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
const analytics = getAnalytics(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();
export default function Followingpagedesign() {
  const [name, setname] = useState('');
  useEffect(() => {
    const getusername = async () => {
      var username = localStorage.getItem("Username")
      setname(username);
    }
    getusername()
  }, '')
  const [followers, setFollowers] = useState([]);
  const [followername, setfollowername] = useState([]);
  const [pfp, setpfp] = useState([]);
  const [verified, setverification] = useState([]);
  useEffect(() => {
    var name=localStorage.getItem("Username")
    document.title=`People Followed by ${name}`
    const fetchFollowers = async (uid) => {
      const userDocRef = doc(db, "Following", uid);
      try {
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          const followerData = docSnap.data().Follower;
          const followersArray = Object.values(followerData).map(f => f.ID); // Extract ID values
          setFollowers(followersArray);
          // console.log('followers', followersArray);
          return followersArray;
        } else {
          // console.log("No followers found for this user.");
          return [];
        }
      } catch (error) {
        console.error("Error fetching followers:", error);
        return [];
      }
    };

    const fetchFollowerDetails = async (followersArray) => {
      const followerNames = [];
      const profilePictures = [];
      const Verifications = [];
      for (let i = 0; i < followersArray.length; i++) {
        const followerDocRef = doc(db, "User Details", followersArray[i]);
        try {
          const followerSnap = await getDoc(followerDocRef);
          if (followerSnap.exists()) {
            const followerData = followerSnap.data();
            followerNames.push(followerData["Name"]);
            profilePictures.push(followerData["Profile Pic"]);
          } else {
            // console.log("No such document!");
          }
        } catch (error) {
          // console.error("Error fetching follower data:", error);
        }
      }
      setfollowername(followerNames);
      setpfp(profilePictures);
      // console.log('follower names', followerNames);
      // console.log('profile pictures', profilePictures);
      for (let i = 0; i < followersArray.length; i++) {
        const followerDocRef = doc(db, "Verifications", followersArray[i]);
        try {
          const followerSnap = await getDoc(followerDocRef);
          if (followerSnap.exists()) {
            const followerData = followerSnap.data();
            Verifications.push(followerData["verified"]);
          } else {
            Verifications.push(false);
            // console.log("No such document!");
          }
        } catch (error) {
          // console.error("Error fetching follower data:", error);
        }
      }
      setverification(Verifications);
      // console.log('verifications', Verifications);
    };

    const getFollowers = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const uid = user.uid;
          const followersArray = await fetchFollowers(uid);
          if (followersArray.length > 0) {
            await fetchFollowerDetails(followersArray);
          }
        }
      });
    };

    getFollowers();
  }, []);

  return (
    <>
      <div className="posts">
        <div className="logomobile">
          <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true" className="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1nao33i r-rxcuwo r-1777fci r-m327ed r-494qqr">
            <g>
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="white"></path>
            </g>
          </svg>
        </div>
        <div className="nav">
          <Link to='/account'>
            <svg viewBox="0 0 24 24" aria-hidden="true" height="30" width="30" className="backbutton"><g><path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z" fill='white'></path></g></svg>
          </Link>
          <p className='navusername'>{name} Following</p>
        </div>
        
        <div className="followersdetails">
        
          {followers.map((tweet, index) => (
            <div key={tweet.id} className="tweet">
            
              <div className="userdetails">
                <div className="profilepics">
                  <img src={pfp[index]} alt="" className='profileimage' />
                  <div className="ownername">
                    <Link className='names' onClick={
                        console.log('hii')
                    }>
                      <p>{followername[index]}</p>
                    </Link>
                    <p className="verified">{verified[index] ? <svg viewBox="0 0 22 22" height='20' width='20' aria-label="Verified account" role="img" class="r-4qtqp9 r-yyyyoo r-1xvli5t r-bnwqim r-lrvibr r-m6rgpd r-f9ja8p r-og9te1" data-testid="icon-verified"><g><linearGradient gradientUnits="userSpaceOnUse" id="34-a" x1="4.411" x2="18.083" y1="2.495" y2="21.508"><stop offset="0" stop-color="#f4e72a"></stop><stop offset=".539" stop-color="#cd8105"></stop><stop offset=".68" stop-color="#cb7b00"></stop><stop offset="1" stop-color="#f4ec26"></stop><stop offset="1" stop-color="#f4e72a"></stop></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id="34-b" x1="5.355" x2="16.361" y1="3.395" y2="19.133"><stop offset="0" stop-color="#f9e87f"></stop><stop offset=".406" stop-color="#e2b719"></stop><stop offset=".989" stop-color="#e2b719"></stop></linearGradient><g clip-rule="evenodd" fill-rule="evenodd"><path d="M13.324 3.848L11 1.6 8.676 3.848l-3.201-.453-.559 3.184L2.06 8.095 3.48 11l-1.42 2.904 2.856 1.516.559 3.184 3.201-.452L11 20.4l2.324-2.248 3.201.452.559-3.184 2.856-1.516L18.52 11l1.42-2.905-2.856-1.516-.559-3.184zm-7.09 7.575l3.428 3.428 5.683-6.206-1.347-1.247-4.4 4.795-2.072-2.072z" fill="url(#34-a)"></path><path d="M13.101 4.533L11 2.5 8.899 4.533l-2.895-.41-.505 2.88-2.583 1.37L4.2 11l-1.284 2.627 2.583 1.37.505 2.88 2.895-.41L11 19.5l2.101-2.033 2.895.41.505-2.88 2.583-1.37L17.8 11l1.284-2.627-2.583-1.37-.505-2.88zm-6.868 6.89l3.429 3.428 5.683-6.206-1.347-1.247-4.4 4.795-2.072-2.072z" fill="url(#34-b)"></path><path d="M6.233 11.423l3.429 3.428 5.65-6.17.038-.033-.005 1.398-5.683 6.206-3.429-3.429-.003-1.405.005.003z" fill="#d18800"></path></g></g></svg> : ""}</p>
                  </div>
                </div>
              </div>
              <p>{tweet.body}</p>
              <br></br>
              {tweet.imageUrl && <img src={tweet.imageUrl} alt="Tweet Image" className='tweetimages' />}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
