import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useInView } from 'react-intersection-observer';
import Homepagethirdsection from './Components/homepagethirdsection';

const FollowingpageUI = () => {
  const [followers, setFollowers] = useState([]);
  const [followerID, setFollowerID] = useState([]);
  const [tweetid, setTweetid] = useState([]);
  const [tweetbody, setTweetbody] = useState([]);
  const [tweetimg, setTweetimg] = useState([]);
  const [tweetusername, setTweetusername] = useState([]);
  const [tweetuserphoto, setTweetuserphoto] = useState([]);
  const [tweetownerid, settweetownerid] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  // Firebase configuration
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

  // Function to handle selected tab
  const selectedTab = (tab) => {
    console.log(tab);
  };

  // Check user authentication state
  useEffect(() => {
    const checkAuthState = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log('User signed in');
        } else {
          console.log('User signed out');
          window.location.replace("/");
        }
      });
    };

    checkAuthState();
  }, [auth]);

  // Fetch followers when component mounts or auth state changes
  useEffect(() => {
    const fetchFollowers = async () => {
      const user = auth.currentUser;
      if (user) {
        const uid = user.uid;
        const userDocRef = doc(db, "Following", uid);
        try {
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            const followersData = docSnap.data()["Follower"];
            setFollowers(followersData);
            setFollowerID(followersData.map(follower => follower.ID));
          }
        } catch (error) {
          console.error("Error fetching followers:", error);
        }
      }
    };

    fetchFollowers();
  }, [auth, db]);

  // Fetch tweet data for followers
  useEffect(() => {
    const fetchTweetData = async () => {
      const user = auth.currentUser;
      if (user && followerID.length > 0) {
        try {
          const promises = followerID.map(follower => {
            const userDocRef = doc(db, "User Uploaded Tweet ID", follower);
            return getDoc(userDocRef);
          });

          const snapshots = await Promise.all(promises);
          const newTweetIds = [];
          const newTweetBody = [];
          const newTweetimg = [];
          const newTweetownerid = [];
          for (const docSnap of snapshots) {
            if (docSnap.exists()) {
              const data = docSnap.data();
              newTweetIds.push(...data["TIDs"]);
            }
          }

          // Limit the number of tweets fetched (example: first 10 tweets)
          const limitedTweetIds = newTweetIds.slice(0, 10);

          // Fetch tweet details using limited tweet IDs
          const tweetPromises = limitedTweetIds.map(tweetId => {
            const tweetDocRef = doc(db, "Global Tweets", tweetId);
            return getDoc(tweetDocRef);
          });

          const tweetSnapshots = await Promise.all(tweetPromises);
          for (const docSnap of tweetSnapshots) {
            if (docSnap.exists()) {
              const data = docSnap.data();
              newTweetBody.push(data["Tweet Message"]);
              newTweetimg.push(data["Image URL"]);
              newTweetownerid.push(data["Uploaded UID"]);
            }
          }

          setTweetid(limitedTweetIds);
          setTweetbody(newTweetBody);
          setTweetimg(newTweetimg);
          settweetownerid(newTweetownerid);

          // Fetch user details for tweet owners
          const userPromises = newTweetownerid.map(ownerId => {
            const userDocRef = doc(db, "User Details", ownerId);
            return getDoc(userDocRef);
          });

          const userSnapshots = await Promise.all(userPromises);
          const newTweetuserphoto = userSnapshots.map(docSnap => {
            if (docSnap.exists()) {
              return docSnap.data()["Profile Pic"];
            }
            return null;
          });
          const newTweetusername = userSnapshots.map(docSnap => {
            if (docSnap.exists()) {
              return docSnap.data()["Name"];
            }
            return null;
          });
          setTweetusername(newTweetusername);
          setTweetuserphoto(newTweetuserphoto);
        } catch (error) {
          console.error("Error fetching tweets:", error);
        }
      }
    };

    fetchTweetData();
  }, [auth, db, followerID]);

  // Lazy loading additional tweets
  useEffect(() => {
    const fetchMoreTweets = async () => {
      if (inView && !loadingMore) {
        setLoadingMore(true);
        // Simulate loading more tweets after a delay (example: 1 second)
        setTimeout(() => {
          setLoadingMore(false);
          // Implement logic to fetch more tweets here if needed
        }, 1000);
      }
    };

    fetchMoreTweets();
  }, [inView, loadingMore]);

  // Render UI
  return (
    <>
      <div className="posts">
        <div className="tablist">
          <Link to="/home" className="following" onClick={() => selectedTab('For you')}>
            For you
          </Link>
          <div className="foryou" onClick={() => selectedTab('Following')}>
            Following
            <div className="headingselected"></div>
          </div>
        </div>
        {/* <div className="divider"></div> */}
        <br /><br />
        <div className="tweets">
          {tweetbody.map((tweet, index) => (
            <div key={index} className="tweet" ref={index === tweetbody.length - 1 ? ref : null}>
            <div className="userdetails">
                <div className="profilepics">
                  <img src={tweetuserphoto[index]} alt="" className='profileimage' />
                  <div className="ownername">
                    <p>{tweetusername[index]}</p>
                  </div>
                </div>
              </div>
              <p>{tweet}</p>
              <img src={tweetimg[index]} alt="" className='tweetimages' />
            </div>
          ))}
          {loadingMore && <p>Loading more...</p>}
        </div>
      </div>
      <Homepagethirdsection />
    </>
  );
};

export default FollowingpageUI;
