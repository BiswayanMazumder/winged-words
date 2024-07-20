import React from 'react'

export default function Esportsui() {
    const getesportsdetails = () => {
        var tweets=document.querySelector('.tweets')
        var result=localStorage.getItem('Details')
        tweets.innerHTML = result
    }
    return (
        <div className="posts">
            <div className="logomobile">
                <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true" className="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1nao33i r-rxcuwo r-1777fci r-m327ed r-494qqr">
                    <g>
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="white"></path>
                    </g>
                </svg>
            </div>
            <iframe width="640" height="360" src="https://www.youtube.com/watch?v=8B8MUFLA3p8" title="ESPORTS WORLD CUP | " frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen className='videoplayer'></iframe>
            <div className="tweets">
            </div>
        </div>

    )
}
