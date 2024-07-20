
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
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
export default function Esportsui() {
    const getesportsdetails = () => {
        var tweets = document.querySelector('.tweets')
        var result = localStorage.getItem('Details')
        tweets.innerHTML = result
    }
    const [pfp, setpfp] = useState('https://images.pexels.com/photos/27200209/pexels-photo-27200209/free-photo-of-a-street-with-a-tree-in-bloom-and-people-walking.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
    const getuserdp = async () => {
        console.log('loaded')
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const uid = user.uid; // <-- Get UID of logged-in user
                const userDocRef = doc(db, "User Details", uid); //change UID here for tweets from other users
                const docSnap = await getDoc(userDocRef);
                if (docSnap.exists()) {
                    setpfp(docSnap.data()["Profile Pic"])
                }
                else {
                    setpfp('https://images.pexels.com/photos/21430948/pexels-photo-21430948/free-photo-of-a-man-holding-a-camera.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')
                }
            } else {
                // console.log('signed out');
                window.location.replace("/");
            }
        });
        console.log('pfp', pfp);
    }
    const getdocument = () => {
        document.title = 'Esports World Cup 2024 - WingedWords'
    }
    return (
        <div className="posts" onLoad={getdocument()}>
            <div className="logomobile">
                <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true" className="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1nao33i r-rxcuwo r-1777fci r-m327ed r-494qqr">
                    <g>
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="white"></path>
                    </g>
                </svg>
            </div>
            <video className='videoplayer' src="https://emkldzxxityxmjkxiggw.supabase.co/storage/v1/object/public/Netfly%20Storage/esports.mp4" autoPlay muted></video>
            <div className="tweets">
                <h1>Esports World Cup 2024
                </h1>
                <br />
                <h5>
                    Watch the Esports World Cup 2024 from July 3rd through August 25th!
                </h5>
                <br />
                The year 2024 is poised to be a pivotal period in the ever-evolving landscape of eSports. As this digital sport continues to surge in popularity and legitimacy, it encapsulates a vibrant tapestry of competition, technology, and global cultural influence.

                At the forefront of the eSports calendar are the major tournaments that captivate millions worldwide. Titles like League of Legends, Dota 2, Counter-Strike: Global Offensive (CS:GO), and Fortnite are set to headline with their respective championships. These events are not merely gatherings of players; they are spectacles of skill and strategy, drawing both passionate fans and curious onlookers alike. The League of Legends World Championship, for instance, consistently breaks viewership records, showcasing the game’s deep-rooted community and its global appeal. In 2024, these tournaments will once again offer intense rivalries, breathtaking plays, and the crowning of new champions, cementing their place in eSports lore.

                Moreover, the 2024 eSports season heralds the arrival of new games and genres into the competitive arena. As technology advances and player tastes evolve, emerging titles will vie for attention. Games like Valorant, Apex Legends, and Rocket League have already made significant strides in the eSports scene and are expected to continue growing in popularity and competitive depth. The introduction of these new games brings fresh dynamics, strategies, and narratives to eSports, ensuring that the industry remains dynamic and responsive to changing player preferences.

                Professional leagues, another cornerstone of eSports, are set to expand and refine their structures in 2024. Leagues such as the Overwatch League (OWL), Call of Duty League (CDL), and the evolving Fortnite Champion Series (FNCS) provide platforms for top players and teams to showcase their talents on a global stage. These leagues not only offer substantial prize pools but also professional stability and recognition, fostering careers for eSports athletes and coaches akin to those in traditional sports. The continued evolution of league formats, rulesets, and player development programs ensures that eSports remains competitive and sustainable in the long term.

                Technological advancements are also set to shape the 2024 eSports landscape. Streaming platforms, virtual reality (VR), and augmented reality (AR) technologies are increasingly integrated into eSports experiences, enhancing viewer engagement and player performance. Platforms like Twitch, YouTube Gaming, and emerging services provide fans with unprecedented access to live matches, player streams, and behind-the-scenes content. VR and AR technologies, while still in their infancy in eSports, hold promise for immersive spectator experiences and innovative gameplay mechanics in the future.

                Global reach and cultural impact are integral facets of eSports’ growth trajectory. Events and tournaments are hosted across continents, showcasing diverse cultures and celebrating the global appeal of eSports. The international nature of eSports fosters cross-cultural exchanges among players and fans, enriching the sport with a tapestry of languages, traditions, and perspectives. Major cities around the world, from Los Angeles to Seoul to Shanghai, serve as hubs for eSports events, underscoring its status as a truly global phenomenon.

                Player storylines, akin to those in traditional sports, add another layer of intrigue to the 2024 eSports narrative. Rivalries between individual players or teams, breakout performances from newcomers, and narratives of perseverance and triumph all contribute to the drama and excitement of eSports. Player transfers, coaching changes, and personal achievements further enrich the storyline, creating compelling narratives that resonate with fans and media alike.

                In the broader societal context, eSports continues to garner mainstream recognition and acceptance. Traditional sports franchises, celebrities, and corporate sponsors increasingly invest in eSports teams and events, recognizing its immense reach and engagement among younger demographics. Media coverage, both traditional and digital, continues to expand, bringing eSports further into the spotlight and solidifying its place alongside traditional sports and entertainment industries.

                Looking ahead to 2024 and beyond, the trajectory of eSports appears boundless. With its blend of competition, technology, and global appeal, eSports stands as a testament to the power of digital sports in the modern age. As the industry continues to innovate and grow, it promises to redefine sports entertainment, captivate new audiences, and inspire a generation of players and fans worldwide.
            </div>
        </div>

    )
}
