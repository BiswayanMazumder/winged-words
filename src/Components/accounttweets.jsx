import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useInView } from 'react-intersection-observer';

export default function AccountTweets() {
  const [name, setname] = useState('');
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

  const fetchTweetsFromIds = async (tweetids, lastVisibleTweet, uid) => {
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
        // console.log("No such document!");
        return null;
      }
    }));

    const uniqueUserIds = [...new Set(tweets.map(tweet => tweet.owner))];
    const userDetails = await Promise.all(uniqueUserIds.map(async (userId) => {
      const userDetailsDocRef = doc(db, "User Details", userId);
      const userDetailsDocSnap = await getDoc(userDetailsDocRef);
      if (userDetailsDocSnap.exists()) {
        setname(userDetailsDocSnap.data()["Name"])
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
  };

  const fetchtweets = async (lastVisibleTweet) => {
    setLoading(true);
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid; // <-- Get UID of logged-in user
        const userDocRef = doc(db, "User Uploaded Tweet ID", uid);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          const tweetids = docSnap.data().TIDs;
          await fetchTweetsFromIds(tweetids, lastVisibleTweet, uid);
        }
      } else {
        // console.log('signed out');
        window.location.replace("/");
      }
      setLoading(false);
    });
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
    // console.log(tab);
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
        // console.log('signed in')
        //   window.location.replace("loggedinpage.html")
        // ...
      } else {
        // User is signed out
        // ...
        // console.log('signed out')
        window.location.replace("/")
      }
    });

  }
  const [coverpic, setcoverpic] = useState('')
  const [profilepic, setprofilepic] = useState([])
  const getcoverpics = () => {
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
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        const userDocRef = doc(db, "Cover Picture", uid);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          setcoverpic(docSnap.data()["Cover Picture"])
          // console.log("Cover Picture: ", coverpic);
        }

      }
    })
  }
  const getprofilepics = () => {
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
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        const userDocRef = doc(db, "User Details", uid);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          setprofilepic(docSnap.data()["Profile Pic"])
          // console.log("profile Picture: ", profilepic);
        }

      }
    })
  }
  return (
    <>
      <div className="posts" onLoad={getusers()}{...getcoverpics()}{...getprofilepics()}>
        <div className="logomobile">
          <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true" className="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1nao33i r-rxcuwo r-1777fci r-m327ed r-494qqr">
            <g>
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="white"></path>
            </g>
          </svg>
        </div>
        <div className="coverpicture">
          <img src={coverpic} alt="" />
        </div>
        <div className="profilepic">
          <img src={profilepic} alt="" />
        </div>
        <div className="username">
          <p>{name}</p>
        </div>
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
    </>
  );
}
