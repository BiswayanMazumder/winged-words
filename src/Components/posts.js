import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

export default function Posts() {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const fetchtweets = async () => {
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
          try {
            const userDocRef = doc(db, "Global Tweet IDs", "TIDs");
            const docSnap = await getDoc(userDocRef);
            if (docSnap.exists()) {
              const tweetids = docSnap.data().TIDs;
              // console.log("Document data:", tweetids);
              const tweetData = await Promise.all(tweetids.map(async (tweetId) => {
                const tweetDocRef = doc(db, "Global Tweets", tweetId);
                const tweetDocSnap = await getDoc(tweetDocRef);
                if (tweetDocSnap.exists()) {
                  const uploadedUid = tweetDocSnap.data()["Uploaded UID"];
                  const userDetailsDocRef = doc(db, "User Details", uploadedUid);
                  const userDetailsDocSnap = await getDoc(userDetailsDocRef);

                  let name = "Unknown";
                  let profilePic = "";

                  if (userDetailsDocSnap.exists()) {
                    name = userDetailsDocSnap.data()["Name"];
                    profilePic = userDetailsDocSnap.data()["Profile Pic"];
                  }

                  return {
                    id: tweetId,
                    body: tweetDocSnap.data()["Tweet Message"],
                    imageUrl: tweetDocSnap.data()["Image URL"],
                    owner: uploadedUid,
                    name: name,
                    profilePic: profilePic,
                  };
                } else {
                  console.log("No such document!");
                  return null;
                }
              }));

              setTweets(tweetData.filter(tweet => tweet !== null));
            }
          } catch (e) {
            console.log(e.message);
          }
        }
      });
    };

    fetchtweets();
  }, []);

  const selectedTab = (tab) => {
    console.log(tab);
  };

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
        <div className="tablist">
          <div className="foryou" onClick={() => selectedTab('For you')}>
            For you
            <div className="headingselected"></div>
          </div>
          <Link to="/following" className="following" onClick={() => selectedTab('Following')}>
            Following
          </Link>
        </div>
        <div className="divider"></div>
        <div className="tweets">
          {tweets.map((tweet) => (
            <div key={tweet.id} className="tweet">
              <div className="userdetails">
                <div className="profilepics">
                <div className="ownername">
                <p>{tweet.name}</p>
                </div>
                </div>
              </div>
              <p>{tweet.body}</p>
              <br></br>
              {tweet.imageUrl && <img src={tweet.imageUrl} alt="Tweet Image" />}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
