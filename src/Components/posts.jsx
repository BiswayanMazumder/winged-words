import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { useInView } from 'react-intersection-observer';
import { Bars, Circles } from 'react-loading-icons'
export default function Posts() {
  const [verified, setverified] = useState([]);
  const [tweets, setTweets] = useState([]);
  const [users, setUsers] = useState({});
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userid, setuserid] = useState([]);
  const tweetownerid = [];
  const { ref, inView } = useInView({
    threshold: 0.5,
  });
  const userID = [];
  const verfied = [];
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

  const fetchtweets = async (lastVisibleTweet) => {

    setLoading(true);
    const userDocRef = doc(db, "Global Tweet IDs", "TIDs");
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      const tweetids = docSnap.data().TIDs;
      const tweetsBatch = tweetids.slice(lastVisibleTweet, lastVisibleTweet + 10);
      const tweets = await Promise.all(tweetsBatch.map(async (tweetId) => {
        const tweetDocRef = doc(db, "Global Tweets", tweetId);
        const tweetDocSnap = await getDoc(tweetDocRef);
        // setuserid=(tweetDocSnap.data()["Uploaded UID"])
        if (tweetDocSnap.exists()) {
          userID.push(tweetDocSnap.data()["Uploaded UID"]);
          tweetownerid.push(tweetDocSnap.data()["Uploaded UID"]);
          // console.log('owner',tweetownerid)
          return {
            id: tweetId,
            body: tweetDocSnap.data()["Tweet Message"],
            imageUrl: tweetDocSnap.data()["Image URL"],
            owner: tweetDocSnap.data()["Uploaded UID"],
           
          };
        } else {
          console.log("No such document!");
          return null;
        }
      }));
      // console.log("uniqueUserIds", userID);
      //fetching tweets
      const uniqueUserIds = [...new Set(tweets.map(tweet => tweet.owner))];
      const userDetails = await Promise.all(uniqueUserIds.map(async (userId) => {
        const userDetailsDocRef = doc(db, "User Details", userId);
        const userDetailsDocSnap = await getDoc(userDetailsDocRef);
        if (userDetailsDocSnap.exists()) {
          return {
            id: userId,
            name: userDetailsDocSnap.data()["Name"],
            profilePic: userDetailsDocSnap.data()["Profile Pic"] !== 'Placeholder' ? userDetailsDocSnap.data()["Profile Pic"] : 'https://images.pexels.com/photos/20419416/pexels-photo-20419416/free-photo-of-camera-in-red-background.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          };
        } else {
          return {
            id: userId,
            name: "Unknown",
            profilePic: 'https://images.pexels.com/photos/20419416/pexels-photo-20419416/free-photo-of-camera-in-red-background.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          };
        }
      }));

      const userMap = userDetails.reduce((acc, user) => {
        acc[user.id] = user;
        return acc;
      }, {});

      setUsers(prevUsers => ({ ...prevUsers, ...userMap }));

      const tweetData = tweets.map(tweet => ({
        ...tweet,
        name: userMap[tweet.owner]?.name,
        profilePic: userMap[tweet.owner]?.profilePic
      }));

      setTweets(prevTweets => [...prevTweets, ...tweetData.filter(tweet => tweet !== null)]);
      setLastVisible(lastVisibleTweet + 10);
      setLoading(false);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchtweets(lastVisible);
      }
    });
  }, []);

  useEffect(() => {
    if (inView && !loading) {
      fetchtweets(lastVisible);
    }
  }, [inView]);

  const selectedTab = (tab) => {
    console.log(tab);
  };
  const getusers = () => {
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        // isloggedin = true;
        console.log('signed in')
        // console.log('user id'+userid)
        //   window.location.replace("loggedinpage.html")
        // ...
      } else {
        // User is signed out
        // ...
        console.log('signed out')
        window.location.replace("/")
      }
    });

  }


  const fetchverification = async () => {
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;

        // ...
      } else {


      }
    });
  }
  const writedetailstodb = async () => {
    const email=localStorage.getItem('email');
    const password=localStorage.getItem('password');
    const pfp=localStorage.getItem('pfp');
    const newuser=localStorage.getItem('newuser');
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if(newuser){
        if (user) {
          const uid = user.uid;
          // write user details to db
          const userDocRef = doc(db, "User Details", uid);
          setDoc(userDocRef, {
            "Email": email,
            "Password": password,
            "Profile Pic": pfp
          });
          localStorage.setItem("newuser",false);
          // ...
        } else {
          // User is signed out
          // ...
        }
      }
    });
  }
  return (
    <>
      <div className="posts" onLoad={getusers()}{...fetchverification()}>
        <div className="logomobile">
          <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true" className="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1nao33i r-rxcuwo r-1777fci r-m327ed r-494qqr">
            <g>
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="white"></path>
            </g>
          </svg>
        </div>
        <div className="tablist">
          <div className="foryou" onClick={() => selectedTab('For you')}>
            For you
            <div className="headingselected"></div>
          </div>
          <Link to="/following" className="following" onClick={() => selectedTab('Following')}>
            Following
          </Link>
        </div>
        {/* <div className="divider"></div> */}
        <div className="tweets">
          {tweets.map((tweet, index) => (
            <div key={tweet.id} className="tweet" ref={index === tweets.length - 1 ? ref : null}>
              <div className="userdetails">
                <div className="profilepics">
                  <img src={tweet.profilePic} alt="" className='profileimage' />
                  <div className="ownername">
                    <Link className='ownertweetname'>
                      <p>{tweet.name}</p>
                    </Link>
                    <div className="verified">
                      <svg viewBox="0 0 22 22" height='20' width='20' aria-label="Verified account" role="img" class="r-4qtqp9 r-yyyyoo r-1xvli5t r-bnwqim r-lrvibr r-m6rgpd r-f9ja8p r-og9te1" data-testid="icon-verified"><g><linearGradient gradientUnits="userSpaceOnUse" id="34-a" x1="4.411" x2="18.083" y1="2.495" y2="21.508"><stop offset="0" stop-color="#f4e72a"></stop><stop offset=".539" stop-color="#cd8105"></stop><stop offset=".68" stop-color="#cb7b00"></stop><stop offset="1" stop-color="#f4ec26"></stop><stop offset="1" stop-color="#f4e72a"></stop></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id="34-b" x1="5.355" x2="16.361" y1="3.395" y2="19.133"><stop offset="0" stop-color="#f9e87f"></stop><stop offset=".406" stop-color="#e2b719"></stop><stop offset=".989" stop-color="#e2b719"></stop></linearGradient><g clip-rule="evenodd" fill-rule="evenodd"><path d="M13.324 3.848L11 1.6 8.676 3.848l-3.201-.453-.559 3.184L2.06 8.095 3.48 11l-1.42 2.904 2.856 1.516.559 3.184 3.201-.452L11 20.4l2.324-2.248 3.201.452.559-3.184 2.856-1.516L18.52 11l1.42-2.905-2.856-1.516-.559-3.184zm-7.09 7.575l3.428 3.428 5.683-6.206-1.347-1.247-4.4 4.795-2.072-2.072z" fill="url(#34-a)"></path><path d="M13.101 4.533L11 2.5 8.899 4.533l-2.895-.41-.505 2.88-2.583 1.37L4.2 11l-1.284 2.627 2.583 1.37.505 2.88 2.895-.41L11 19.5l2.101-2.033 2.895.41.505-2.88 2.583-1.37L17.8 11l1.284-2.627-2.583-1.37-.505-2.88zm-6.868 6.89l3.429 3.428 5.683-6.206-1.347-1.247-4.4 4.795-2.072-2.072z" fill="url(#34-b)"></path><path d="M6.233 11.423l3.429 3.428 5.65-6.17.038-.033-.005 1.398-5.683 6.206-3.429-3.429-.003-1.405.005.003z" fill="#d18800"></path></g></g></svg>
                    </div>
                  </div>
                </div>
              </div>
              <p>{tweet.body}</p>
              <br></br>
              {tweet.imageUrl && <img src={tweet.imageUrl} alt="Tweet Image" className='tweetimages' />}
            </div>
          ))}
          <br/>
          {<p>Loading</p>}
        </div>
      </div>
    </>
  );
}
