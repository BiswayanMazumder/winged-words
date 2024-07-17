import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
export default function Explorepageui() {
  function getdocumentitle() {
    document.title = "Explore - WingedWords"
  }
  return (
    <div className="posts" onLoad={getdocumentitle()}>
      <div className="logomobile">
        <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true" className="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1nao33i r-rxcuwo r-1777fci r-m327ed r-494qqr">
          <g>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="white"></path>
          </g>
        </svg>
      </div>
      <Link>
      <div className="explorebody">
        <img src="https://esportsworldcup.com/assets/Esports_World_Cup_Open_Graph_Thumbnail_36968128bd.png" alt="" className='exploreimage' />
        <div className="texts">
            Esports World Cup 2024
        </div>
    </div>
      </Link>
      <Link>
      <div className="explorebody">
        <img src="https://assets-in.bmscdn.com/nmcms/events/banner/desktop/media-desktop-sunburn-arena-ft-alan-walker-kolkata-0-2024-7-15-t-9-30-52.jpg" alt="" className='exploreimage' />
        <div className="texts">
        Sunburn Arena Ft. Alan Walker - Kolkata
        </div>
    </div>
      </Link>
    </div>
  )
}
