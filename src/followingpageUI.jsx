import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useInView } from 'react-intersection-observer';
import Homepagethirdsection from './Components/homepagethirdsection';
export default function FollowingpageUI() {
  const [tweets, setTweets] = useState([]);
  const [users, setUsers] = useState({});
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

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
    const selectedTab = (tab) => {
        console.log(tab);
      };
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
        if (tweetDocSnap.exists()) {
          return {
            id: tweetId,
            body: tweetDocSnap.data()["Tweet Message"],
            imageUrl: tweetDocSnap.data()["Image URL"],
            owner: tweetDocSnap.data()["Uploaded UID"]
          };
        } else {
          console.log("No such document!");
          return null;
        }
      }));

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
    return (
        <>
          <div className="posts">
            <div className="tablist">
              <Link  to="/home" className="following" onClick={() => selectedTab('For you')}>
                For you
                
              </Link>
              <div className="foryou" onClick={() => selectedTab('Following')}>
                Following
                <div className="headingselected"></div>
              </div>
            </div>
            <div className="divider"></div>
            <div className="tweets">
          {tweets.map((tweet, index) => (
            <div key={tweet.id} className="tweet" ref={index === tweets.length - 1 ? ref : null}>
              <div className="userdetails">
                <div className="profilepics">
                  <img src={tweet.profilePic} alt="" className='profileimage' />
                  <div className="ownername">
                    <p>{tweet.name}</p>
                  </div>
                </div>
              </div>
              <p>{tweet.body}</p>
              <br></br>
              {tweet.imageUrl && <img src={tweet.imageUrl} alt="Tweet Image" className='tweetimages' />}
            </div>
          ))}
          {loading && <p>Loading Wings...</p>}
        </div>
          </div>
          <Homepagethirdsection />
        </>
      );
}
