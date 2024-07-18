import React, { useState } from 'react'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useInView } from 'react-intersection-observer';
export default function Postpageui() {
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
    const getdocumentitle = () => {
        document.title = "Upload Wings";
    }
    const [wingsid, setwingsid] = useState([]);
    const getwingsid = async () => {
        const user = auth.currentUser;
        if (user) {
            const uid = user.uid;
            const userDocRef = doc(db, "Global Tweet IDs", "TIDs");
            try {
                const docSnap = await getDoc(userDocRef);
                if (docSnap.exists()) {
                    const followersData = docSnap.data()["TIDs"];
                    setwingsid(followersData);
                    console.log('WIngs', wingsid);
                }
                else {
                    console.log('No such document!');

                }
            } catch (error) {
                console.error("Error fetching followers:", error);
            }
        }
    }
    return (
        <>
            <div className="posts" onLoad={getdocumentitle()}{...getwingsid()}>
                <div className="logomobile">
                    <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true" className="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1nao33i r-rxcuwo r-1777fci r-m327ed r-494qqr">
                        <g>
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="white"></path>
                        </g>
                    </svg>
                </div>
                <div className="tweetbody">
                    <textarea className="tweetsinput"></textarea>
                </div>

                <div className="messagecenter">

                </div>
            </div>
        </>
    )
}
