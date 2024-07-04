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
  const [userid,setuserid] = useState([]);
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
          const UserID=[];
          // Fetch user details for tweet owners
          const userPromises = newTweetownerid.map(ownerId => {
            const userDocRef = doc(db, "User Details", ownerId);
            UserID.push(ownerId);
            console.log('user id'+UserID);
            return getDoc(userDocRef);
          });
          setuserid(UserID);
          console.log('users'+userid);
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
                    <Link className='ownertweetname' onClick={()=>{
                      localStorage.setItem('userid',userid[index]);
                      window.location.href='/other'
                    }}>
                    <p>{tweetusername[index]}</p>
                    </Link>
                    <div className="verified">
                      <svg viewBox="0 0 22 22" height='20' width='20' aria-label="Verified account" role="img" class="r-4qtqp9 r-yyyyoo r-1xvli5t r-bnwqim r-lrvibr r-m6rgpd r-f9ja8p r-og9te1" data-testid="icon-verified"><g><linearGradient gradientUnits="userSpaceOnUse" id="34-a" x1="4.411" x2="18.083" y1="2.495" y2="21.508"><stop offset="0" stop-color="#f4e72a"></stop><stop offset=".539" stop-color="#cd8105"></stop><stop offset=".68" stop-color="#cb7b00"></stop><stop offset="1" stop-color="#f4ec26"></stop><stop offset="1" stop-color="#f4e72a"></stop></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id="34-b" x1="5.355" x2="16.361" y1="3.395" y2="19.133"><stop offset="0" stop-color="#f9e87f"></stop><stop offset=".406" stop-color="#e2b719"></stop><stop offset=".989" stop-color="#e2b719"></stop></linearGradient><g clip-rule="evenodd" fill-rule="evenodd"><path d="M13.324 3.848L11 1.6 8.676 3.848l-3.201-.453-.559 3.184L2.06 8.095 3.48 11l-1.42 2.904 2.856 1.516.559 3.184 3.201-.452L11 20.4l2.324-2.248 3.201.452.559-3.184 2.856-1.516L18.52 11l1.42-2.905-2.856-1.516-.559-3.184zm-7.09 7.575l3.428 3.428 5.683-6.206-1.347-1.247-4.4 4.795-2.072-2.072z" fill="url(#34-a)"></path><path d="M13.101 4.533L11 2.5 8.899 4.533l-2.895-.41-.505 2.88-2.583 1.37L4.2 11l-1.284 2.627 2.583 1.37.505 2.88 2.895-.41L11 19.5l2.101-2.033 2.895.41.505-2.88 2.583-1.37L17.8 11l1.284-2.627-2.583-1.37-.505-2.88zm-6.868 6.89l3.429 3.428 5.683-6.206-1.347-1.247-4.4 4.795-2.072-2.072z" fill="url(#34-b)"></path><path d="M6.233 11.423l3.429 3.428 5.65-6.17.038-.033-.005 1.398-5.683 6.206-3.429-3.429-.003-1.405.005.003z" fill="#d18800"></path></g></g></svg>
                    </div>
                  </div>
                </div>
              </div>
              <p>{tweet}</p>
              <br/>
              <img src={tweetimg[index]} alt="" className='tweetimages' />
            </div>
          ))}
          {/* {loadingMore && <p>Loading more...</p>} */}
        </div>
      </div>
      <Homepagethirdsection />
    </>
  );
};

export default FollowingpageUI;
