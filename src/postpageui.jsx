import React, { useState } from 'react'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { GoogleGenerativeAI } from "@google/generative-ai";
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
                    // console.log('WIngs', wingsid);
                }
                else {
                    console.log('No such document!');

                }
            } catch (error) {
                console.error("Error fetching followers:", error);
            }
        }
    }
    const [apikey,setapikeys]=useState('');
    const getAPIKeys = async () => {
        const user=auth.currentUser;
        if (user) {
            const uid = user.uid;
            const userDocRef = doc(db, "Gemini", "API_KEYS");
            try {
                const docSnap = await getDoc(userDocRef);
                if (docSnap.exists()) {
                     const followersData =await docSnap.data()["api"];
                    setapikeys(followersData);
                    // console.log('apikey', apikey);
                    var wings=document.querySelector('.tweetsinput').value
                    // console.log('wings written',wings);
                    const genAI = new GoogleGenerativeAI(apikey);
                    async function run() {
                        // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
                        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
                      
                        const prompt = wings;
                      
                        const result = await model.generateContent(prompt);
                        const response = await result.response;
                        const text = response.text();
                        // console.log(text);
                        var tweetinput=document.querySelector('.tweetsinput')
                        tweetinput.value=text;
                      }
                      
                      run();
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
                    <textarea className="tweetsinput" placeholder='What is happening?'></textarea>
                </div>

                <div className="messagecenter">

                <div className="btns">
                <Link>
                <svg viewBox="0 0 24 24" aria-hidden="true" class="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03" height="40px" width="40px"><g><path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z" fill='white'></path></g></svg>
                </Link>
                <Link onClick={()=>getAPIKeys()}>
                <svg viewBox="0 0 24 24" aria-hidden="true" class="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-z80fyv r-19wmn03" height="40px" width="40px"><g><path d="M3 5.5C3 4.119 4.12 3 5.5 3h13C19.88 3 21 4.119 21 5.5v13c0 1.381-1.12 2.5-2.5 2.5h-13C4.12 21 3 19.881 3 18.5v-13zM5.5 5c-.28 0-.5.224-.5.5v13c0 .276.22.5.5.5h13c.28 0 .5-.224.5-.5v-13c0-.276-.22-.5-.5-.5h-13zM18 10.711V9.25h-3.74v5.5h1.44v-1.719h1.7V11.57h-1.7v-.859H18zM11.79 9.25h1.44v5.5h-1.44v-5.5zm-3.07 1.375c.34 0 .77.172 1.02.43l1.03-.86c-.51-.601-1.28-.945-2.05-.945C7.19 9.25 6 10.453 6 12s1.19 2.75 2.72 2.75c.85 0 1.54-.344 2.05-.945v-2.149H8.38v1.032H9.4v.515c-.17.086-.42.172-.68.172-.76 0-1.36-.602-1.36-1.375 0-.688.6-1.375 1.36-1.375z" fill='white'></path></g></svg>
                </Link>
                </div>
                <div className="post">
                    Post
                </div>
                </div>
            </div>
        </>
    )
}
