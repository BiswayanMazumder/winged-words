
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
export default function Alanwalkerui() {
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
        document.title = 'Sunburn Arena Ft. Alan Walker - Kolkata'
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
            <video className='videoplayer' src="https://firebasestorage.googleapis.com/v0/b/wingedwordsadmin.appspot.com/o/Explore%2FSunburn%20Arena%20with%20Alan%20Walker%20-%20Ahmedabad%20Highlights.mp4?alt=media&token=0b3c03f9-b0da-4aa1-b008-dfa45a66d8fc" autoPlay muted loop controls></video>
            <div className="tweets">
                <h1>Sunburn Arena Ft. Alan Walker - Kolkata
                </h1>
                <br />
                <h5>
                    Dates-TBD and Venues-TBD
                </h5>
                <br />
                Alan Walker is a Norwegian-British DJ and record producer who gained international fame for his distinctive style of electronic music, characterized by catchy melodies, emotive themes, and a blend of genres such as EDM, electro house, and pop. Born on August 24, 1997, in Northampton, England, Alan Olav Walker moved to Norway with his Norwegian mother and British father at a young age. His interest in music started early, influenced by his father, who was also a DJ.

                Early Life and Musical Beginnings

                Alan Walker's journey into music production began in his teenage years when he experimented with music production software and uploaded his creations to YouTube and SoundCloud. His breakthrough came in 2015 when he released the track "Faded," which quickly went viral and garnered millions of views on YouTube. The song's haunting melody and poignant lyrics struck a chord with listeners worldwide, propelling Alan Walker into the global music scene almost overnight.

                Rise to Fame with "Faded"

                "Faded" became Alan Walker's signature track, topping the charts in numerous countries and achieving multi-platinum certifications. The accompanying music video, featuring a mysterious hooded figure traversing breathtaking landscapes, resonated with fans and added to the song's allure. The success of "Faded" established Alan Walker as a prominent figure in the electronic music industry, known for his masked persona and futuristic aesthetic.

                Musical Style and Influences

                Alan Walker's music is characterized by its melodic hooks, atmospheric synths, and infectious beats. He draws inspiration from a variety of genres and artists, including trance music pioneers like Armin van Buuren and electronic music icons such as Daft Punk. His compositions often blend elements of EDM with pop sensibilities, creating a sound that appeals to both dance enthusiasts and mainstream audiences.

                Discography and Collaborations

                Following the success of "Faded," Alan Walker continued to release hit singles and collaborations. Tracks like "Sing Me to Sleep," "Alone," and "Darkside" further solidified his place in the EDM scene. He has collaborated with renowned artists like Noah Cyrus, Sabrina Carpenter, and Steve Aoki, expanding his musical reach and exploring new creative avenues.

                Global Impact and Fanbase

                Alan Walker's music has garnered a massive global following, with millions of listeners streaming his tracks on platforms like Spotify and Apple Music. His fanbase spans across continents, with dedicated supporters engaging with his music through social media, live performances, and fan communities. His concerts and festival appearances attract large crowds, showcasing his ability to connect with audiences through electrifying live performances.

                Humanitarian Efforts and Activism

                Beyond music, Alan Walker is involved in philanthropic initiatives and environmental activism. He has partnered with organizations like UNICEF to raise awareness about global issues affecting young people and supported charitable causes through his music and public platform. His commitment to making a positive impact extends beyond entertainment, reflecting his values and beliefs as a global citizen.

                Personal Life and Legacy

                Alan Walker remains a private individual, preferring to let his music speak for itself. His commitment to innovation and musical experimentation continues to shape his career, as he explores new sounds and collaborations. With numerous awards and accolades to his name, including MTV Europe Music Awards and NRJ Music Awards, Alan Walker's influence on electronic music is undeniable.

                Conclusion

                In conclusion, Alan Walker has emerged as a leading figure in the electronic music landscape, captivating audiences with his distinctive sound and captivating melodies. From humble beginnings as a bedroom producer to global stardom, he has transcended boundaries and reshaped the genre with his innovative approach to music production. With a dedicated fanbase and a repertoire of chart-topping hits, Alan Walker continues to push the boundaries of electronic music while leaving a lasting impact on the industry and his listeners worldwide.
            </div>
        </div>

    )
}
