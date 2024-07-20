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
export default function Followerpageui() {
    const [name, setname] = useState('');
    const [followername,setfollowername]=useState([]);
    const [pfp,setpfp]=useState([]);
    useEffect(() => {
        const getusername = async () => {
            var username=localStorage.getItem("Username")
            setname(username);
        }
        getusername()
    },'')
    const [followers, setFollowers] = useState([]);
    const [following, setfollowing] = useState([]);
    const [followercount, setfollowercount] = useState(0);
    const [followingcount, setfollowingcount] = useState(0);
    useEffect(() => {
        const getFollowers = async () => {
          onAuthStateChanged(auth, async (user) => {
            if (user) {
              const uid = user.uid;
              const userDocRef = doc(db, "Followers", uid);
              try {
                const docSnap = await getDoc(userDocRef);
                if (docSnap.exists()) {
                  const followerData = docSnap.data().Follower;
                  const followersArray = Object.values(followerData); // Convert object values to array
                  setFollowers(followersArray);
                  setfollowercount(followersArray.length);
                  console.log('Followers',followers)
                } else {
                  console.log("No followers found for this user.");
                  setfollowercount(0);
                }
              } catch (error) {
                console.error("Error fetching followers:", error);
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
          <Link to='/home'>
            <svg viewBox="0 0 24 24" aria-hidden="true" height="30" width="30" className="backbutton"><g><path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z" fill='white'></path></g></svg>
          </Link>
          <p className='navusername'>{name} Followers</p>
          <div className="postscount">
            {/* {tweets.length} Wings */}
          </div>
        </div>
            </div>
        </>
    )
}
